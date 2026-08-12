import config from "@config/config.json";
import theme from "@config/theme.json";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import Providers from "@layouts/partials/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../../styles/style.scss"; // CORRECT : 2 niveaux vers le haut

export const metadata = {
  title: "Ong Volotsangana",
  description: "Promoteur de l'utilisation du bambou",
};

export default async function RootLayout({ children, params }) {
  const messages = await getMessages();
  const locale = params.locale; 
  
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  return (
    <html suppressHydrationWarning={true} lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="shortcut icon" href={config.site.favicon} />
        <meta name="theme-name" content="Bamboo" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={`https://fonts.googleapis.com/css2?family=${pf}${sf ? "&family=" + sf : ""}&display=swap`} rel="stylesheet" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      </head>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <TwSizeIndicator />
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}