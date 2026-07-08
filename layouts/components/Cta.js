import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

function Cta({ cta }) {
  return (
    <section className="section bg-body">
      <div className="container-editorial">
        <div className="relative overflow-hidden rounded-[4px] bg-ink p-10 md:p-16">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="eyebrow-light mb-5">Collaborations</span>
              <h2 className="display-sm text-white">
                {cta?.title}
              </h2>
              <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-white/80">
                {markdownify(cta?.content)}
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              {cta.button?.enable && (
                <Link
                  className="btn btn-secondary"
                  href={cta.button.link}
                  rel={cta.button.rel}
                >
                  {cta.button.label}
                  <span aria-hidden="true" className="arrow">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
