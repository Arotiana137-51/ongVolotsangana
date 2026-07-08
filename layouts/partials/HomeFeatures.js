import { markdownify } from "@lib/utils/textConverter";

const HomeFeatures = ({ feature }) => {
  return (
    <section className="section bg-body">
      <div className="container-editorial">
        <header className="max-w-2xl">
          <span className="eyebrow mb-4">La filière</span>
          <h2 className="display-sm">
            {markdownify(feature.title)}
          </h2>
          <p className="mt-5 max-w-xl text-base md:text-lg text-text">
            De la pépinière à la commercialisation — une chaîne de valeur
            complète, intégrée et durable, opérée depuis Tanjombato (Antananarivo).
          </p>
        </header>

        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {feature.features.map((item, i) => (
            <article
              key={`feature-${i}`}
              className="group relative pt-8 border-t border-border/70"
            >
              <span className="absolute -top-px left-0 h-px w-12 bg-primary transition-[width] duration-300 ease-luxe-out group-hover:w-20" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-secondary text-xl leading-snug text-ink">
                {markdownify(item.name)}
              </h3>
              <p className="mt-3 text-sm text-text leading-relaxed">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
