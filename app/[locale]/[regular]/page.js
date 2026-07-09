import NotFound from "@layouts/404";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import Faq from "@layouts/Faq";
import Formation from "@layouts/Formation";
import Produits from "@layouts/Produits";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
import { buildMetadata } from "@lib/seo/getMetadata";
import { routing } from "@i18n/routing";
import { setRequestLocale } from "next-intl/server";
import client from '../../../sanity';

export async function generateMetadata({ params }) {
  const { regular, locale } = await params;
  const data = await getRegularPage(regular, locale);
  const { title, meta_title, description, image, noindex, canonical } =
    data.frontmatter || {};
  return buildMetadata({
    title: meta_title || title,
    description,
    image,
    path: canonical ? canonical.replace(/^https?:\/\/[^/]+/, "") : `/${regular}`,
    noindex,
    locale,
  });
}

// for all regular pages
const RegularPages = async ({ params }) => {
  const { regular, locale } = await params;
  setRequestLocale(locale);
  const regularPageData = await getRegularPage(regular, locale);
  const { layout } = regularPageData.frontmatter;
  const product = await client.fetch(
    `*[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt desc){ _id, title, description, images, slug, material }`,
    {},
    { next: { revalidate: 60 } },
  );

  return (
    <>
      {layout === "404" ? (
        <NotFound data={regularPageData} />
      ) : layout === "contact" ? (
        <Contact data={regularPageData} />
      ) : layout === "produits" ? (
        <Produits data={regularPageData} products={product} />
      ) : layout === "formation" ? (
        <Formation data={regularPageData} locale={locale} />
      ) : layout === "faq" ? (
        <Faq data={regularPageData} />
      ) : (
        <Default data={regularPageData} />
      )}
    </>
  );
};
export default RegularPages;

// for regular page routes — enumerate FR slugs, emit one path per locale
export const generateStaticParams = async () => {
  const allslugs = await getSinglePage("content");
  const slugs = allslugs.map((item) => item.slug);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, regular: slug })),
  );
};
