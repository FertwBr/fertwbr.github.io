/**
 * @file PixelMeasureConfig.js
 * @description Configuration properties for the Pixel Measure product project.
 */

export const pixelMeasureConfig = {
    appName: "Pixel Measure",
    appId: "com.fertwbr.pixelmeasure",
    scheme: "pixelmeasure",
    seedColor: "#F57C00",
    appIcon: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Measure/art/icon.svg",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.fertwbr.pixelmeasure",
    betaLink: "https://play.google.com/apps/testing/com.fertwbr.pixelmeasure",
    defaultPage: 'index',
    basePath: "/content/PixelMeasure/md/",
    rating: {
        value: "0.0",
        count: "0"
    },
    pages: {
        index: {
            id: "index",
            title: "Home",
            type: "react"
        },
        beta: {
            id: "beta",
            title: "Beta Program",
            type: "react"
        },
        plus: {
            id: "plus",
            title: "Pixel Measure+",
            fileName: "pixel-measure-plus.md",
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