"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../../sanity.js';
import { useLocale } from 'next-intl'; // <-- AJOUTÉ POUR DÉTECTER LA LANGUE

const ProductCard = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);
  
  // Récupère la langue actuelle ("fr" ou "en")
  const locale = useLocale();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // 🌍 LOGIQUE BILINGUE : 
  // Si on est en anglais ET que le champ anglais existe, on l'utilise. Sinon, on garde le français.
  const displayTitle = locale === "en" && product.titleEn ? product.titleEn : product.title;
  const displayDesc = locale === "en" && product.descriptionEn ? product.descriptionEn : product.description;

  // SÉCURITÉ IMAGE : Trouve l'image principale
  const mainImage = (product.images && product.images.length > 0)
    ? product.images[0]
    : (product.image ? product.image : null);

  // SÉCURITÉ DESCRIPTION (avec fallback bilingue)
  const safeDescription = typeof displayDesc === 'string' && displayDesc.trim() !== ''
    ? displayDesc
    : (locale === "en" ? "Description available on request." : "Description disponible sur demande.");

  // Traductions rapides pour l'interface du composant (pour éviter de surcharger le JSON)
  const t = {
    noImage: locale === "en" ? "Image not available" : "Image non disponible",
    viewDetails: locale === "en" ? "View details" : "Voir en détail",
    close: "X",
    noExtraImages: locale === "en" ? "No additional images available." : "Aucune image supplémentaire disponible.",
    contactInfo: locale === "en" ? "For more information or a custom order" : "Pour plus d'informations ou une commande personnalisée",
    contactBtn: locale === "en" ? "Contact us" : "Contactez-nous"
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4 flex flex-col h-full border border-gray-100 transition-shadow hover:shadow-lg" suppressHydrationWarning>

      {/* 1. Zone Image Principale (SEULEMENT l'image) */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-100 mb-4">
        {mainImage && mainImage.asset ? (
          <Image
            src={urlFor(mainImage.asset).url()}
            alt={displayTitle || "Produit en bambou"}
            fill
            className="object-contain hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm font-medium bg-gray-50">
            {t.noImage}
          </div>
        )}
      </div>

      {/* 2. Titre SEULEMENT (Utilise la variable bilingue) */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">{displayTitle}</h2>

      {/* 3. Bouton d'action */}
      <button
        onClick={togglePopup}
        className="mt-auto w-full bg-lime-700 text-white py-2 px-4 rounded-full hover:bg-lime-800 transition-colors font-medium"
      >
        {t.viewDetails}
      </button>

      {/* 4. POPUP MODAL (Description + Images supplémentaires) */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">

            {/* Bouton Fermer */}
            <div className="flex justify-end mb-2">
              <button
                onClick={togglePopup}
                className="bg-slate-500 text-white py-1 px-3 rounded-full hover:bg-slate-700 transition-colors font-bold"
              >
                {t.close}
              </button>
            </div>

            {/* Titre dans le popup (Bilingue) */}
            <h2 className="text-2xl font-semibold mb-4 text-center text-lime-800">{displayTitle}</h2>

            {/* Description (SEULEMENT dans le popup, Bilingue) */}
            <p className="mb-6 text-gray-700 text-center max-w-2xl mx-auto leading-relaxed">
              {safeDescription}
            </p>

            {/* Galerie d'images */}
            {product.images && product.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {product.images.map((image, index) => {
                  if (!image || !image.asset) return null;
                  return (
                    <div key={image._key || index} className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <Image
                        src={urlFor(image.asset).url()}
                        alt={`${displayTitle} - vue ${index + 1}`}
                        fill
                        className="object-contain hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 mb-6">{t.noExtraImages}</p>
            )}

            {/* Bouton Contact */}
            <div className="text-center mt-6 border-t pt-6">
              <p className="text-lg font-semibold mb-4 text-gray-800">{t.contactInfo}</p>
              <Link
                className="inline-block bg-lime-700 text-white py-3 px-8 rounded-full hover:bg-lime-800 transition-colors font-medium shadow-md"
                href="/contact"
              >
                {t.contactBtn}
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;