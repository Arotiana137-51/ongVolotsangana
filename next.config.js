const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Tailwind layers force @import inside @layer blocks, where Sass forbids
  // @use — silence the (harmless) @import deprecation until Dart Sass 3.
  sassOptions: {
    silenceDeprecations: ["import"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 540, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    const cacheStatic =
      "public, max-age=31536000, s-maxage=31536000, immutable";
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: cacheStatic }],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
