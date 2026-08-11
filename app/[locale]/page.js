import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";
import HomeBanner from "@layouts/partials/HomeBanner";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import ProductsGrid from "@layouts/partials/ProductsGrid";
import Services from "@layouts/partials/Services";
import Workflow from "@layouts/partials/Workflow";
import { getListPage } from "../lib/contentParser";
import client from "../sanity";

export default async function Home() {
  let homePage = null;
  try {
    homePage = await getListPage("content/_index.md");
  } catch (error) {
    console.error("Erreur de chargement de la page d'accueil:", error);
  }

  // Si le fichier n'est pas trouvé, on affiche un message au lieu de planter ou de faire un 404 silencieux
  if (!homePage || !homePage.frontmatter) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Erreur de chargement</h1>
        <p className="text-gray-700">Impossible de trouver le fichier <code>content/_index.md</code>.</p>
        <p className="text-gray-700 mt-2">Vérifiez qu'il existe bien à cet emplacement.</p>
      </main>
    );
  }

  const { frontmatter } = homePage;
  const { banner, feature, services, workflow } = frontmatter;
  const { title } = config.site;
  
  let products = [];
  try {
    products = await client.fetch(`*[_type == "product"]`);
  } catch (error) {
    console.error("Erreur de chargement des produits Sanity:", error);
  }

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