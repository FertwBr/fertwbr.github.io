const AppConfig = {
    appName: "Pixel Compass",
    siteVersion: '2.0.0',
    seedColor: '#6750A4',
    playStoreLink: "https://play.google.com/store/apps/details?id=io.github.fertwbr.pixelcompass",
    githubLink: "https://github.com/fertwbr/PixelCompass",
    supportEmail: "fertwbr@programmer.net",
    appIcon: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/icon.svg",
    appDescription: "Your sleek, new, and beautifully designed navigation buddy for Android and Wear OS.",
    
    carouselImages: [
        { type: 'phone', src: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone-1.png", alt: "Main screen" },
        { type: 'phone', src: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone-2.png", alt: "Light theme" },
        { type: 'phone', src: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone-3.png", alt: "Settings" },
        { type: 'phone', src: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone-4.png", alt: "Widgets" },
        { type: 'phone', src: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone-5.png", alt: "Onboarding" },
        { type: 'wear', src: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/wear-1.png", alt: "Wear OS"}
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
        { name: 'Default', value: '#6750A4' },
        { name: 'Indigo', value: '#3F51B5' },
        { name: 'Blue', value: '#2196F3' },
        { name: 'Teal', value: '#009688' },
        { name: 'Green', value: '#4CAF50' },
        { name: 'Amber', value: '#FFC107' },
        { name: 'Orange', value: '#FF9800' },
        { name: 'Red', value: '#F44336' }
    ],
    navItems: [
        { id: 'index', label: 'Home', drawerLabel: 'Home', inactiveIcon: 'home', mobileShow: true },
        { id: 'plus', label: 'Plus', drawerLabel: 'Pixel Compass+', inactiveIcon: 'workspace_premium', mobileShow: true },
        { id: 'changelog', label: 'Changelog', drawerLabel: 'Version History', inactiveIcon: 'history', mobileShow: false },
        { id: 'roadmap', label: 'Roadmap', drawerLabel: 'Roadmap', inactiveIcon: 'signpost', mobileShow: false },
        { id: 'overview', label: 'Overview', drawerLabel: 'Project Overview', inactiveIcon: 'info_outline', mobileShow: false },
        { id: 'help', label: 'Help', drawerLabel: 'Help & FAQ', inactiveIcon: 'help_outline', mobileShow: false },
        { id: 'privacy', label: 'Privacy', drawerLabel: 'Privacy Policy', inactiveIcon: 'shield_outline', mobileShow: true }
    ],
    pageConfig: {
        'index': { defaultFile: 'index.md' },
        'plus': { defaultFile: 'pixel-compass-plus.md' },
        'overview': { defaultFile: 'project_overview.md' },
        'roadmap': { defaultFile: 'roadmap.md' },
        'changelog': { defaultFile: 'changelog.md' },
        'help': { defaultFile: 'HELP_FAQ.md' },
        'privacy': { defaultFile: 'PRIVACY_POLICY.md' }
    },
    panel: {
        cardTitleCTA: 'Get Pixel Compass',
        ctaButton: 'Get it on Google Play',
        cardTitleUpdate: 'Recent Updates',
        cardTitleTestimonials: 'User Voice',
        cardTitleProTip: 'Did You Know?',
        testimonials: [
            { stars: 5, quote: 'The app is just gorgeous.', author: 'A Pixel User' },
            { stars: 5, quote: 'Nice man... awesome UI.', author: 'An Android Enthusiast' },
            { stars: 5, quote: 'Finally a compass app that works perfectly on my watch!', author: 'A Galaxy Watch User' }
        ],
        proTips: [
            'You can tap the info ring to toggle between DMS and Decimal coordinates.',
            'The Level Screen (Beta) uses expressive animations that change with your phone orientation.',
            'On Wear OS, the app colors automatically adapt to your chosen watch face.',
            'Add widgets to your home screen for quick access to altitude, weather, and more.'
        ]
    }
};
window.config = AppConfig;