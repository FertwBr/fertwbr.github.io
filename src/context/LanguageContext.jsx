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
 * @param {Object} rawLang
 * @param {Object} defaultLang
 * @returns {Object}
 */
function buildContent(rawLang, defaultLang) {
    const mergedLang = deepMerge(defaultLang, rawLang);

    const shared = mergedLang.shared || {};
    const portfolio = mergedLang.portfolio || {};
    const pixel_pulse = mergedLang.pixel_pulse || {};
    const pixel_compass = mergedLang.pixel_compass || {};
    const apps_home = mergedLang.apps_home || {};
    const gemini_expressive = mergedLang.gemini_expressive || {};

    return {
        ...shared,
        ...portfolio,
        shared,
        portfolio,
        pixel_pulse: deepMerge(shared, pixel_pulse),
        pixel_compass: deepMerge(shared, pixel_compass),
        apps_home: deepMerge(shared, apps_home),
        gemini_expressive: deepMerge(shared, gemini_expressive)
    };
}

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
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

    const detectAndSetLanguage = () => {
        const browserLang = navigator.language.split('-')[0];
        const targetLang = languages[browserLang] ? browserLang : 'en';

        setLanguage(targetLang);
        setContent(buildContent(languages[targetLang], en));
        setIsAuto(true);
    };

    /**
     * @param {string} langCode
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
 * @returns {{language: string, content: Object, changeLanguage: Function, isAuto: boolean, availableLanguages: string[]}}
 * @throws {Error}
 */
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};