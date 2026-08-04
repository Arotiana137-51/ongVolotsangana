"use client";

import React from "react";
import ProductCard from "@layouts/components/ProductCard";

function Produits({ data, products }) {
  const {
    frontmatter: { title },
  } = data;

  return (
    <>
      {/* Section Grille de Produits (les données viennent de Sanity) */}
      <section className="section pb-0">
        <div className="mx-auto w-4/5 px-4">
          <h1 className="text-center font-normal mb-10 text-3xl md:text-4xl font-bold text-gray-800">
            {title || "GALERIE DE PRODUITS EN BAMBOU"}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                Aucun produit disponible pour le moment.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Section Message Écologique (Mis à jour selon le document) */}
      <section className="section bg-green-50 py-16 mt-12">
        <div className="mx-auto w-4/5 px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-800">
            Nos produits sont à la fois économiques et entièrement écologiques
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-lg">
            L’ONG Volotsangana s’engage fermement pour un avenir plus écologique.
            En mettant en œuvre des initiatives durables et en sensibilisant les communautés locales
            à l’importance de la protection de l’environnement et à la réduction de la déforestation,
            Volotsangana travaille sans relâche pour préserver notre planète pour les générations futures.
            Leur mission est de promouvoir des pratiques respectueuses de l’environnement et de favoriser
            un développement durable à travers des actions concrètes et éducatives.
          </p>
        </div>
      </section>
    </>
  );
}

export default Produits;
