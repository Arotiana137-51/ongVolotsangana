import { defineRouting } from "next-intl/routing";

// French stays at the root (/produits), English lives under /en (/en/produits).
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});
