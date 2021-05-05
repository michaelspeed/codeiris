const withTM = require('next-transpile-modules')(['mobx-react-lite']);

module.exports = withTM({
  future: {
    webpack5: true,
  },
  // For Testing only
  images: {
    domains: ['images.unsplash.com'],
  },
})
