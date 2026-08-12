import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Intercepte TOUTES les routes, sauf :
  // - api, _next, _vercel (dossiers système Next.js)
  // - les fichiers avec une extension (ex: .ico, .css, .jpg)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};