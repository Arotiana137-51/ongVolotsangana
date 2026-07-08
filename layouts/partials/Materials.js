import Image from "next/image";

const Materials = () => {
  return (
    <section className="section bg-theme-light">
      <div className="container-editorial">
        <header className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4 justify-center">Matière & savoir-faire</span>
          <h2 className="display-sm">Le bambou de Madagascar, traité avec soin.</h2>
          <p className="mt-5 text-base md:text-lg text-text">
            Espèce endémique <em className="not-italic font-secondary text-ink">Cathariostachys madagascariensis</em>,
            sélection des chaumes, séchage maîtrisé, traitement contre les insectes,
            transformation en lamelles collées : chaque étape conditionne la
            longévité de la pièce finale.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
            <Image
              src="/images/bamboo-banner.jpg"
              alt="Plantation de bambou à Madagascar — ressource renouvelable"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-ink-fade p-5 text-xs uppercase tracking-[0.22em] text-white">
              Plantation · Analamanga
            </figcaption>
          </figure>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
            <Image
              src="/images/servtech/Image2.png"
              alt="Atelier de transformation du bambou — CPTC Tanjombato"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-ink-fade p-5 text-xs uppercase tracking-[0.22em] text-white">
              Atelier · CPTC Tanjombato
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Materials;
