module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
  transpilePackages: ['gsap', 'color-string'],
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
  webpack: (config) => {
    // Fix for color-string CommonJS module compatibility with ESM imports
    // The package has been patched to include direct exports, so we just need
    // to ensure webpack properly handles the CommonJS -> ESM interop
    config.module.rules.push({
      test: /node_modules[\\/]tinacms[\\/]node_modules[\\/]color-string[\\/]index\.js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    
    return config;
  },
}
