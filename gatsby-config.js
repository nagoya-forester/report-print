require("dotenv").config({
  path: `.env.local`,
})
module.exports = {
  siteMetadata: {
    title: "報告書印刷システム-NPO法人名古屋シティフォレスター倶楽部",
    description:
      "報告書印刷システム-NPO法人名古屋シティフォレスター倶楽部",
    siteUrl: process.env.SITE_URL,
    lang: "ja",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-build-date`,
      options: {
        locales: "ja-JP",
        options: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: process.env.API_URL,
        apiBase: `jsonapi`,
      },
    },
  ],
}
