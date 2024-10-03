/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.ong-volotsangana.org/', // Replace with your website URL
    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
      ],
    },
    // ...other options
  };
  