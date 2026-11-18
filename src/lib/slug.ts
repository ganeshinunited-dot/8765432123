// Shared slug helper — same rules as the seed's local slugify.
// Slugs are never taken from user input directly; the apply endpoint
// appends -2, -3 on collision.

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
