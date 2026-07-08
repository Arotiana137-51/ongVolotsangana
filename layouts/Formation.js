import Link from "next/link";

// ── SVG icon components ───────────────────────────────────────────────────────

const IconSeedling = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <path d="M12 22V12" />
    <path d="M12 12C12 7 7 4 3 6c0 4 3 7 9 6" />
    <path d="M12 12c0-5 5-8 9-6-1 4-4 7-9 6" />
  </svg>
);

const IconBamboo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <rect x="8" y="2" width="4" height="20" rx="1" />
    <rect x="12" y="6" width="4" height="16" rx="1" />
    <path d="M8 6 C6 5 4 6 3 8" />
    <path d="M12 10 C14 8 17 9 18 11" />
    <path d="M8 14 C6 13 4 14 3 16" />
  </svg>
);

const IconFlame = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const IconChair = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
    <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
    <path d="M5 18v2" />
    <path d="M19 18v2" />
  </svg>
);

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const IconSaw = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
    <path d="M10 10V5l-3 3" />
    <path d="M14 5v5l3-3" />
    <path d="M10 15v-5" />
    <path d="M14 10v5" />
  </svg>
);

const IconFlask = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <path d="M9 3h6l1 9H8z" />
    <path d="M6.5 14c-1.5 1.5-2.5 3-2.5 5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2c0-2-1-3.5-2.5-5" />
    <line x1="8.5" y1="3" x2="8.5" y2="9" />
    <line x1="15.5" y1="3" x2="15.5" y2="9" />
  </svg>
);

const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 12.5-8.97 4.08a2 2 0 0 1-1.66 0L2 12.5" />
    <path d="m22 17.5-8.97 4.08a2 2 0 0 1-1.66 0L2 17.5" />
  </svg>
);

const IconLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconLightbulb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// ── Localized Dictionary ──────────────────────────────────────────────────────

const translations = {
  fr: {
    heroEyebrow: "CPTC — Centre de formation",
    heroDesc: "Le CPTC dispose des Référentiels d'Activité, de Compétence et de Formation. Ses formations s'adressent à tous les acteurs de la filière bambou — de la pépinière à l'innovation produit.",
    audiences: ["Pépiniéristes", "Planteurs", "Artisans", "Transformateurs", "Néo-entrepreneurs", "Entrepreneurs"],
    section1Eyebrow: "Programmes certifiants",
    section1Title: "Référentiels d'activités, de compétence et de formation",
    section1Desc: "Six filières structurées, de la culture du bambou jusqu'à la menuiserie fine.",
    moduleLabel: "Module",
    section2Eyebrow: "Accompagnement technique",
    section2Title: "Services et appui-conseil",
    section2Desc: "Au-delà des formations certifiantes, le CPTC propose un accompagnement opérationnel : de la sélection de la matière première jusqu'au prototypage de produits innovants en bambou.",
    ctaBoxTitle: "Vous avez un projet en bambou ?",
    ctaBoxDesc: "Notre équipe technique peut vous accompagner de la conception à la réalisation.",
    ctaBoxBtn: "Nous contacter",
    stats: [
      { value: "6", label: "Filières de formation" },
      { value: "5", label: "Services d'appui-conseil" },
      { value: "100%", label: "Bambou Madagascar" },
      { value: "CPTC", label: "Tanjombato" },
    ],
    ctaSectionEyebrow: "Intéressé ?",
    ctaSectionTitle: "Rejoindre une formation ou demander un appui",
    ctaSectionDesc: "Contactez le CPTC pour connaître les prochaines sessions disponibles ou pour une demande d'accompagnement personnalisé.",
    ctaSectionBtnPrimary: "Prendre contact",
    ctaSectionBtnSecondary: "Voir nos réalisations",
    referentiels: [
      "Production de jeunes plants de bambou",
      "Plantation de bambou",
      "Fabrication de charbon de bambou et de pellettes de charbon",
      "Fabrication de meubles et mobilier en bambou",
      "Construction de maison en bambou",
      "Fabrication de produits de menuiserie en bambou",
    ],
    services: [
      "Traitement de bambou et de lamelles de bambou",
      "Production de lamelles de bambou",
      "Utilisation de lamelles collées",
      "Élaboration de prototypes de produits de design / innovation",
      "Encadrement pour la mise au point technique de produits en bambou",
    ],
  },
  en: {
    heroEyebrow: "CPTC — Training Centre",
    heroDesc: "The CPTC has Activity, Competence, and Training Frameworks. Its training courses are designed for all stakeholders in the bamboo sector — from nurseries to product innovation.",
    audiences: ["Nursery growers", "Planters", "Artisans", "Processors", "New entrepreneurs", "Entrepreneurs"],
    section1Eyebrow: "Certifying Programs",
    section1Title: "Activity, competence and training frameworks",
    section1Desc: "Six structured branches, from bamboo cultivation to fine joinery.",
    moduleLabel: "Module",
    section2Eyebrow: "Technical Support",
    section2Title: "Services and advisory support",
    section2Desc: "Beyond certifying training, the CPTC offers operational support: from raw material selection to the prototyping of innovative bamboo products.",
    ctaBoxTitle: "Do you have a bamboo project?",
    ctaBoxDesc: "Our technical team can accompany you from design to completion.",
    ctaBoxBtn: "Contact us",
    stats: [
      { value: "6", label: "Training branches" },
      { value: "5", label: "Advisory services" },
      { value: "100%", label: "Madagascar Bamboo" },
      { value: "CPTC", label: "Tanjombato" },
    ],
    ctaSectionEyebrow: "Interested?",
    ctaSectionTitle: "Join a training course or request support",
    ctaSectionDesc: "Contact the CPTC to find out about upcoming sessions or for a custom support request.",
    ctaSectionBtnPrimary: "Get in touch",
    ctaSectionBtnSecondary: "View our creations",
    referentiels: [
      "Young bamboo plant production",
      "Bamboo plantation",
      "Bamboo charcoal and charcoal pellet making",
      "Bamboo furniture and fittings manufacturing",
      "Bamboo house construction",
      "Bamboo joinery products",
    ],
    services: [
      "Treatment of bamboo and bamboo laths",
      "Bamboo lath production",
      "Use of glued laminates",
      "Design/innovation product prototyping",
      "Technical development support for bamboo products",
    ],
  },
};

