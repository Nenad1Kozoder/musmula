module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "musmula.nenad-kozoder.rs",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  i18n: {
    defaultLocale: "sr",
    locales: ["en", "sr"],
    localeDetection: false,
  },
};
