/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.ong-volotsangana.org",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/server-sitemap.xml", "/api/*", "/404"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    additionalSitemaps: [
      "https://www.ong-volotsangana.org/server-sitemap.xml",
    ],
  },
  transform: async (config, path) => {
    // fr is the default locale and stays un-prefixed (as-needed), so the
    // build emits /fr/* SSG paths that must map back to root to match the
    // real canonical URLs. /en/* keeps its prefix. hreflang alternates live
    // in each page's <head> (getMetadata), so we don't duplicate them here.
    const loc =
      path === "/fr" ? "/" : path.startsWith("/fr/") ? path.slice(3) : path;
    return {
      loc,
      changefreq: loc === "/" ? "weekly" : "monthly",
      priority: loc === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
