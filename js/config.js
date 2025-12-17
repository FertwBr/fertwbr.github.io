const AppConfig = {
    appName: "Fernando Vaz",
    siteVersion: '2.0.0',
    seedColor: '#E6BE8A',
    supportEmail: "fertwbr@programmer.net",
    playStoreLink: "", 
    profileImage: "https://github.com/fertwbr.png",
    carouselImages: [],
    appDescription: "Software Engineer & Android Developer. Creating intuitive, beautiful, and high-performance applications.",

    supportedLanguages: [
        { code: 'en', name: 'English' }, 
        { code: 'pt', name: 'Português' }
    ],
    
    themeColors: [
        { name: 'Sand', value: '#E6BE8A' },
        { name: 'Sage', value: '#9FAE8F' },
        { name: 'Ocean', value: '#799FB5' },
        { name: 'Clay', value: '#B58B79' }
    ],

    navItems: [
        { id: 'index', label: 'About', drawerLabel: 'About Me', inactiveIcon: 'person', mobileShow: true },
        { id: 'projects', label: 'Projects', drawerLabel: 'My Projects', inactiveIcon: 'grid_view', mobileShow: true },
        { id: 'contact', label: 'Contact', drawerLabel: 'Contact', inactiveIcon: 'mail', mobileShow: true }
    ],

    pageConfig: {
        'index': { defaultFile: 'index.md' },
        'projects': { defaultFile: 'projects.md' },
        'contact': { defaultFile: 'contact.md' }
    },
    
    panel: {
        cardTitleCTA: 'Check my GitHub',
        ctaButton: 'View Profile'
    }
};

window.config = AppConfig;