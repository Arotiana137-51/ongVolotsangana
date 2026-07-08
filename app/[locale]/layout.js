import config from "@config/config.json";
import theme from "@config/theme.json";
import { OrganizationJsonLd, WebSiteJsonLd } from "@layouts/components/JsonLd";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import Providers from "@layouts/partials/Providers";
import { routing } from "@i18n/routing";
import { buildMetadata } from "@lib/seo/getMetadata";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../../styles/style.scss";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = params;
  return buildMetadata({ path: "/", locale });
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F1E6" },
    { media: "(prefers-color-scheme: dark)", color: "#1F3A2A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("common");

  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <link rel="shortcut icon" href={config.site.favicon} />
        <link rel="icon" type="image/png" href={config.site.favicon} />
        <link rel="apple-touch-icon" href={config.site.favicon} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />

        <meta name="theme-name" content="Bamboo Grove" />
        <meta name="msapplication-TileColor" content="#1F3A2A" />

        <OrganizationJsonLd />
        <WebSiteJsonLd locale={locale} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="skip-link">
          {t("skipLink")}
        </a>
        <TwSizeIndicator />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main">
            <Providers>{children}</Providers>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
