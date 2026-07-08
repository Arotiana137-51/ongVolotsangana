import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const Workflow = ({ workflow }) => {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="relative h-[60vh] min-h-[420px] w-full">
        <Image
          src={workflow.image}
          alt="Forêt de bambou — ressource renouvelable et durable"
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container-editorial pb-16 md:pb-24">
            <div className="max-w-3xl">
              <span className="eyebrow-light mb-5">Pourquoi le bambou</span>
              {markdownify(
                workflow.title,
                "h2",
                "display-sm text-white"
              )}
              {workflow.description && (
                <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-white/80">
                  {workflow.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
