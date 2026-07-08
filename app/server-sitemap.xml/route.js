import config from "@config/config.json";
import { getSinglePage } from "@lib/contentParser";
import client from "../../sanity";
import { getServerSideSitemap } from "next-sitemap";

const SITE_URL = "https://www.ong-volotsangana.org";

async function getProductSlugs() {
  try {
    return (
      (await client.fetch(
        `*[_type == "product" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`,
      )) || []
    );
  } catch {
    return [];
  }
}

export async function GET() {
  const blogFolder = config.settings.blog_folder || "blogs";
  const regularPages = getSinglePage("content");
  const blogPosts = getSinglePage(`content/${blogFolder}`);
  const products = await getProductSlugs();

  const fields = [
    ...regularPages.map((page) => ({
      loc: `${SITE_URL}/${page.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      loc: `${SITE_URL}/${blogFolder}/${post.slug}`,
      lastmod: post.frontmatter?.date
        ? new Date(post.frontmatter.date).toISOString()
        : new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.6,
    })),
    ...products.map((p) => ({
      loc: `${SITE_URL}/produits/${p.slug}`,
      lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.7,
    })),
  ];

  return getServerSideSitemap(fields);
}
