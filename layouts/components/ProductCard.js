"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { urlFor } from "../../sanity.js";

const ProductCard = ({ product }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const toggle = () => {
    setShowPopup((s) => !s);
    setActiveIdx(0);
  };

  const slug = product.slug?.current;
  const href = slug ? `/produits/${slug}` : null;
  const images = product.images || [];
  const primary = images[0];
  const activeImage = images[activeIdx] || primary;

  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={showPopup}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-theme-light text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-body"
      >
        {primary && (
          <Image
            src={urlFor(primary).width(800).url()}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain transition-transform duration-[600ms] ease-luxe-out group-hover:scale-[1.03]"
          />
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-ink-fade p-4 text-right text-xs uppercase tracking-[0.22em] text-white opacity-0 transition-opacity duration-180 ease-luxe-out group-hover:opacity-100 md:block"
        >
          Voir le détail →
        </span>
      </button>

      <div className="mt-5 flex items-start justify-between gap-4">
        <h2 className="font-secondary text-lg leading-snug text-ink">
          {product.title}
        </h2>
        <button
          type="button"
          onClick={toggle}
          aria-label={`Voir le détail de ${product.title}`}
          className="mt-1 text-ink transition-transform duration-180 ease-luxe-out hover:translate-x-1"
        >
          →
        </button>
      </div>

      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={product.title}
          onClick={toggle}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[6px] bg-body shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Close button ── */}
            <button
              onClick={toggle}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-theme-light text-ink transition-colors duration-180 hover:bg-ink hover:text-white"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="grid lg:grid-cols-2">
              {/* ── Left: image viewer ── */}
              <div className="flex flex-col bg-theme-light p-6 md:p-8 rounded-t-[6px] lg:rounded-l-[6px] lg:rounded-tr-none">
                {/* Hero image */}
                <div className="relative w-full overflow-hidden rounded-[4px] bg-white"
                     style={{ aspectRatio: "4/5" }}>
                  {activeImage && (
                    <Image
                      src={urlFor(activeImage.asset || activeImage).width(1200).url()}
                      alt={`${product.title} — vue ${activeIdx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                      priority
                    />
                  )}
                </div>

                {/* Thumbnail strip — only shown when there are multiple images */}
                {images.length > 1 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={img._key || idx}
                        type="button"
                        onClick={() => setActiveIdx(idx)}
                        aria-label={`Vue ${idx + 1}`}
                        className={`relative shrink-0 overflow-hidden rounded-[3px] bg-white transition-all duration-180 ${
                          idx === activeIdx
                            ? "ring-2 ring-primary ring-offset-1 ring-offset-theme-light"
                            : "opacity-60 hover:opacity-100"
                        }`}
                        style={{ width: 72, height: 72 }}
                      >
                        <Image
                          src={urlFor(img.asset || img).width(200).url()}
                          alt={`Vue ${idx + 1}`}
                          fill
                          sizes="72px"
                          className="object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Right: info panel ── */}
              <div className="flex flex-col p-6 md:p-10 lg:p-12">
                <div className="pr-10">
                  <span className="eyebrow mb-3">Pièce artisanale</span>
                  <h2 className="mt-2 font-secondary text-h3-sm md:text-h3 leading-tight text-ink">
                    {product.title}
                  </h2>
                </div>

                {product.description && (
                  <p className="mt-6 text-base md:text-lg leading-relaxed text-text">
                    {product.description}
                  </p>
                )}

                {/* Meta details */}
                <dl className="mt-8 grid grid-cols-2 gap-y-5 border-t border-border/60 pt-6 text-sm">
                  <dt className="stat-label">Matière</dt>
                  <dd className="font-secondary text-ink">
                    {product.material || "Bambou Madagascar"}
                  </dd>
                  <dt className="stat-label">Origine</dt>
                  <dd className="font-secondary text-ink">Madagascar</dd>
                  <dt className="stat-label">Fabrication</dt>
                  <dd className="font-secondary text-ink">CPTC Tanjombato</dd>
                  {images.length > 0 && (
                    <>
                      <dt className="stat-label">Photos</dt>
                      <dd className="font-secondary text-ink">{images.length} vue{images.length > 1 ? "s" : ""}</dd>
                    </>
                  )}
                </dl>

                <div className="mt-auto pt-8 flex flex-wrap items-center gap-4">
                  <Link className="btn btn-primary" href="/contact">
                    Demander un devis
                    <span aria-hidden="true" className="arrow">→</span>
                  </Link>
                  {href && (
                    <Link href={href} className="btn-link">
                      Voir la fiche produit
                      <span aria-hidden="true" className="arrow">→</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default ProductCard;
