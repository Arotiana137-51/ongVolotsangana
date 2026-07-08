import Image from "next/image";
import Link from "next/link";

const CraftStory = ({ image, title, body }) => {
  return (
    <section className="section bg-body">
      <div className="container-editorial">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-theme-light">
              <Image
                src={image}
                alt="Atelier du CPTC — transformation artisanale du bambou à Tanjombato, Madagascar"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </figure>

          <div className="lg:col-span-6">
            <span className="eyebrow mb-5">Notre mission</span>
            <h2 className="display-sm">{title}</h2>
            <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-text">
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contact" className="btn-link">
                Travailler avec nous
                <span aria-hidden="true" className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftStory;
