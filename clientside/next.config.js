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

    if (dev) {
      // esbuildLoader(config, {
      //   loader: "jsx",
      //   target: "es2017",
      // });
    }

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
        webpack5: false, // <-- Set webpack5: false here
      };
    }

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve("file-loader"),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? "../" : ""}static/images/`,
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag|svg)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
});
