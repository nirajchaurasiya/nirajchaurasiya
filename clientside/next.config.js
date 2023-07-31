const withOffline = require("next-offline");
const webpack = require("webpack");

module.exports = withOffline({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      })
    );

    // Remove the esbuildLoader part as it is not needed
    // if (dev) {
    //   esbuildLoader(config, {
    //     loader: "jsx",
    //     target: "es2017",
    //   });
    // }

    // Modify the webpack config as needed
    // Example: Add a custom plugin
    // config.plugins.push(new MyCustomPlugin());

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
