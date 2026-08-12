import { notFound, redirect } from "next/navigation";
import Default from "@layouts/Default";
import Produits from "@layouts/Produits";
import Contact from "@layouts/Contact";
import Faq from "@layouts/Faq";
import SeoMeta from "@layouts/SeoMeta";
import { getRegularPage } from "@lib/contentParser";
import client from "../../../sanity"; // 3 niveaux vers le haut

export default async function RegularPage({ params }) {
  const { locale, regular } = params;

  // ✅ 1. VALIDATION STRICTE DE LA LOCALE
  // Si l'URL est du type /produits/formation, "produits" est pris pour la locale.
  // On détecte l'erreur et on redirige proprement vers la page réelle (/formation)
  if (locale !== "fr" && locale !== "en") {
    redirect(`/${regular}`); 
  }

  // 2. Récupération des données
  const pageData = await getRegularPage(regular, locale);
  const { frontmatter } = pageData;

  // Si la page n'existe pas dans le dossier content/
  if (!frontmatter) {
    return notFound();
  }

  // ✅ 3. ROUTING DES LAYOUTS SPÉCIFIQUES
  if (frontmatter.layout === "contact") {
    return <Contact data={pageData} />;
  }
  
  if (frontmatter.layout === "faq") {
    return <Faq data={pageData} />;
  }

  if (frontmatter.layout === "produits") {
    const products = await client.fetch(`*[_type == "product"]`);
    return <Produits data={pageData} products={products} />;
  }

  // 4. FALLBACK PAR DÉFAUT (ex: formation, elements, etc.)
  return (
    <>
      <SeoMeta {...frontmatter} />
      <Default data={pageData} />
    </>
  );
}