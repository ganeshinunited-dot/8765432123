// Generated editorial images for articles.
// Files live in public/article-images/<slug>/1.jpg, 2.jpg, 3.jpg.
// [0] = hero (16:9), [1] and [2] = inline mid-article images.
// New entries are added by the article-image pipeline as articles get images.
export const ARTICLE_IMAGES: Record<string, [string, string, string]> = {
  "uae-hiring-update-sectors-recruiting-and-skills-that-stand-out-20261013": [
    "/article-images/uae-hiring-update-sectors-recruiting-and-skills-that-stand-out-20261013/1.jpg",
    "/article-images/uae-hiring-update-sectors-recruiting-and-skills-that-stand-out-20261013/2.jpg",
    "/article-images/uae-hiring-update-sectors-recruiting-and-skills-that-stand-out-20261013/3.jpg",
  ],
  "125-000-nepalis-secure-jobs-in-south-korea-through-eps-20261011": [
    "/article-images/125-000-nepalis-secure-jobs-in-south-korea-through-eps-20261011/1.jpg",
    "/article-images/125-000-nepalis-secure-jobs-in-south-korea-through-eps-20261011/2.jpg",
    "/article-images/125-000-nepalis-secure-jobs-in-south-korea-through-eps-20261011/3.jpg",
  ],
  "132-000-jobs-at-risk-as-nepal-set-to-graduate-from-ldc-status-20261012": [
    "/article-images/132-000-jobs-at-risk-as-nepal-set-to-graduate-from-ldc-status-20261012/1.jpg",
    "/article-images/132-000-jobs-at-risk-as-nepal-set-to-graduate-from-ldc-status-20261012/2.jpg",
    "/article-images/132-000-jobs-at-risk-as-nepal-set-to-graduate-from-ldc-status-20261012/3.jpg",
  ],
  "15-fastest-growing-remote-careers-right-now-plus-10-firms-hiring-20261014": [
    "/article-images/15-fastest-growing-remote-careers-right-now-plus-10-firms-hiring-20261014/1.jpg",
    "/article-images/15-fastest-growing-remote-careers-right-now-plus-10-firms-hiring-20261014/2.jpg",
    "/article-images/15-fastest-growing-remote-careers-right-now-plus-10-firms-hiring-20261014/3.jpg",
  ],
  "gulf-hiring-turns-selective-as-tensions-hit-sales-and-marketing-roles-20261014": [
    "/article-images/gulf-hiring-turns-selective-as-tensions-hit-sales-and-marketing-roles-20261014/1.jpg",
    "/article-images/gulf-hiring-turns-selective-as-tensions-hit-sales-and-marketing-roles-20261014/2.jpg",
    "/article-images/gulf-hiring-turns-selective-as-tensions-hit-sales-and-marketing-roles-20261014/3.jpg",
  ],
  "flash-floods-kill-over-100-in-nepal-and-china-caritas-assessing-20261014": [
    "/article-images/flash-floods-kill-over-100-in-nepal-and-china-caritas-assessing-20261014/1.jpg",
    "/article-images/flash-floods-kill-over-100-in-nepal-and-china-caritas-assessing-20261014/2.jpg",
    "/article-images/flash-floods-kill-over-100-in-nepal-and-china-caritas-assessing-20261014/3.jpg",
  ],
  "nepal-turns-to-gen-z-tech-boom-after-329m-usaid-cuts-20261014": [
    "/article-images/nepal-turns-to-gen-z-tech-boom-after-329m-usaid-cuts-20261014/1.jpg",
    "/article-images/nepal-turns-to-gen-z-tech-boom-after-329m-usaid-cuts-20261014/2.jpg",
    "/article-images/nepal-turns-to-gen-z-tech-boom-after-329m-usaid-cuts-20261014/3.jpg",
  ],
};

export function articleImagesFor(slug: string): [string, string, string] | null {
  return ARTICLE_IMAGES[slug] ?? null;
}
