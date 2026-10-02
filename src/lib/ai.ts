// ---------------------------------------------------------------------------
// AI provider adapter (OpenAI-compatible chat completions).
//
// Configure via environment variables:
//   AI_API_KEY   — provider API key (optional; without it, features fall back
//                  to built-in smart templates so the product still works)
//   AI_BASE_URL  — e.g. https://api.openai.com/v1 (default), or any
//                  OpenAI-compatible endpoint (Gemini, Groq, Together, Llama API)
//   AI_MODEL     — e.g. gpt-4o-mini (default)
//
// The key is only ever used server-side and is never exposed to the browser.
// ---------------------------------------------------------------------------

export function aiEnabled(): boolean {
  return !!process.env.AI_API_KEY;
}

interface ChatMessage {
  role: "system" | "user";
  content: string;
}

/** Returns the assistant's text reply, or null when AI is unavailable. */
export async function aiComplete(messages: ChatMessage[], opts?: { json?: boolean; maxTokens?: number }): Promise<string | null> {
  const key = process.env.AI_API_KEY;
  if (!key) return null;
  const base = (process.env.AI_BASE_URL || "https://api.meta.ai/v1").replace(/\/+$/, "");
  const model = process.env.AI_MODEL || "muse-spark-1.1";
  try {
    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        // Meta Model API: max_completion_tokens includes hidden reasoning tokens,
        // so budget generously and keep reasoning minimal for fast, reliable replies.
        ...(base.includes("api.meta.ai")
          ? { max_completion_tokens: Math.min(4000, (opts?.maxTokens ?? 700) + 1500), reasoning_effort: "minimal" }
          : { max_tokens: opts?.maxTokens ?? 700 }),
        ...(opts?.json ? { response_format: { type: "json_object" } } : {}),
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    return typeof text === "string" && text.trim() ? text.trim() : null;
  } catch {
    return null;
  }
}

/** Extract and parse a JSON object from an LLM reply. */
export function parseAiJson<T>(text: string | null): T | null {
  if (!text) return null;
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end <= start) return null;
    return JSON.parse(text.slice(start, end + 1)) as T;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Built-in fallbacks (used until an AI_API_KEY is configured). These are
// genuinely useful template generators, not placeholders.
// ---------------------------------------------------------------------------

const ROLE_TEMPLATES: Array<{ match: RegExp; responsibilities: string[]; requirements: string[] }> = [
  {
    match: /barista|cafe|coffee|waiter|waitress|kitchen|cook|bakery/i,
    responsibilities: ["Serve customers warmly and take orders accurately", "Prepare drinks/food items to house standards", "Keep the counter and seating area clean and stocked", "Handle cash and card payments at the till"],
    requirements: ["Friendly attitude and good communication", "Able to stand for long shifts", "Basic English or Nepali customer handling", "No experience needed — training provided"],
  },
  {
    match: /tutor|teacher|teaching|mentor/i,
    responsibilities: ["Teach assigned subjects in small groups or 1-to-1", "Prepare simple lesson plans and practice questions", "Track student progress and share updates with parents/coordinators", "Help students prepare for exams with revisions and tests"],
    requirements: ["Strong command of the subject you will teach", "Patient and clear communication style", "Currently studying or completed +2/Bachelor's in a related field", "Available at the scheduled class times"],
  },
  {
    match: /deliver|rider|driver|courier/i,
    responsibilities: ["Pick up and deliver orders safely within assigned areas", "Follow daily route plans and delivery schedules", "Confirm deliveries in the app and handle returns", "Keep the delivery vehicle clean and roadworthy"],
    requirements: ["Valid two-wheeler licence and own vehicle preferred", "Good knowledge of local roads", "Smartphone with mobile data", "Punctual and careful with packages"],
  },
  {
    match: /support|sales|marketing|promot|social media|content/i,
    responsibilities: ["Respond to customer messages and questions promptly", "Help run promotions and day-to-day campaigns", "Keep records of leads, orders or posts you handle", "Share customer feedback with the team weekly"],
    requirements: ["Good written communication in Nepali and basic English", "Comfortable with Facebook, Instagram and TikTok", "Organised and quick to reply", "Students with part-time availability are encouraged"],
  },
  {
    match: /data entry|admin|office|account|reception/i,
    responsibilities: ["Enter and update records accurately", "Organise files, documents and spreadsheets", "Answer routine calls and emails", "Support the team with day-to-day admin tasks"],
    requirements: ["Fast, accurate typing", "Basic MS Excel / Google Sheets skills", "Attention to detail", "Able to keep information confidential"],
  },
  {
    match: /developer|engineer|designer|it |tech|video|editor/i,
    responsibilities: ["Work on assigned tasks and deliver on agreed deadlines", "Share progress updates with the team regularly", "Test and review your own work before handover", "Learn the team's tools and workflow quickly"],
    requirements: ["Portfolio, GitHub or sample work to show", "Own laptop preferred", "Self-managed and deadline-focused", "Open to feedback and revisions"],
  },
];

