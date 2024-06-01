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
    locales: ["en", "sr"],
    defaultLocale: "sr",
  },
};
