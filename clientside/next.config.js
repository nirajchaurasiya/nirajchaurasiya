const withOffline = require("next-offline");
const webpack = require("webpack");

module.exports = withOffline({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // next.config.js
  env: {
    URI: process.env.URI,
  },

  webpack: (config, { dev, isServer }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      })
    );

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
        webpack5: false, // Set webpack5: false here
      };
    }
    return config;
  },
});
