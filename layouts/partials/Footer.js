import config from "@config/config.json";
import menu from "@config/menu.json";
import { Link } from "@i18n/navigation";
import { markdownify } from "@lib/utils/textConverter";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const Footer = async () => {
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");
  const { copyright } = config.params;
  const { footer } = menu;
  const { title } = config.site;
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink pt-20 pb-10 text-white/80" role="contentinfo">
      <div className="container-editorial">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              aria-label={`${title} — ${tCommon("homeAria")}`}
              className="inline-block"
            >
              <Image
                src={config.site.logo}
                width={Number(config.site.logo_width) || 120}
                height={Number(config.site.logo_height) || 45}
                alt={`${title} — logo`}
                className="brightness-0 invert"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              {t("about", { year: config.params.founding_year || 2016 })}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-white/50">
              {t("location")}
            </p>
          </div>

          <div className="md:col-span-8 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {footer.map((col) => (
              <address className="not-italic" key={col.name}>
                {markdownify(
                  col.name,
                  "h2",
                  "font-secondary text-sm font-medium uppercase tracking-[0.22em] text-white/60",
                )}
                <ul className="mt-5 space-y-3">
                  {col?.menu.map((item) => (
                    <li key={item.text}>
                      {item.url && item.url !== "#" ? (
                        <Link
                          href={item.url}
                          className="text-sm text-white/85 hover:text-secondary"
                          style={{ transition: "color var(--dur) var(--ease-out)" }}
                        >
                          {item.text}
                        </Link>
                      ) : (
                        <span className="text-sm text-white/85">{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </address>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          {markdownify(
            copyright.replace("©2024", `©${year}`),
            "p",
            "text-xs text-white/60 m-0",
          )}
          <nav aria-label={t("secondaryNav")}>
            <ul className="flex gap-6 text-xs uppercase tracking-[0.18em] text-white/60">
              <li>
                <Link
                  href="/"
                  className="hover:text-secondary"
                  style={{ transition: "color var(--dur) var(--ease-out)" }}
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/produits"
                  className="hover:text-secondary"
                  style={{ transition: "color var(--dur) var(--ease-out)" }}
                >
                  {t("produits")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-secondary"
                  style={{ transition: "color var(--dur) var(--ease-out)" }}
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
