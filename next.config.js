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
    domains: ['assets.tina.io'],
  },
}
