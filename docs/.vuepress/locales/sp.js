const pkg = require("../../../package.json");
const { getSidebar } = require("./getSidebar");

exports.localeSP = {
  lang: "sp-HN",
  title: "N\xF3madaDevops",
  description: pkg.description
};

const sidebar = {
  "/docs/": getSidebar("T\xEDtulo1", "T\xEDtulo2")
};

const nav = [
  {
    text: "Inicio",
    link: "/sp/"
  },
  {
    text: "Guida",
    link: "/sp/guide/"
  },
  {
    text: "Config",
    link: "/zh/plugin/"
  },
  {
    text: "Contribuir",
    link: "/sp/contribute"
  },
  {
    text: pkg.version,
    link: "https://www.npmjs.com/package/nomad-devops"
  }
  // {
  //   text: "了解更多",
  //   ariaLabel: "了解更多",
  //   items: [
  //     {
  //       text: "API",
  //       items: [
  //         {
  //           text: "CLI",
  //           link: "/zh/api/cli.html"
  //         },
  //         {
  //           text: "Node",
  //           link: "/zh/api/node.html"
  //         }
  //       ]
  //     },
  //     {
  //       text: "开发指南",
  //       items: [
  //         {
  //           text: "本地开发",
  //           link: "/zh/miscellaneous/local-development.html"
  //         },
  //         {
  //           text: "设计理念",
  //           link: "/zh/miscellaneous/design-concepts.html"
  //         },
  //         {
  //           text: "FAQ",
  //           link: "/zh/faq/"
  //         },
  //         {
  //           text: "术语",
  //           link: "/zh/miscellaneous/glossary.html"
  //         }
  //       ]
  //     },
  //     {
  //       text: "其他",
  //       items: [
  //         {
  //           text: "从 0.x 迁移",
  //           link: "/zh/miscellaneous/migration-guide.html"
  //         },
  //         {
  //           text: "Changelog",
  //           link: "https://github.com/vuejs/vuepress/blob/master/CHANGELOG.md"
  //         }
  //       ]
  //     }
  //   ]
  // }
];

exports.localeThemeSP = {
  label: "Spanish",
  selectText: "Idiomas",
  ariaLabel: "Seleccione el idioma",
  editLinkText: "Editar la p\xE1gina en GitHub",
  lastUpdated: "\xDAltima actualizati\xF3n",
  nav,
  sidebar
};
