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

    heroGradient: 'linear-gradient(135deg, var(--md-sys-color-on-surface) 0%, var(--md-sys-color-primary) 50%, var(--md-sys-color-on-surface-variant) 100%)',

    staggerDelay: 0.1,
    springTransition: {
        type: "spring",
        stiffness: 260,
        damping: 20
    }
};