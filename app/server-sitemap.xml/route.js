
import { getServerSideSitemap } from 'next-sitemap';
import { getSinglePage }  from '@lib/contentParser';

export async function GET(request) {
  const allPages = getSinglePage("layouts"); // Fetch all pages from the "layouts" folder
  const fields = allPages.map(page => ({
    loc: `https://ong-volotsangana.org/${page.slug}`,
    lastmod: new Date().toISOString(), // Adjust based on your data
  }));

  return getServerSideSitemap(fields);
}
