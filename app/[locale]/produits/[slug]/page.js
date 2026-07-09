import { BreadcrumbJsonLd, ProductJsonLd } from "@layouts/components/JsonLd";
import { Link } from "@i18n/navigation";
import { routing } from "@i18n/routing";
import { buildMetadata } from "@lib/seo/getMetadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import client, { urlFor } from "../../../../sanity";

async function getProduct(slug) {
  try {
    return await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]{
        _id, title, description, images, slug, material
      }`,
      { slug },
    );
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const product = await getProduct(slug);
  if (!product) return buildMetadata({ noindex: true, locale });
  const image = product.images?.[0]
    ? urlFor(product.images[0]).width(1200).height(630).url()
    : undefined;
  return buildMetadata({
    title: `${product.title} — Artisanat bambou Madagascar`,
    description:
      product.description ||
      `${product.title} : pièce en bambou conçue et fabriquée à Madagascar par l'ONG Volotsangana.`,
    image,
    path: `/produits/${slug}`,
    type: "website",
    locale,
  });
}

export async function generateStaticParams() {
  try {
    const products = await client.fetch(
      `*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`,
    );
    return routing.locales.flatMap((locale) =>
      (products || []).map((p) => ({ locale, slug: p.slug })),
    );
  } catch {
    return [];
  }
}

const ProductPage = async ({ params }) => {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("product");
  const tNav = await getTranslations("produits");
  const product = await getProduct(slug);
  if (!product) notFound();

  const primary = product.images?.[0];
  const primaryUrl = primary
    ? urlFor(primary).width(1600).url()
    : "/images/logo.png";

  return (
    <>
      <ProductJsonLd
        title={product.title}
        description={product.description}
        image={primaryUrl}
        url={`/produits/${slug}`}
        material={product.material || t("defaultMaterial")}
        locale={locale}
      />
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: tNav("breadcrumbHome"), url: "/" },
          { name: tNav("breadcrumbProduits"), url: "/produits" },
          { name: product.title, url: `/produits/${slug}` },
        ]}
      />

      <section className="section bg-body">
        <div className="container-editorial">
          <nav
            className="mb-10 text-xs uppercase tracking-[0.22em] text-muted"
            aria-label={t("breadcrumbAria")}
          >
            <Link href="/" className="hover:text-ink">
              {tNav("breadcrumbHome")}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/produits" className="hover:text-ink">
              {tNav("breadcrumbProduits")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{product.title}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-theme-light">
                <Image
                  src={primaryUrl}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                  priority
                />
              </figure>

              {product.images?.length > 1 && (
                <ul className="mt-3 grid grid-cols-4 gap-3">
                  {product.images.slice(1).map((img, i) => (
                    <li key={img._key || i}>
                      <figure className="relative aspect-square w-full overflow-hidden rounded-[4px] bg-theme-light">
                        <Image
                          src={urlFor(img.asset || img).width(400).url()}
                          alt={`${product.title} — vue ${i + 2}`}
                          fill
                          sizes="(max-width: 768px) 25vw, 15vw"
                          className="object-contain"
                        />
                      </figure>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="lg:col-span-5">
              <span className="eyebrow mb-4">{t("piece")}</span>
              <h1 className="font-secondary text-h2-sm md:text-h2 leading-tight text-ink">
                {product.title}
              </h1>

              {product.description && (
                <p className="mt-6 text-base md:text-lg leading-relaxed text-text">
                  {product.description}
                </p>
              )}

              <dl className="mt-10 grid grid-cols-2 gap-y-6 border-t border-border/70 pt-8 text-sm">
                <dt className="stat-label">{t("matiere")}</dt>
                <dd className="font-secondary text-ink">
                  {product.material || t("defaultMaterial")}
                </dd>
                <dt className="stat-label">{t("origine")}</dt>
                <dd className="font-secondary text-ink">{t("origineValue")}</dd>
                <dt className="stat-label">{t("fabrication")}</dt>
                <dd className="font-secondary text-ink">{t("fabricationValue")}</dd>
              </dl>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link className="btn btn-primary" href="/contact">
                  {t("quote")}
                  <span aria-hidden="true" className="arrow">
                    →
                  </span>
                </Link>
                <Link href="/produits" className="btn-link">
                  {t("collection")}
                  <span aria-hidden="true" className="arrow">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