const iconMappingReferentiels = [IconSeedling, IconBamboo, IconFlame, IconChair, IconHome, IconSaw];
const iconMappingServices = [IconFlask, IconLayers, IconLink, IconLightbulb, IconTarget];

// ─────────────────────────────────────────────────────────────────────────────

const Formation = ({ data, locale = "fr" }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;
  const activeLocale = locale === "en" ? "en" : "fr";
  const t = translations[activeLocale];

  const referentielsList = t.referentiels.map((label, idx) => ({
    Icon: iconMappingReferentiels[idx] || IconBamboo,
    label,
  }));

  const servicesList = t.services.map((label, idx) => ({
    Icon: iconMappingServices[idx] || IconTarget,
    label,
  }));

  return (
    <>
      {/* ── Hero ── */}
      <section className="section bg-body border-b border-border/40">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <span className="eyebrow mb-5">{t.heroEyebrow}</span>
            <h1 className="mt-3 font-secondary text-h2-sm md:text-h2 lg:text-h1-sm leading-tight text-ink">
              {title}
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-text max-w-2xl">
              {t.heroDesc}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {t.audiences.map((a) => (
                <span
                  key={a}
                  className="inline-block rounded-full border border-border/60 bg-theme-light px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-ink"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Référentiels ── */}
      <section className="section bg-theme-light">
        <div className="container-editorial">
          <header className="mb-12">
            <span className="eyebrow mb-4">{t.section1Eyebrow}</span>
            <h2 className="mt-3 font-secondary text-h3-sm md:text-h3 text-ink">
              {t.section1Title}
            </h2>
            <p className="mt-4 max-w-xl text-base text-text">
              {t.section1Desc}
            </p>
          </header>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {referentielsList.map(({ Icon, label }, i) => (
              <li key={i}>
                <div className="feature-card h-full flex flex-col gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon />
                  </span>
                  <p className="font-secondary text-base font-medium leading-snug text-ink">
                    {label}
                  </p>
                  <span className="mt-auto text-xs font-medium uppercase tracking-widest text-primary">
                    {t.moduleLabel} {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Services & appui-conseil ── */}
      <section className="section bg-body">
        <div className="container-editorial">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start">
            {/* Left: sticky intro */}
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow mb-4">{t.section2Eyebrow}</span>
              <h2 className="mt-3 font-secondary text-h3-sm md:text-h3 text-ink">
                {t.section2Title}
              </h2>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-text">
                {t.section2Desc}
              </p>
              <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm font-medium text-primary">
                  {t.ctaBoxTitle}
                </p>
                <p className="mt-1 text-sm text-text">
                  {t.ctaBoxDesc}
                </p>
                <Link href="/contact" className="btn btn-primary mt-4 inline-flex text-sm">
                  {t.ctaBoxBtn}
                  <span aria-hidden="true" className="arrow">→</span>
                </Link>
              </div>
            </div>

            {/* Right: service list */}
            <ul className="flex flex-col gap-4">
              {servicesList.map(({ Icon, label }, i) => (
                <li key={i}>
                  <div className="flex items-start gap-5 rounded-2xl border border-border/50 bg-white p-5 transition-shadow duration-200 hover:shadow-soft">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-theme-light text-primary">
                      <Icon />
                    </span>
                    <p className="text-base font-medium leading-snug text-ink">
                      {label}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="section-tight border-y border-border/40 bg-theme-light">
        <div className="container-editorial">
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {t.stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="stat-value">{value}</dt>
                <dd className="stat-label">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section bg-body">
        <div className="container-editorial text-center">
          <span className="eyebrow mb-4 justify-center">{t.ctaSectionEyebrow}</span>
          <h2 className="mt-3 font-secondary text-h3-sm md:text-h3 text-ink">
            {t.ctaSectionTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base md:text-lg text-text">
            {t.ctaSectionDesc}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              {t.ctaSectionBtnPrimary}
              <span aria-hidden="true" className="arrow">→</span>
            </Link>
            <Link href="/produits" className="btn-link">
              {t.ctaSectionBtnSecondary}
              <span aria-hidden="true" className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Formation;
