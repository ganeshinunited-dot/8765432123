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
};

export function articleImagesFor(slug: string): [string, string, string] | null {
  return ARTICLE_IMAGES[slug] ?? null;
}
