import { themeFromSourceColor, applyTheme } from '@material/material-color-utilities';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';

const THEME_STORAGE_KEY_PREFIX = 'app-site-theme-color-';

export function getStorageKey() {
    return `${THEME_STORAGE_KEY_PREFIX}${window.config.appName.toLowerCase().replace(/\s+/g, '-')}`;
}

function getThemePalette(hexColor) {
    try {
        if (!hexColor || !/^#([0-9A-F]{3}){1,2}$/i.test(hexColor)) {
            throw new Error(`Invalid hex color`);
        }
        const theme = themeFromSourceColor(parseInt(hexColor.replace('#', ''), 16));
        const toHex = (color) => `#${(0x1000000 + color).toString(16).slice(1)}`;

        return {
            primary: toHex(theme.palettes.primary.tone(40)),
            secondary: toHex(theme.palettes.secondary.tone(40)),
            tertiary: toHex(theme.palettes.tertiary.tone(40))
        };
    } catch (error) {
        return { primary: '#BDBDBD', secondary: '#E0E0E0', tertiary: '#EEEEEE' };
    }
}

export function updateTheme(isDark) {
    const seedColor = getSeedColor();
    
    if (!seedColor) return;
    
    try {
        const theme = themeFromSourceColor(parseInt(seedColor.replace('#', ''), 16));
        applyTheme(theme, { dark: isDark, target: document.documentElement });
    } catch (error) {
        console.error(error);
    }
}

export function getSeedColor() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');
    if (urlTheme && /^([0-9A-F]{3}){1,2}$/i.test(urlTheme)) {
        return `#${urlTheme}`;
    }

    const savedTheme = localStorage.getItem(getStorageKey());
    if (savedTheme) {
        return savedTheme;
    }

    return window.config.seedColor;
}

export function getThemeOptions() {
    return window.config.themeColors.map(color => ({
        ...color,
        palette: getThemePalette(color.value)
    }));
}

export function setupTheme() {
    document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    updateTheme(mediaQuery.matches);
    mediaQuery.addEventListener('change', e => updateTheme(e.matches));
}