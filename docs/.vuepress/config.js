require("dotenv").config();
const pkg = require("../../package.json");
const path = require("path");
const { localeEN, localeThemeEN } = require("./locales/en");
const { localeSP, localeThemeSP } = require("./locales/sp");

module.exports = ctx => ({
  dest: path.resolve(__dirname, "./dist"),
  locales: {
    "/en/": localeEN,
    "/sp/": localeSP
  },
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }]
  ],
  // permalink: `/${pkg.version}`, // when creating multiple versions of the docs
  theme: "@vuepress/theme-default",
  themeConfig: {
    repo: "matthewkeil/nomad-devops",
    editLinks: true,
    editLinksText: "Help us make nomad-devops better",
    docsDir: "docs",
    smoothScroll: false,
    // algolia: ctx.isProd ? { indexName: "nomad-devops", apiKey: process.env.ALGOLIA_API_KEY } : null,
    locales: {
      "/en/": localeThemeEN,
      "/sp/": localeThemeSP
    }
  },
  plugins: [
    ["vuepress-plugin-typescript"],
    ["vuepress-plugin-smooth-scroll"],
    ["@vuepress/nprogress"],
    ["@vuepress/back-to-top"],
    ["@vuepress/medium-zoom"],
    ["@vuepress/last-updated"],
    ["@vuepress/register-components"],
    ["@vuepress/active-header-links"],
    ["vuepress-plugin-redirect", { locales: true }],
    [
      "@vuepress/google-analytics",
      {
        "ga": process.env.GOOGLE_ANALYTICS_TRACKING_ID
      }
    ],
    [
      ("container",
      {
        type: "vue",
        before: '<pre class="vue-container"><code>',
        after: "</code><pre>"
      })
    ],
    [
      "container",
      {
        type: "upgrade",
        before: info => `<UpgradePath title="${info}"`,
        after: "</UpgradePath>"
      }
    ]
  ],
  extraWatchFiles: [".vuepress/nav/en.ts", ".vuepress/nav/sp.ts"]
});
