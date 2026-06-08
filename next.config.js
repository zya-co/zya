module.exports = {
  bundlePagesRouterDependencies: true,
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
  transpilePackages: ['gsap', 'color-string', 'tinacms'],
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
    config.module.rules.push({
      test: /node_modules[\\/]color-string[\\/]index\.js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    // TinaCMS imports @heroicons/react subpaths as directory imports (invalid in Node ESM)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@heroicons/react/solid': '@heroicons/react/solid/index.js',
      '@heroicons/react/outline': '@heroicons/react/outline/index.js',
    };

    return config;
  },
}
