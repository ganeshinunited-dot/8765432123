export default function robots() {
  const base = process.env.APP_URL || "https://studentjobsnepal.com";
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
