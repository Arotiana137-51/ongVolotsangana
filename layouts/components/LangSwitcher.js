"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "@i18n/navigation"; // CORRECT : next-intl routing
import { useLocale } from "next-intl";
import { useGlobalLoader } from "./GlobalLoaderProvider";

const LOCALE_LABELS = {
  fr: "Français",
  en: "English",
};

export default function LangSwitcher() {
  const [isPending, startTransition] = useTransition();
  const showLoader = useGlobalLoader();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const nextLocale = locale === "fr" ? "en" : "fr";

  const switchLocale = () => {
    // Ce n'est pas un vrai <a href>, donc le clic global du
    // GlobalLoaderProvider ne le détecte pas tout seul : on l'appelle ici
    // directement, affichage immédiat au clic.
    showLoader();
    startTransition(() => {
      router.push(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="px-4 py-2 rounded-full border-2 border-lime-700 text-lime-700 font-bold hover:bg-lime-700 hover:text-white transition-all duration-300 text-sm disabled:opacity-60"
      aria-label={`Switch to ${LOCALE_LABELS[nextLocale]}`}
    >
      {LOCALE_LABELS[nextLocale]}
    </button>
  );
}