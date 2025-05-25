const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const webpack = require("webpack");

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  env: {
    URI: process.env.URI,
  },
  webpack: (config, { isServer }) => {
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
      };
    }

    return config;
  },
});
