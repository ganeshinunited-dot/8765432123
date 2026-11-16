import { redirect } from "next/navigation";

/**
 * The Stories tab moved from /search to /stories — old links land there,
 * with the search query carried over.
 */
export default async function SearchRedirect({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams();
  if (sp.search) params.set("search", sp.search);
  if (sp.category) params.set("category", sp.category);
  const qs = params.toString();
  redirect(qs ? `/stories?${qs}` : "/stories");
}
