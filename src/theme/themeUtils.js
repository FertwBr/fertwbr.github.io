import {themeFromSourceColor, applyTheme, hexFromArgb} from '@material/material-color-utilities';
import {config} from '../config';

const THEME_STORAGE_KEY_PREFIX = 'app-site-theme-color-';

export function getStorageKey() {
    return `${THEME_STORAGE_KEY_PREFIX}${config.appName.toLowerCase().replace(/\s+/g, '-')}`;
}

const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};

const argbToHex = (argb) => {
    return `#${(argb & 0x00ffffff).toString(16).padStart(6, '0')}`;
};

function getThemePalette(hexColor) {
    if (!hexColor || !/^#([0-9A-F]{3}){1,2}$/i.test(hexColor)) {
        return {primary: '#BDBDBD', secondary: '#E0E0E0', tertiary: '#EEEEEE'};
    }

    try {
        const theme = themeFromSourceColor(parseInt(hexColor.replace('#', ''), 16));
        return {
            primary: hexFromArgb(theme.palettes.primary.tone(40)),
            secondary: hexFromArgb(theme.palettes.secondary.tone(40)),
            tertiary: hexFromArgb(theme.palettes.tertiary.tone(40))
        };
    } catch (error) {
        return {primary: '#BDBDBD', secondary: '#E0E0E0', tertiary: '#EEEEEE'};
    }
}

export function getSeedColor() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlColor = urlParams.get('color') || urlParams.get('theme');

    if (urlColor && /^#?([0-9A-F]{3}){1,2}$/i.test(urlColor)) {
        return urlColor.startsWith('#') ? urlColor : `#${urlColor}`;
    }

    const savedTheme = localStorage.getItem(getStorageKey());
    if (savedTheme) {
        return savedTheme;
    }

    return config.seedColor;
}

export function updateTheme() {
    const isDark = true;
    const seedColor = getSeedColor();

    if (!seedColor) return;

    try {
        const theme = themeFromSourceColor(parseInt(seedColor.replace('#', ''), 16));
        applyTheme(theme, {dark: isDark, target: document.documentElement});

        const scheme = theme.schemes.dark;
        const root = document.documentElement;

        const surface = hexFromArgb(scheme.surface);
        const surfaceContainer = scheme.surfaceContainer ? hexFromArgb(scheme.surfaceContainer) : surface;
        const primary = hexFromArgb(scheme.primary);
        const onSurface = hexFromArgb(scheme.onSurface);
        const outline = hexFromArgb(scheme.outline);

        root.style.setProperty('--md-sys-color-surface-rgb', hexToRgb(surface));
        root.style.setProperty('--md-sys-color-surface-container-rgb', hexToRgb(surfaceContainer));
        root.style.setProperty('--md-sys-color-primary-rgb', hexToRgb(primary));
        root.style.setProperty('--md-sys-color-on-surface-rgb', hexToRgb(onSurface));
        root.style.setProperty('--md-sys-color-outline-rgb', hexToRgb(outline));

    } catch (error) {
        console.error(error);
    }
}

export function applyMaterialTheme(hexColor, isDark = true) {
    try {
        const theme = themeFromSourceColor(parseInt(hexColor.replace('#', ''), 16));
        const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
        const root = document.documentElement;

        for (const [key, value] of Object.entries(scheme.toJSON())) {
            const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            root.style.setProperty(`--md-sys-color-${token}`, argbToHex(value));
        }

        const surface = hexFromArgb(scheme.surface);
        const surfaceContainer = scheme.surfaceContainer ? hexFromArgb(scheme.surfaceContainer) : surface;
        const primary = hexFromArgb(scheme.primary);

        root.style.setProperty('--md-sys-color-surface-rgb', hexToRgb(surface));
        root.style.setProperty('--md-sys-color-surface-container-rgb', hexToRgb(surfaceContainer));
        root.style.setProperty('--md-sys-color-primary-rgb', hexToRgb(primary));

    } catch (error) {
        console.error("Failed to generate theme", error);
    }
}

export function setThemeColor(color) {
    localStorage.setItem(getStorageKey(), color);
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyMaterialTheme(color, isDark);
    updateTheme();
}

export function getThemeOptions() {
    return config.themeColors.map(color => ({
        ...color,
        palette: getThemePalette(color.value)
    }));
}

export function getSurfaceColor(hexColor, isDark = true) {
    try {
        const theme = themeFromSourceColor(parseInt(hexColor.replace('#', ''), 16));
        const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
        return argbToHex(scheme.surface);
    } catch (error) {
        return '#0f1115';
    }
}