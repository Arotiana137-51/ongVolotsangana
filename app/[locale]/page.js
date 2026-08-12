import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";
import HomeBanner from "@layouts/partials/HomeBanner";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import ProductsGrid from "@layouts/partials/ProductsGrid";
import Services from "@layouts/partials/Services";
import Workflow from "@layouts/partials/Workflow";
import { getListPage } from "../../lib/contentParser"; // CORRECT : 2 niveaux vers le haut
import client from "../../sanity"; // CORRECT : 2 niveaux vers le haut

export default async function Home({ params }) {
  const locale = params.locale || "fr";
  const homePage = await getListPage("content/_index.md", locale);
  const { frontmatter } = homePage;
  const { banner, feature, services, workflow } = frontmatter;
  const { title } = config.site;
  const products = await client.fetch(`*[_type == "product"]`);

  return (
    <>
      <SeoMeta title={title} />
      <HomeBanner banner={banner} />
      <HomeFeatures feature={feature} />
      <Services services={services} />
      <Workflow workflow={workflow} />
      <ProductsGrid title="Nos produits" products={products} />
    </>
  );
}