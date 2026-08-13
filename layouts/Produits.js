"use client";

import React from "react";
import ProductCard from "@layouts/components/ProductCard";
import { useTranslations, useLocale } from "next-intl";

function Produits({ data, products }) {
  const { frontmatter: { title } } = data;
  
  // Récupération des traductions et de la langue actuelle
  const t = useTranslations("produits");
  const locale = useLocale(); 

  return (
    <>
      {/* Section Grille de Produits */}
      <section className="section pb-0">
        <div className="mx-auto w-4/5 px-4">
          <h1 className="text-center font-normal mb-10 text-3xl md:text-4xl font-bold text-gray-800">
            {title || t("gallery_title")}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products && products.length > 0 ? (
              products.map((product, index) => (
                // ✅ CORRECTION 3 : On inclut la locale dans la key. 
                // Quand la langue change, la key change, et React recrée totalement le composant.
                <ProductCard key={`${locale}-${product._id || index}`} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                {t("no_products")}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Section Message Écologique */}
      <section className="section bg-green-50 py-16 mt-12">
        <div className="mx-auto w-4/5 px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-800">
            {t("eco_title")}
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-lg">
            {t("eco_text")}
          </p>
        </div>
      </section>
    </>
  );
}

export default Produits;