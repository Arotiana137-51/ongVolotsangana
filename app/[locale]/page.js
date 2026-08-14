import config from "@config/config.json";
import SeoMeta from "@layouts/SeoMeta";
import HomeBanner from "@layouts/partials/HomeBanner";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import ProductsGrid from "@layouts/partials/ProductsGrid";
import Services from "@layouts/partials/Services";
import Workflow from "@layouts/partials/Workflow";
import { getListPage } from "@lib/contentParser";
import client from "../../sanity";

// Rafraîchit la page toutes les heures en arrière-plan (ISR) sans
// recalculer à chaque visite.
export const revalidate = 3600; // 1 heure

export default async function Home({ params }) {
  const locale = params.locale || "fr";

  let homePage = null;
  try {
    homePage = await getListPage("content/_index.md", locale);
  } catch (error) {
    console.error(`[Contenu] Échec de chargement de la page d'accueil (locale: ${locale}):`, error);
  }

  // Si le contenu markdown n'est pas trouvé, on affiche un message clair
  // au lieu de faire planter toute la page.
  if (!homePage || !homePage.frontmatter) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Erreur de chargement</h1>
        <p className="text-gray-700">
          Impossible de trouver le fichier <code>content/_index.md</code>.
        </p>
        <p className="text-gray-700 mt-2">Vérifiez qu&apos;il existe bien à cet emplacement.</p>
      </main>
    );
  }

  const { frontmatter } = homePage;
  const { banner, feature, services, workflow } = frontmatter;
  const { title } = config.site;

  // ✅ Sanity blindé : si le CDN Sanity est lent/indisponible, la page
  // d'accueil s'affiche quand même (grille de produits vide) au lieu de planter en 500.
  let products = [];
  try {
    products = await client.fetch(`*[_type == "product"]`);
  } catch (error) {
    console.error("[Sanity] Échec de récupération des produits (accueil):", error);
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