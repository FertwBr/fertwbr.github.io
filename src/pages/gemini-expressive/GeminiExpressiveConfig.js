/**
 * Configuration properties for the Gemini Expressive product project.
 */
export const geminiExpressiveConfig = {
    appName: "Gemini Expressive",
    appId: "io.github.fertwbr.geminiexpressive",
    scheme: "geminiexpressive",
    seedColor: "#0b57d0",
    appIcon: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Gemini/art/favicon.svg",
    chromeStoreLink: "https://chromewebstore.google.com/detail/gemini-expressive/onnljhamgihnkpcoickfmfhegimcgmho",
    firefoxStoreLink: "https://addons.mozilla.org/en-US/firefox/addon/gemini-expressive/",
    edgeStoreLink: "https://microsoftedge.microsoft.com/addons/detail/",
    defaultPage: 'index',
    basePath: "/content/GeminiExpressive/md/",
    rating: {
        value: "5.0",
        count: "10"
    },
    pages: {
        index: {
            id: "index",
            title: "Home",
            type: "react"
        },
        changelog: {
            id: "changelog",
            title: "Version History",
            fileName: "changelog.md",
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
        }
    }
};