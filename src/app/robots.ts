export default function robots() {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://growentix.cloud";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/employer/", "/dashboard/", "/api/", "/notifications"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
