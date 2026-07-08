import Link from "next/link";

// Unmatched paths fall through to the root layout (which only returns children,
// with no <html>/<body>), so Next requires a root not-found that supplies them.
// Localized 404s are handled by app/[locale]/not-found.js; this is the fallback.
export default function RootNotFound() {
  return (
    <html lang="fr">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h1 style={{ fontSize: "2rem", margin: 0 }}>404</h1>
          <p style={{ margin: 0 }}>Page introuvable — Page not found</p>
          <Link href="/" style={{ textDecoration: "underline" }}>
            Accueil / Home
          </Link>
        </main>
      </body>
    </html>
  );
}
