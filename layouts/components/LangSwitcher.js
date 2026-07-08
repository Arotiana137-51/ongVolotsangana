"use client";

import { Link, usePathname } from "@i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

const LangSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("header");
  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-border/60 px-3 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-180 hover:border-primary hover:text-primary"
      aria-label={t("langSwitch")}
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
};

export default LangSwitcher;
