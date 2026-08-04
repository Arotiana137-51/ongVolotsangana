"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const LangSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLangChange = () => {
    // Bascule entre 'fr' et 'en'
    const newLocale = locale === "fr" ? "en" : "fr";

    // next-intl gère automatiquement le changement de langue tout en gardant la même page
    router.push(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={handleLangChange}
      className="inline-flex items-center justify-center rounded-full border border-border/60 px-3 py-1.5 text-sm font-medium text-ink hover:bg-theme-light transition-colors"
      aria-label="Changer de langue"
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
};

export default LangSwitcher;
