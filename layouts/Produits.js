import Cta from "./components/Cta";
import { BreadcrumbJsonLd, ItemListJsonLd } from "./components/JsonLd";
import ProductCard from "./components/ProductCard";

function Produits({ data, products }) {
  const {
    frontmatter: { title, call_to_action },
  } = data;

  const itemListItems = (products || [])
    .filter((p) => p?.slug?.current)
    .slice(0, 30)
    .map((p) => ({
      name: p.title,
      url: `/produits/${p.slug.current}`,
    }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Produits", url: "/produits" },
        ]}
      />
      {itemListItems.length > 0 && <ItemListJsonLd items={itemListItems} />}
      <section className="section bg-body">
        <div className="container-editorial">
          <header className="max-w-2xl">
            <span className="eyebrow mb-4">Catalogue</span>
            <h1 className="display-sm">{title}</h1>
            <p className="mt-5 text-base md:text-lg text-text">
              Mobilier, objets, artisanat, charbon, construction — la collection
              Volotsangana, fabriquée à Tanjombato et destinée aux particuliers,
              hôtels, designers et distributeurs.
            </p>
          </header>

          <ul className="mt-14 grid gap-x-6 gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <li key={product._id || index}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {call_to_action && <Cta cta={call_to_action} />}
    </>
  );
}

export default Produits;
