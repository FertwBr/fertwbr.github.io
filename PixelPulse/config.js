const AppConfig = {
    appName: "Pixel Pulse",
    siteVersion: '2.0.0',
    seedColor: '#3BA174',
    playStoreLink: "https://play.google.com/store/apps/details?id=io.github.fertwbr.pixelpulse",
    githubLink: "https://github.com/FertwBr/PixelPulse",
    supportEmail: "fertwbr@programmer.net",
    
    appIcon: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/icon.svg",
    
    appDescription: "Your smart and expressive sound meter for Android, designed with a native feel for the Pixel ecosystem.",

    carouselImages: [
        { type: 'phone', src: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/pulse_main_screen.png", alt: "Real-time decibel meter" },
        { type: 'phone', src: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/pulse_history_list.png", alt: "Session history screen" },
        { type: 'phone', src: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/pulse_noise.png", alt: "Noise budget" },
        { type: 'phone', src: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/pulse_real.png", alt: "Real Time" }
    ],

    supportedLanguages: [
        { code: 'en', name: 'English' }, { code: 'pt', name: 'Português' },
        { code: 'es', name: 'Español' }, { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' }, { code: 'it', name: 'Italiano' },
        { code: 'ja', name: '日本語' }, { code: 'ko', name: '한국어' },
        { code: 'zh-CN', name: '简体中文' }, { code: 'ru', name: 'Русский' },
        { code: 'ar', name: 'العربية' }, { code: 'hi', name: 'हिन्दी' },
        { code: 'nl', name: 'Nederlands' }, { code: 'tr', name: 'Türkçe' },
        { code: 'sv', name: 'Svenska' }, { code: 'pl', name: 'Polski' },
        { code: 'vi', name: 'Tiếng Việt' }, { code: 'id', name: 'Bahasa Indonesia' },
        { code: 'zh-TW', name: '繁體中文' }
    ],

    themeColors: [
        { name: 'Pulse Green', value: '#3BA174' },
        { name: 'Indigo', value: '#3F51B5' },
        { name: 'Blue', value: '#2196F3' },
        { name: 'Teal', value: '#009688' },
        { name: 'Green', value: '#4CAF50' },
        { name: 'Amber', value: '#FFC107' },
        { name: 'Orange', value: '#FF9800' },
        { name: 'Red', value: '#F44336' },
        { name: 'Purple', value: '#9C27B0' },
        { name: 'Pink', value: '#E91E63' },
        { name: 'Brown', value: '#795548' },
        { name: 'Grey', value: '#9E9E9E' }
    ],

    navItems: [
        { id: 'index', inactiveIcon: 'home', mobileShow: true },
        { id: 'plus', inactiveIcon: 'workspace_premium', mobileShow: true },
        { id: 'changelog', inactiveIcon: 'history' },
        { id: 'roadmap', inactiveIcon: 'signpost' },
        { id: 'overview', inactiveIcon: 'info_outline' },
        { id: 'help', inactiveIcon: 'help_outline' },
        { id: 'privacy', inactiveIcon: 'shield_outline' }
    ],

    pageConfig: {
        'index': { defaultFile: 'index.md' },
        'plus': { defaultFile: 'pixel-pulse-plus.md' },
        'overview': { defaultFile: 'project_overview.md' },
        'roadmap': { defaultFile: 'roadmap.md' },
        'changelog': { defaultFile: 'changelog.md' },
        'help': { defaultFile: 'HELP_FAQ.md' },
        'privacy': { defaultFile: 'PRIVACY_POLICY.md' }
    }
};
window.config = AppConfig;