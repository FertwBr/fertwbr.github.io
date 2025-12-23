export const config = {
  appName: "FernandoPortfolio",
  seedColor: "#D97706",
  themeColors: [
    { name: "M3 Purple", value: "#6750A4" },
    { name: "Crimson", value: "#9C4146" },
    { name: "Teal", value: "#006A6A" },
    { name: "Forest", value: "#4C662B" },
    { name: "Emerald", value: "#1B6E4F" },
    { name: "Amber", value: "#B86E00" },
    { name: "Coral", value: "#D65A4A" },
    { name: "Rose", value: "#B9375E" },
    { name: "Magenta", value: "#8E3A8C" },
  ]
};

export const siteProjectConfig = {
  appName: "Portfolio",
  appId: "io.github.fertwbr.portfolio",
  seedColor: "#d87739",
  appIcon: "https://github.com/fertwbr.png",
  defaultPage: 'overview',
  basePath: "/content/site/md/",
  pages: {
    changelog: {
      id: "changelog",
      title: "Version History",
      fileName: "changelog.md",
      type: "markdown"
    },
    overview: {
      id: "overview",
      title: "Project Overview",
      fileName: "overview.md",
      type: "markdown"
    }
  }
};

if (typeof window !== 'undefined') {
  window.config = config;
}