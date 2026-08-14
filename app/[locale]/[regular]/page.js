import { redirect } from "next/navigation";
import NotFound from "@layouts/404";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import Faq from "@layouts/Faq";
import Produits from "@layouts/Produits";
import SeoMeta from "@layouts/SeoMeta";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
import { routing } from "@i18n/routing";
import client from "../../../sanity"; // 3 niveaux vers le haut (root)

// ✅ Pages pré-générées au build (rapide), puis rafraîchies automatiquement
// toutes les heures en arrière-plan (ISR) sans jamais bloquer le visiteur.
// Remplace l'ancien "force-dynamic" qui forçait un recalcul complet
// (lecture disque + appel Sanity) à CHAQUE visite.
export const revalidate = 3600; // 1 heure

export default async function RegularPage({ params }) {
  const { locale, regular } = params;

  // Validation de la locale pour éviter les URLs invalides (ex: /produits/formation)
  if (locale !== "fr" && locale !== "en") {
    redirect(`/${regular}`);
  }

  // Récupération des données de la page (Markdown)
  const pageData = await getRegularPage(regular, locale);
  const { frontmatter } = pageData;

  // Si la page n'existe pas, on affiche la 404
  if (!frontmatter) {
    return <NotFound data={pageData} />;
  }

  // ROUTING DES LAYOUTS SPÉCIFIQUES
  if (frontmatter.layout === "contact") {
    return <Contact data={pageData} />;
  }

  if (frontmatter.layout === "faq") {
    return <Faq data={pageData} />;
  }

  if (frontmatter.layout === "produits") {
    // ✅ Sanity blindé : si le CDN Sanity est lent/indisponible, la page
    // s'affiche quand même (liste de produits vide) au lieu de planter en 500.
    let products = [];
    try {
      products = await client.fetch(`*[_type == "product"]`);
    } catch (error) {
      console.error(`[Sanity] Échec de récupération des produits (locale: ${locale}):`, error);
    }
    return <Produits data={pageData} products={products} />;
  }

  // Fallback pour les pages standards (ex: formation, elements, etc.)
  return (
    <>
      <SeoMeta {...frontmatter} />
      <Default data={pageData} />
    </>
  );
}

// Génère toutes les pages (FR + EN) au build pour un rendu statique rapide.
export const generateStaticParams = async () => {
  const paths = routing.locales.flatMap((locale) => {
    const pages = getSinglePage("content", locale);
    return pages.map((page) => ({
      locale,
      regular: page.slug,
    }));
  });

  return paths;
};