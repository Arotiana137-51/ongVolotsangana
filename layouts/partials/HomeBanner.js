import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const HomeBanner = ({ banner }) => {
  return (
    <section className="relative isolate overflow-hidden bg-body">
      <div className="container-editorial relative pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 animate-fade-up">
            <span className="eyebrow mb-6">
              Bambou · Madagascar · Depuis 2016
            </span>

            <h1 className="display text-ink">
              {markdownify(banner.title)}
            </h1>

            <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-text">
              {markdownify(banner.content)}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/produits"
                className="btn btn-primary"
                aria-label="Découvrir les produits en bambou"
              >
                Découvrir la collection
                <span aria-hidden="true" className="arrow">→</span>
              </Link>
              <Link href="/contact" className="btn-link">
                Notre mission
                <span aria-hidden="true" className="arrow">→</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "80ms" }}>
            <figure className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-theme-light">
                <Image
                  src={banner.image}
                  alt="Artisanat du bambou — ONG Volotsangana, Madagascar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-muted">
                <span>Filière complète</span>
                <span>CPTC · Tanjombato</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Trust strip — quiet, editorial */}
        <dl className="mt-16 grid grid-cols-2 gap-y-8 border-t border-border/70 pt-8 md:grid-cols-4">
          <div>
            <dt className="stat-label">Depuis</dt>
            <dd className="stat-value mt-1">2016</dd>
          </div>
          <div>
            <dt className="stat-label">Centre</dt>
            <dd className="stat-value mt-1">CPTC</dd>
          </div>
          <div>
            <dt className="stat-label">Région</dt>
            <dd className="stat-value mt-1">Analamanga</dd>
          </div>
          <div>
            <dt className="stat-label">Filière</dt>
            <dd className="stat-value mt-1">100% Bambou</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default HomeBanner;
