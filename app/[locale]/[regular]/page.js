import { notFound, redirect } from "next/navigation";
import NotFound from "@layouts/404";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import Faq from "@layouts/Faq";
import Produits from "@layouts/Produits";
import SeoMeta from "@layouts/SeoMeta";
import { getRegularPage } from "@lib/contentParser";
import client from "../../../sanity"; // 3 niveaux vers le haut (root)

// ✅ CORRECTION 1 : Force Next.js à toujours re-générer cette page au lieu d'utiliser le cache
export const dynamic = 'force-dynamic';

export default async function RegularPage({ params }) {
  const { locale, regular } = params;

  // ✅ CORRECTION 2 : Validation stricte de la locale pour éviter les URLs bizarres (/produits/formation)
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

  // ✅ ROUTING DES LAYOUTS SPÉCIFIQUES
  if (frontmatter.layout === "contact") {
    return <Contact data={pageData} />;
  }
  
  if (frontmatter.layout === "faq") {
    return <Faq data={pageData} />;
  }

  if (frontmatter.layout === "produits") {
    // Récupération des produits Sanity (toujours frais grâce à force-dynamic)
    const products = await client.fetch(`*[_type == "product"]`);
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