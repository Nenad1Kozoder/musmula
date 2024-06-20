module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wpres.studiomusmula.rs",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        port: "",
      },
    ],
  },
  i18n: {
    defaultLocale: "sr",
    locales: ["en", "sr"],
    localeDetection: false,
  },
};
