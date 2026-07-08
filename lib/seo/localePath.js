import { routing } from "@i18n/routing";
import { siteUrl } from "./getMetadata";

/** Root-relative path for a locale (fr stays at /, en under /en). */
export function localePath(path = "/", locale = routing.defaultLocale) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized;
  return normalized === "/" ? "/en" : `/en${normalized}`;
}

/** Absolute URL for a locale + path. */
export function localizedUrl(path = "/", locale = routing.defaultLocale) {
  return `${siteUrl}${localePath(path, locale)}`;
}
