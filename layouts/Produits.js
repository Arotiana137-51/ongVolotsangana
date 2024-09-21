import Link from "next/link";
import Cta from "./components/Cta";
import ProductCard from "./components/ProductCard";




function Produits({ data, products }) {
  const {
    frontmatter: { title, articles, call_to_action },
  } = data;


  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <h1 className="text-center font-normal">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    
            {products.map((products, index) => (
              <ProductCard key={index} product={products} />
            ))}
          </div>
        </div>
      </section>
      {/* <Cta cta={call_to_action} /> */}
    </>
  );
}

export default Produits;
