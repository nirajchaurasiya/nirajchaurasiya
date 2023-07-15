const withOffline = require('next-offline');

module.exports = withOffline({
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
    },
    webpack: (config, { dev, isServer }) => {
        // Modify the webpack config as needed
        // Example: Add a custom plugin
        // config.plugins.push(new MyCustomPlugin());

        return config;
    },
});
