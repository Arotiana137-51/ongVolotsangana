const { getServerSideSitemap } = require('next-sitemap');
const { getSinglePage } = require('../../lib/contentParser'); // Adjust the import based on your project structure

export async function GET(request) {
  const allPages = getSinglePage("layout"); // Fetch all pages from the "layout" folder
  const fields = allPages.map(page => ({
    loc: `https://ong-volotsangana.org/${page.slug}`,
    lastmod: new Date().toISOString(), // Adjust based on your data
  }));

  return getServerSideSitemap(fields);
}
