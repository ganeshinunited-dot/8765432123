/**
 * Manual ad slots.
 *
 * Each slot is a space on the site for an ad the owner places by hand
 * (his own banner, affiliate creative, sponsor image — NOT AdSense auto ads).
 * Fill a slot with an image URL + link and it renders that banner;
 * leave a slot empty and the site shows a marked "Advertisement" placeholder
 * box instead, so the space stays visible and ready.
 */
export type ManualAd = {
  imageUrl?: string;
  linkUrl?: string;
  alt?: string;
};

export const manualAds: Record<string, ManualAd> = {
  // Leaderboard under the hero on the homepage (728 x 90 on desktop).
  leaderboard: {},
  // Sidebar box on the homepage (300 x 250).
  "sidebar-home": {},
  // In-feed banner under the homepage article grid (728 x 90 on desktop).
  "infeed-home": {},
  // Sidebar boxes on article pages (300 x 250 each).
  "sidebar-article-top": {},
  "sidebar-article-bottom": {},
};
