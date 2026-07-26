import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";

import HomeBanner from "@layouts/partials/HomeBanner";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import ProductsGrid from "@layouts/partials/ProductsGrid";
import Services from "@layouts/partials/Services";
import Workflow from "@layouts/partials/Workflow";
import { getListPage } from "../lib/contentParser";
import client from "../sanity";

const Home = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  const { banner, feature, services, workflow } = frontmatter;
  const { title } = config.site;
  const products = await client.fetch(`*[_type == "product"]`);

  return (
    <>
      <SeoMeta title={title} />

      {/* Banner */}
      <HomeBanner banner={banner} />

      {/* Features */}
      <HomeFeatures feature={feature} />

      {/* services */}
      <Services services={services} />

      {/* workflow */}
      <Workflow workflow={workflow} />

      {/* products grid */}
      <ProductsGrid title="Nos produits" products={products} />
    </>
  );
};

export default Home;
