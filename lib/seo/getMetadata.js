import config from "@config/config.json";
import { routing } from "@i18n/routing";
import { localePath, localizedUrl } from "./localePath";

const stripHtml = (s = "") => String(s).replace(/<[^>]*>/g, "").trim();

export const siteUrl = (config.site.base_url || "").replace(/\/$/, "");

export function buildMetadata({
  title,
  description,
  image,
  path = "/",
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  locale = routing.defaultLocale,
} = {}) {
  const { meta_image, meta_description, meta_author, meta_keywords } =
    config.metadata;
  const siteTitle = config.site.title;
  const ogLocale = locale === "en" ? "en_US" : "fr_MG";

  const finalTitle = title ? `${stripHtml(title)} | ONG Volotsangana` : siteTitle;
  const finalDescription = stripHtml(description || meta_description);
  const finalImage = `${siteUrl}${image || meta_image}`;
  const url = localizedUrl(path, locale);
  const frUrl = localizedUrl(path, "fr");
  const enUrl = localizedUrl(path, "en");

  return {
    metadataBase: new URL(siteUrl || "https://www.ong-volotsangana.org"),
    title: finalTitle,
    description: finalDescription,
    keywords: keywords || meta_keywords,
    authors: authors || [{ name: meta_author }],
    alternates: {
      canonical: url,
      languages: {
        fr: frUrl,
        en: enUrl,
        "x-default": frUrl,
      },
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type,
      locale: ogLocale,
      url,
      siteName: "ONG Volotsangana",
      title: finalTitle,
      description: finalDescription,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: stripHtml(title || siteTitle),
        },
      ],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },
    verification: {
      google: "hnlnlvrNL-crVAVmCsPaOB2UZRKD0wlrJh-1HWyj_lo",
    },
    other: {
      "theme-color": "#1F3A2A",
    },
  };
}

export { localePath, localizedUrl };
export default buildMetadata;
