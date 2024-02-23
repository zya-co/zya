module.exports = {
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
  transpilePackages: ['gsap'],
  images: {
    // domains: ['assets.tina.io'],
    remotePatterns: [
      {
        hostname: 'assets.tina.io',
      },
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}