const GENERAL_RESPONSIBILITIES = ["Carry out the day-to-day tasks of the role responsibly", "Communicate clearly with the team and customers", "Follow the weekly schedule and report any changes early", "Learn on the job and ask questions when unsure"];
const GENERAL_REQUIREMENTS = ["Currently a student or recent graduate", "Responsible, punctual and willing to learn", "Good communication in Nepali (English is a plus)", "Able to commit to the agreed schedule"];
const DEFAULT_BENEFITS = ["Flexible hours that fit around your classes", "Friendly team and on-the-job training", "Timely payment, every month", "Certificate / experience letter on completion"];

export interface GeneratedJobText {
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  skills: string[];
}

export function templateJobText(input: {
  title: string;
  jobTypeLabel: string;
  arrangementLabel: string;
  categoryName?: string | null;
}): GeneratedJobText {
  const tpl = ROLE_TEMPLATES.find((t) => t.match.test(input.title));
  const resp = tpl?.responsibilities ?? GENERAL_RESPONSIBILITIES;
  const reqs = tpl?.requirements ?? GENERAL_REQUIREMENTS;
  const skillsGuess = (input.title + " " + (input.categoryName || "")).toLowerCase();
  const skills = [
    ...( /sales|promot|marketing/.test(skillsGuess) ? ["Communication", "Sales"] : []),
    ...( /social|content|video/.test(skillsGuess) ? ["Social Media", "Canva"] : []),
    ...( /excel|data|account/.test(skillsGuess) ? ["MS Excel", "Data Entry"] : []),
    ...( /tutor|teach/.test(skillsGuess) ? ["Teaching"] : []),
    ...( /design/.test(skillsGuess) ? ["Canva"] : []),
    "Communication",
  ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);

  const description =
    `We are looking for a motivated student to join our team as a ${input.title}. This is a ${input.jobTypeLabel.toLowerCase()} role (${input.arrangementLabel.toLowerCase()}) designed to fit around your studies — you will get real work experience, a supportive team, and pay on time, every time.\n\nIf you are responsible, eager to learn, and can commit to the agreed schedule, we would love to hear from you. No long experience needed for most student roles — attitude matters most.`;
  return {
    description,
    responsibilities: resp.map((r) => `- ${r}`).join("\n"),
    requirements: reqs.map((r) => `- ${r}`).join("\n"),
    benefits: DEFAULT_BENEFITS.map((b) => `- ${b}`).join("\n"),
    skills,
  };
}

export function templateCoverLetter(input: {
  studentName: string;
  headline?: string | null;
  skills: string[];
  jobTitle: string;
  companyName: string;
  matchingSkills: string[];
}): string {
  const first = input.studentName.split(" ")[0];
  const skillsLine = input.matchingSkills.length
    ? `My skills in ${input.matchingSkills.slice(0, 3).join(", ")} match what this role needs, and I learn new tools quickly.`
    : `I bring strong communication skills, reliability, and a genuine willingness to learn on the job.`;
  return `Dear ${input.companyName} team,

I am excited to apply for the ${input.jobTitle} position. ${input.headline ? `A quick intro about me: ${input.headline}. ` : ""}I am looking for exactly this kind of opportunity to gain real experience alongside my studies.

${skillsLine} I am punctual, careful with responsibilities, and available as per the schedule mentioned in the posting.

I would welcome the chance to speak with you about how I can contribute. Thank you for your time and consideration.

Warm regards,
${input.studentName} (${first})`;
}
