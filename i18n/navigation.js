import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation: root-relative hrefs auto-resolve to the active
// locale (/produits for fr, /en/produits for en). Never hardcode /en.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
