// src/theme/themeUtils.js
import {themeFromSourceColor, applyTheme, hexFromArgb} from '@material/material-color-utilities';
import {config} from '../config';

const GLOBAL_THEME_KEY = 'fertwbr-global-theme';
const GLOBAL_THEME_MODE_KEY = 'fertwbr-theme-mode';

/**
 * Converts a hex string to an RGB string "r, g, b".
 * @param {string} hex - Hex color code.
 * @returns {string} RGB string.
 */
const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};

/**
 * Converts ARGB number to Hex string.
 * @param {number} argb - ARGB color value.
 * @returns {string} Hex color string.
 */
const argbToHex = (argb) => {
    return `#${(argb & 0x00ffffff).toString(16).padStart(6, '0')}`;
};

/**
 * Generates a palette object from a hex color.
 * @param {string} hexColor - Seed color.
 * @returns {Object} Palette with primary, secondary, tertiary colors.
 */
function getThemePalette(hexColor) {
    if (!hexColor) return {primary: '#BDBDBD', secondary: '#E0E0E0', tertiary: '#EEEEEE'};
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

/**
 * Retrieves the saved theme from local storage.
 * @returns {string|null} The saved hex color or null.
 */
export function getSavedTheme() {
    return localStorage.getItem(GLOBAL_THEME_KEY);
}

/**
 * Retrieves the saved theme mode.
 * @returns {string} The saved mode (auto, light, dark).
 */
export function getThemeMode() {
    return localStorage.getItem(GLOBAL_THEME_MODE_KEY) || 'auto';
}

/**
 * Sets the theme mode.
 * @param {string} mode
 */
export function setThemeMode(mode) {
    if (mode === 'auto') {
        localStorage.removeItem(GLOBAL_THEME_MODE_KEY);
    } else {
        localStorage.setItem(GLOBAL_THEME_MODE_KEY, mode);
    }
    updateTheme();
}

/**
 * Checks if dark mode is active based on mode selection.
 * @returns {boolean} True if dark mode is active.
 */
export function isDarkMode() {
    const mode = getThemeMode();
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Sets up listeners for OS theme changes.
 */
export function setupThemeListener() {
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (getThemeMode() === 'auto') {
                updateTheme();
            }
        });
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
            if (getThemeMode() === 'auto') {
                updateTheme();
            }
        });
    }
}

/**
 * Determines the seed color to use.
 * PRIORITY:
 * 1. URL Parameter ('color' or 'theme') - AND SAVES IT IMMEDIATELY.
 * 2. LocalStorage.
 * 3. Default config color.
 *
 * @returns {string} The hex color to use.
 */
export function getSeedColor() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlColor = urlParams.get('color') || urlParams.get('theme');

    if (urlColor && /^#?([0-9A-F]{3}){1,2}$/i.test(urlColor)) {
        const validColor = urlColor.startsWith('#') ? urlColor : `#${urlColor}`;
        localStorage.setItem(GLOBAL_THEME_KEY, validColor);
        return validColor;
    }

    const savedTheme = localStorage.getItem(GLOBAL_THEME_KEY);
    if (savedTheme) {
        return savedTheme;
    }

    return config.seedColor;
}

/**
 * Applies the current theme to the document root variables.
 */
export function updateTheme() {
    const isDark = isDarkMode();
    const seedColor = getSeedColor();

    if (!seedColor) return;

    try {
        const theme = themeFromSourceColor(parseInt(seedColor.replace('#', ''), 16));
        applyTheme(theme, {dark: isDark, target: document.documentElement});

        const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
        const root = document.documentElement;
        const schemeJson = scheme.toJSON();

        if (!schemeJson.surfaceContainer) {
            const neutralPalette = theme.palettes.neutral;
            schemeJson.surfaceContainerLowest = neutralPalette.tone(isDark ? 4 : 100);
            schemeJson.surfaceContainerLow = neutralPalette.tone(isDark ? 10 : 96);
            schemeJson.surfaceContainer = neutralPalette.tone(isDark ? 12 : 94);
            schemeJson.surfaceContainerHigh = neutralPalette.tone(isDark ? 17 : 92);
            schemeJson.surfaceContainerHighest = neutralPalette.tone(isDark ? 22 : 90);
        }

        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        if (metaThemeColor) {
            metaThemeColor.setAttribute("content", argbToHex(schemeJson.surface));
        }

        for (const [key, value] of Object.entries(schemeJson)) {
            const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            const hex = argbToHex(value);
            root.style.setProperty(`--md-sys-color-${token}`, hex);
            root.style.setProperty(`--md-sys-color-${token}-rgb`, hexToRgb(hex));
        }

    } catch (error) {
        console.error("Theme update failed", error);
    }
}

/**
 * Applies a specific material theme without saving.
 * @param {string} hexColor
 * @param {boolean} isDark
 */
export function applyMaterialTheme(hexColor, isDark = isDarkMode()) {
    try {
        const theme = themeFromSourceColor(parseInt(hexColor.replace('#', ''), 16));
        const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
        const root = document.documentElement;
        const schemeJson = scheme.toJSON();

        if (!schemeJson.surfaceContainer) {
            const neutralPalette = theme.palettes.neutral;
            schemeJson.surfaceContainerLowest = neutralPalette.tone(isDark ? 4 : 100);
            schemeJson.surfaceContainerLow = neutralPalette.tone(isDark ? 10 : 96);
            schemeJson.surfaceContainer = neutralPalette.tone(isDark ? 12 : 94);
            schemeJson.surfaceContainerHigh = neutralPalette.tone(isDark ? 17 : 92);
            schemeJson.surfaceContainerHighest = neutralPalette.tone(isDark ? 22 : 90);
        }

        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        if (metaThemeColor) {
            metaThemeColor.setAttribute("content", argbToHex(schemeJson.surface));
        }

        for (const [key, value] of Object.entries(schemeJson)) {
            const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            const hex = argbToHex(value);
            root.style.setProperty(`--md-sys-color-${token}`, hex);
            root.style.setProperty(`--md-sys-color-${token}-rgb`, hexToRgb(hex));
        }
    } catch (e) {
        console.error("Theme apply error", e);
    }
}

/**
 * Sets a new global theme color and updates the UI.
 * @param {string} color
 */
export function setThemeColor(color) {
    localStorage.setItem(GLOBAL_THEME_KEY, color);
    updateTheme();
}

/**
 * Resets the theme to default.
 */
export function resetTheme() {
    localStorage.removeItem(GLOBAL_THEME_KEY);
    updateTheme();
}

/**
 * Returns available theme options from config.
 * @returns {Array}
 */
export function getThemeOptions() {
    return config.themeColors.map(color => ({
        ...color,
        palette: getThemePalette(color.value)
    }));
}

/**
 * Calculates the surface color for a given seed.
 * @param {string} hexColor
 * @param {boolean} isDark
 * @returns {string} Hex color.
 */
export function getSurfaceColor(hexColor, isDark = isDarkMode()) {
    try {
        const theme = themeFromSourceColor(parseInt(hexColor.replace('#', ''), 16));
        const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
        return argbToHex(scheme.surface);
    } catch (error) {
        return '#0f1115';
    }
}