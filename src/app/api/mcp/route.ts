/**
 * Growentix MCP endpoint — Streamable HTTP, stateless, read-only.
 *
 * Why hand-rolled JSON-RPC instead of the MCP SDK transport: Next.js App
 * Router route handlers have no Node req/res objects, which the SDK's
 * StreamableHTTPServerTransport requires. A stateless server that answers
 * each POST with a single JSON-RPC response is compliant with the MCP
 * Streamable HTTP spec, and it keeps this endpoint dependency-free
 * (validation is zod, already in the project).
 *
 * Supported methods: initialize, ping, tools/list, tools/call, and any
 * notifications/* (acknowledged with 202 and no body). GET/DELETE are not
 * part of stateless operation and return 405.
 *
 * Security: read-only tools only; every argument is validated (zod);
 * per-IP rate limiting (60 requests / 60 s, per server instance);
 * structured logging without personal data; errors never leak stacks,
 * SQL, or environment details.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MCP_TOOLS, ToolError, findTool } from "@/lib/mcp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERVER_INFO = { name: "growentix", version: "1.0.0" };
const SUPPORTED_PROTOCOLS = ["2025-06-18", "2025-03-26", "2024-11-05"];

/* Rate limiting: first layer only (per server instance on serverless). */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 60;
const rateBuckets = new Map<string, { count: number; windowStart: number }>();

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now - bucket.windowStart >= RATE_WINDOW_MS) {
    rateBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  if (rateBuckets.size > 5000) {
    for (const [key, value] of rateBuckets) {
      if (now - value.windowStart >= RATE_WINDOW_MS) rateBuckets.delete(key);
    }
  }
  return bucket.count > RATE_MAX;
}

/* JSON-RPC helpers */
function rpcResult(id: string | number | null, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

function rpcError(
  id: string | number | null,
  code: number,
  message: string,
  status = 200,
) {
  return NextResponse.json(
    { jsonrpc: "2.0", id, error: { code, message } },
    { status },
  );
}

const rpcRequestSchema = z.object({
  jsonrpc: z.literal("2.0").optional(),
  id: z.union([z.string(), z.number(), z.null()]).optional(),
  method: z.string(),
  params: z.unknown().optional(),
});

export async function POST(req: NextRequest) {
  const started = Date.now();
  const ip = clientIp(req);
  let method = "?";
  let toolName: string | undefined;
  try {
    if (rateLimited(ip)) {
      return rpcError(null, -32029, "Rate limit exceeded: 60 requests per minute.", 429);
    }
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return rpcError(null, -32700, "Parse error: body must be valid JSON.");
    }
    if (Array.isArray(body)) {
      return rpcError(null, -32600, "Invalid request: batch requests are not supported.");
    }
    const parsed = rpcRequestSchema.safeParse(body);
    if (!parsed.success || !parsed.data.method) {
      return rpcError(null, -32600, "Invalid request.");
    }
    const { id = null, params } = parsed.data;
    method = parsed.data.method;

    /* Notifications need no response body. */
    if (method.startsWith("notifications/")) {
      return new NextResponse(null, { status: 202 });
    }

    if (method === "initialize") {
      const requested =
        (params as { protocolVersion?: unknown } | undefined)?.protocolVersion;
      const protocolVersion =
        typeof requested === "string" && SUPPORTED_PROTOCOLS.includes(requested)
          ? requested
          : SUPPORTED_PROTOCOLS[0];
      return rpcResult(id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
      });
    }

    if (method === "ping") {
      return rpcResult(id, {});
    }

    if (method === "tools/list") {
      return rpcResult(id, {
        tools: MCP_TOOLS.map((t) => ({
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema,
        })),
      });
    }

    if (method === "tools/call") {
      const callParams = z
        .object({ name: z.string(), arguments: z.unknown().optional() })
        .safeParse(params);
      if (!callParams.success) {
        return rpcError(id, -32602, "Invalid params: tools/call needs a tool name.");
      }
      toolName = callParams.data.name;
      const tool = findTool(toolName);
      if (!tool) {
        return rpcError(id, -32602, `Unknown tool: ${toolName}`);
      }
      try {
        const data = await tool.run(callParams.data.arguments ?? {});
        return rpcResult(id, {
          content: [{ type: "text", text: JSON.stringify(data) }],
          structuredContent: data,
        });
      } catch (err) {
        if (err instanceof ToolError) {
          return rpcResult(id, {
            content: [{ type: "text", text: err.message }],
            isError: true,
            structuredContent: { error: err.message },
          });
        }
        if (err instanceof z.ZodError) {
          return rpcError(id, -32602, `Invalid params: ${err.issues[0]?.message ?? "validation failed"}`);
        }
        console.error(JSON.stringify({ route: "mcp", tool: toolName, error: "internal" }));
        return rpcError(id, -32603, "Internal error.");
      }
    }

    return rpcError(id, -32601, `Method not found: ${method}`);
  } finally {
    console.log(
      JSON.stringify({
        route: "mcp",
        method,
        tool: toolName,
        ms: Date.now() - started,
      }),
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error:
        "Growentix MCP endpoint (stateless Streamable HTTP). Send a JSON-RPC POST with initialize, tools/list or tools/call. GET streaming is not supported.",
    },
    { status: 405 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Stateless MCP endpoint: no session to close." },
    { status: 405 },
  );
}
