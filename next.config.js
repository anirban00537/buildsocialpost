/** @type {import('next').NextConfig} */
const nextConfig = {
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
