import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Indique à Next.js d'appliquer ce middleware sur toutes les pages, 
  // y compris la racine (/) et les routes commençant par /fr ou /en
  matcher: ['/', '/(fr|en)/:path*']
};