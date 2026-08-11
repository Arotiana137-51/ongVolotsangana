import config from "@config/config.json";
import theme from "@config/theme.json";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import Providers from "@layouts/partials/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../styles/style.scss";

export const metadata = {
  title: "Ong Volotsangana",
  description: "Promoteur de l'utilisation du bambou",
};

// 1. La fonction doit être "async" pour pouvoir attendre les messages
export default async function RootLayout({ children }) {
  // 2. Récupère automatiquement les messages (fr.json ou en.json) selon l'URL
  const messages = await getMessages();
  
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  
  return (
    <html suppressHydrationWarning={true} lang="fr">
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="Bamboo" />

        {/* google font css */}
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

        {/* theme meta */}
        <meta name="theme-name" content="Bamboo" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </head>
      <body suppressHydrationWarning={true}>
        {/* 3. Enveloppe TOUT le contenu avec le Provider pour que useTranslations fonctionne */}
        <NextIntlClientProvider messages={messages}>
          <TwSizeIndicator />
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}