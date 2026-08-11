"use client";

import { useRouter, usePathname } from "@i18n/navigation"; // ✅ Import CORRECT depuis next-intl
import { useLocale } from "next-intl";

export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  
  // Détermine la langue cible (si on est en FR, on vise EN, et vice-versa)
  const nextLocale = locale === "fr" ? "en" : "fr";

  const switchLocale = () => {
    // Le router de next-intl gère automatiquement l'ajout/suppression du préfixe /en/
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={switchLocale}
      className="px-4 py-2 rounded-full border-2 border-lime-700 text-lime-700 font-bold hover:bg-lime-700 hover:text-white transition-all duration-300 text-sm uppercase"
      aria-label={`Switch to ${nextLocale}`}
    >
      {nextLocale}
    </button>
  );
}