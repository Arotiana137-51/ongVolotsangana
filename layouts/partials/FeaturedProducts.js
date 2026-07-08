import Image from "next/image";
import Link from "next/link";
import client, { urlFor } from "../../sanity";

async function getFeaturedProducts() {
  try {
    // Prefer products with featured == true; fall back to most recent 3.
    const q = `*[_type == "product" && featured == true && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...3]{ _id, title, description, images, slug }`;
    let products = await client.fetch(q, {}, { next: { revalidate: 60 } });
    if (!products?.length) {
      products = await client.fetch(
        `*[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt desc)[0...3]{ _id, title, description, images, slug }`,
        {},
        { next: { revalidate: 60 } },
      );
    }
    return products || [];
  } catch (e) {
    return [];
  }
}

const FeaturedProducts = async () => {
  const products = await getFeaturedProducts();
  if (!products.length) return null;

  return (
    <section className="section bg-theme-light">
      <div className="container-editorial">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow mb-4">La collection</span>
            <h2 className="display-sm">Pièces signées Volotsangana</h2>
            <p className="mt-5 text-base md:text-lg text-text">
              Mobilier, objets et artisanat en bambou — pensés à Madagascar,
              fabriqués au CPTC de Tanjombato.
            </p>
          </div>
          <Link href="/produits" className="btn-link self-start md:self-end">
            Voir toute la collection
            <span aria-hidden="true" className="arrow">→</span>
          </Link>
        </header>

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const href = product.slug?.current
              ? `/produits/${product.slug.current}`
              : "/produits";
            return (
              <li key={product._id}>
                <Link href={href} className="group block">
                  <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-white">
                    <Image
                      src={urlFor(product.images?.[0]).width(800).url()}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </figure>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <h3 className="font-secondary text-lg leading-snug text-ink">
                      {product.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-block translate-x-0 text-ink transition-transform duration-180 ease-luxe-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedProducts;
