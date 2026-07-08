import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip api routes, the dynamic sitemap, Next internals, and anything with a
  // file extension (static assets) — only page routes get locale handling.
  matcher: ["/((?!api|server-sitemap.xml|_next|_vercel|.*\\..*).*)"],
};
