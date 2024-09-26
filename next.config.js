module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.map$/,
        loader: "ignore-loader",
      });
    }
    return config;
  },
  env: {
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: "true",
    PUPPETEER_EXECUTABLE_PATH: "/usr/bin/chromium-browser",
  },
  images: {
    domains: [
      "images.unsplash.com",
      "media.licdn.com",
      "firebasestorage.googleapis.com",
      "aceternity.com",
    ],
  },
};
