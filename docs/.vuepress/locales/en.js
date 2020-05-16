const pkg = require("../../../package.json");
const { getSidebar } = require("./getSidebar");

exports.localeEN = {
  lang: "en-US",
  title: "NomadDevops"
};

const sidebar = {
  "/docs/": getSidebar("Title1", "Title2")
};

const nav = [
  {
    text: "Home",
    link: "/en/"
  },
  {
    text: "Guide",
    link: "/en/guide/"
  },
  {
    text: "Config",
    link: "/en/config/"
  },
  {
    text: "More",
    ariaLabel: "More",
    items: [
      {
        text: "Past and Future",
        items: [
          {
            text: "Road Map",
            link: "/roadmap"
          },
          {
            text: "CHANGELOG.md",
            link: "https://github.com/matthewkeil/nomad-devops/blob/master/CHANGELOG.md"
          }
        ]
      },
      {
        text: "Contribution Guide",
        items: [
          {
            text: "Design Methodology",
            link: "/contributions/design-methodology.html"
          },
          {
            text: "Dependencies and Internals",
            link: "/contributions/dependencies-and-internals.html"
          },
          {
            text: "CONTRIBUTION.md",
            link: "https://github.com/matthewkeil/nomad-devops/blob/master/CONTRIBUTION.md"
          },
          {
            text: "Getting Started",
            link: "/contributions/getting-started.html"
          }
        ]
      }
    ]
  },
  {
    text: pkg.version,
    link: "https://www.npmjs.com/package/nomad-devops"
  }
];

exports.localeThemeEN = {
  label: "English",
  selectText: "Languages",
  ariaLabel: "Select language",
  editLinkText: "Edit this page on GitHub",
  lastUpdated: "Last Updated",
  nav,
  sidebar
};
