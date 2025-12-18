export const pixelPulseConfig = {
  appName: "Pixel Pulse",
  seedColor: "#3BA174",
  appIcon: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/icon.svg",
  playStoreLink: "https://play.google.com/store/apps/details?id=io.github.fertwbr.pixelpulse",
  defaultPage: 'index',
  basePath: "/PixelPulse/md/en/",
  pages: {
    index: {
      id: "index",
      title: "Home",
      type: "react"
    },
    plus: {
      id: "plus",
      title: "Pixel Pulse+",
      fileName: "pixel-pulse-plus.md",
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