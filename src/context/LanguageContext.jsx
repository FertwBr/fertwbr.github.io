import React, {createContext, useContext, useState, useEffect} from 'react';
import en from '../locales/en';
import pt from '../locales/pt';
import de from '../locales/de';
import ja from '../locales/ja';
import hi from '../locales/hi';
import es from '../locales/es';

const LanguageContext = createContext();

const STORAGE_KEY = 'fertwbr-global-lang';

const languages = {en, pt, de, ja, hi, es};

/**
 * Recursively merges the properties of the source object into the target object.
 * Used to fill missing translations with the default language (English).
 *
 * @param {Object} base - The default fallback object (usually English).
 * @param {Object} override - The target object with local translations.
 * @returns {Object} A new object with merged properties ensuring no missing keys.
 */
function deepMerge(base, override) {
    if (!override) return base;
    const result = {...base};

    for (const key in base) {
        if (key in override) {
            if (typeof base[key] === 'object' && base[key] !== null && !Array.isArray(base[key])) {
                result[key] = deepMerge(base[key], override[key]);
            } else {
                result[key] = override[key];
            }
        }
    }

    for (const key in override) {
        if (!(key in base)) {
            result[key] = override[key];
        }
    }

    return result;
}

/**
 * Builds the final localized content object by merging specific modules
 * with the shared translations.
 *
 * @param {Object} rawLang - The raw imported language object for the selected locale.
 * @param {Object} defaultLang - The default language object (English) used as a fallback.
 * @returns {Object} The complete, merged localization dictionary ready for components.
 */
function buildContent(rawLang, defaultLang) {
    const mergedLang = deepMerge(defaultLang, rawLang);

    const shared = mergedLang.shared || {};
    const portfolio = mergedLang.portfolio || {};
    const pixel_pulse = mergedLang.pixel_pulse || {};
    const pixel_compass = mergedLang.pixel_compass || {};
    const pixel_measure = mergedLang.pixel_measure || {};
    const apps_home = mergedLang.apps_home || {};
    const gemini_expressive = mergedLang.gemini_expressive || {};

    return {
        ...shared,
        ...portfolio,
        shared,
        portfolio,
        pixel_pulse: deepMerge(shared, pixel_pulse),
        pixel_compass: deepMerge(shared, pixel_compass),
        pixel_measure: deepMerge(shared, pixel_measure),
        apps_home: deepMerge(shared, apps_home),
        gemini_expressive: deepMerge(shared, gemini_expressive)
    };
}

/**
 * Provides the application's localization state and functions to child components.
 * Manages the current language selection, handles auto-detection, and persists
 * user preferences to localStorage.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child components wrapped by this provider.
 * @returns {JSX.Element} The LanguageContext Provider.
 */
export function LanguageProvider({children}) {
    const [language, setLanguage] = useState('en');
    const [content, setContent] = useState(() => buildContent(en, en));
    const [isAuto, setIsAuto] = useState(true);

    useEffect(() => {
        const savedLang = localStorage.getItem(STORAGE_KEY);

        if (savedLang && languages[savedLang]) {
            setLanguage(savedLang);
            setContent(buildContent(languages[savedLang], en));
            setIsAuto(false);
        } else {
            detectAndSetLanguage();
        }
    }, []);

    /**
     * Detects the user's browser language and applies it if supported.
     * Falls back to English if the browser language is not supported.
     */
    const detectAndSetLanguage = () => {
        const browserLang = navigator.language.split('-')[0];
        const targetLang = languages[browserLang] ? browserLang : 'en';

        setLanguage(targetLang);
        setContent(buildContent(languages[targetLang], en));
        setIsAuto(true);
    };

    /**
     * Changes the application's active language and persists the choice.
     * If 'auto' is selected, it clears the stored preference and detects the browser's language.
     *
     * @param {string} langCode - The code of the target language (e.g., 'en', 'pt') or 'auto'.
     */
    const changeLanguage = (langCode) => {
        if (langCode === 'auto') {
            localStorage.removeItem(STORAGE_KEY);
            detectAndSetLanguage();
            return;
        }

        if (languages[langCode]) {
            setLanguage(langCode);
            setContent(buildContent(languages[langCode], en));
            setIsAuto(false);
            localStorage.setItem(STORAGE_KEY, langCode);
        }
    };

    return (
        <LanguageContext.Provider value={{
            language,
            content,
            changeLanguage,
            isAuto,
            availableLanguages: Object.keys(languages)
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

/**
 * Custom hook to consume the LanguageContext.
 *
 * @returns {{language: string, content: Object, changeLanguage: Function, isAuto: boolean, availableLanguages: string[]}} The localization state and functions.
 * @throws {Error} If used outside of a LanguageProvider.
 */
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};