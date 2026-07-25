
import ProductCard from "./components/ProductCard";




function Produits({ data, products }) {
  const {
    frontmatter: { title, articles },
  } = data;


  return (
    <>
      <section className="section pb-0">
        <div className="mx-auto w-4/5 px-4">
          <h1 className="text-center font-normal">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
    
            {products.map((products, index) => (
              <ProductCard key={index} product={products} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Produits;
