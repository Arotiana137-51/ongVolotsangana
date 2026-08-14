const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Empêche Next.js d'embarquer par erreur le dossier public/ (images, vidéos)
  // dans les fonctions serverless. Ces fichiers sont déjà servis statiquement
  // par le CDN de Vercel ; ils n'ont pas besoin d'être dans le code de la fonction.
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'public/**',
        '.git/**',
        'sanityvolotsangana/**',
      ],
    },
  },
};

module.exports = withNextIntl(nextConfig);