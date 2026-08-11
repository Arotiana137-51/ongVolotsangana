// 1. On importe le plugin et on lui indique où est ton fichier de config i18n
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Nécessaire pour les images Sanity
  },
  // ... toute autre config que tu avais déjà ici
};

// 2. On exporte la config enveloppée par le plugin
module.exports = withNextIntl(nextConfig);