import config from "@config/config.json";
import { localizedUrl } from "@lib/seo/getMetadata";

export function OrganizationJsonLd() {
  const { address, phone, email, founding_year } = config.params;
  const data = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "ONG Volotsangana",
    alternateName: "Volotsangana",
    url: localizedUrl("/"),
    logo: localizedUrl(config.site.logo),
    image: localizedUrl(config.metadata.meta_image),
    description: config.metadata.meta_description,
    foundingDate: founding_year,
    address: {
      "@type": "PostalAddress",
      streetAddress: address?.street,
      addressLocality: address?.locality,
      postalCode: address?.postal_code,
      addressCountry: address?.country,
    },
    areaServed: { "@type": "Country", name: "Madagascar" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      email,
      contactType: "customer support",
      availableLanguage: ["French", "Malagasy", "English"],
    },
    sameAs: [],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd({ locale = "fr" }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.site.title,
    url: localizedUrl("/", locale),
    inLanguage: locale,
    publisher: { "@type": "NGO", name: "ONG Volotsangana" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items = [], locale = "fr" }) {
  if (!items.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url?.startsWith("http")
        ? item.url
        : localizedUrl(item.url, locale),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd({
  title,
  description,
  image,
  url,
  material,
  locale = "fr",
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description,
    image: image?.startsWith("http") ? image : localizedUrl(image, locale),
    brand: { "@type": "Brand", name: "ONG Volotsangana" },
    manufacturer: {
      "@type": "Organization",
      name: "ONG Volotsangana",
      areaServed: "Madagascar",
    },
    material: material || "Bambou",
    countryOfOrigin: "Madagascar",
    url: url?.startsWith("http") ? url : localizedUrl(url || "", locale),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ItemListJsonLd({ items = [], locale = "fr" }) {
  if (!items.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url?.startsWith("http") ? it.url : localizedUrl(it.url, locale),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  url,
  locale = "fr",
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image?.startsWith("http") ? image : localizedUrl(image, locale),
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Person", name: authorName || "ONG Volotsangana" },
    publisher: {
      "@type": "Organization",
      name: "ONG Volotsangana",
      logo: {
        "@type": "ImageObject",
        url: localizedUrl(config.site.logo),
      },
    },
    mainEntityOfPage: url?.startsWith("http")
      ? url
      : localizedUrl(url || "", locale),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
