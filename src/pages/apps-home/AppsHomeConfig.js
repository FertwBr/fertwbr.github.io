/**
 * Configuration for the Apps Portal (apps.fertwbr.com)
 * Defines metadata, theme colors, and external links for the apps landing page.
 */
export const appsHomeConfig = {
    appName: "Fernando's Apps",
    appId: "apps_portal",
    faviconUrl: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/fertwbr/apps/favicon/favicon.ico",
    themeColor: "#4FA3D1",

    portfolioUrl: "https://fertwbr.com",
    heroGradient: 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 50%, #a0a0a0 100%)',

    staggerDelay: 0.1,
    springTransition: {
        type: "spring",
        stiffness: 260,
        damping: 20
    }
};