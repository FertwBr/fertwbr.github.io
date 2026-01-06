export const pixelCompassConfig = {
  appName: "Pixel Compass",
  appId: "io.github.fertwbr.pixelcompass",
  scheme: "pixelcompass",
  seedColor: "#6750A4",
  appIcon: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/icon.svg",
  playStoreLink: "https://play.google.com/store/apps/details?id=io.github.fertwbr.pixelcompass",
  defaultPage: 'index',
  basePath: "/content/PixelCompass/md/",
  rating: {
    value: "4.5",
    count: "230"
  },
  pages: {
    index: {
      id: "index",
      title: "Home",
      type: "react"
    },
    plus: {
      id: "plus",
      title: "Pixel Compass+",
      fileName: "pixel-compass-plus.md",
      type: "markdown"
    },
    changelog: {
      id: "changelog",
      title: "Version History",
      fileName: "changelog.md",
      type: "markdown"
    },
    roadmap: {
      id: "roadmap",
      title: "Roadmap",
      fileName: "roadmap.md",
      type: "markdown"
    },
    privacy: {
      id: "privacy",
      title: "Privacy Policy",
      fileName: "PRIVACY_POLICY.md",
      type: "markdown"
    },
    terms: {
      id: "terms",
      title: "Terms",
      fileName: "TERMS.md",
      type: "markdown"
    },
    help: {
      id: "help",
      title: "Help & FAQ",
      fileName: "HELP_FAQ.md",
      type: "markdown"
    },
    overview: {
      id: "overview",
      title: "Project Overview",
      fileName: "project_overview.md",
      type: "markdown"
    }
  }
};