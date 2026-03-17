// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en';
import pt from '../locales/pt';
import de from '../locales/de';
import ja from '../locales/ja';
import hi from '../locales/hi';
import es from '../locales/es';

const LanguageContext = createContext();

const STORAGE_KEY = 'fertwbr-global-lang';

const languages = { en, pt, de, ja, hi, es };

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
  const result = { ...base };

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
 * Provides language state and content to the application.
 * Automatically falls back to English for missing keys using deep merge.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped.
 * @returns {JSX.Element} The Language Context Provider.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [content, setContent] = useState(en);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEY);

    if (savedLang && languages[savedLang]) {
      setLanguage(savedLang);
      setContent(deepMerge(en, languages[savedLang]));
      setIsAuto(false);
    } else {
      detectAndSetLanguage();
    }
  }, []);

  /**
   * Detects the user's browser language and applies it if supported.
   * Otherwise, defaults to English.
   */
  const detectAndSetLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    const targetLang = languages[browserLang] ? browserLang : 'en';

    setLanguage(targetLang);
    setContent(deepMerge(en, languages[targetLang]));
    setIsAuto(true);
  };

  /**
   * Manually sets the application language or resets to auto-detection.
   * @param {string} langCode - The ISO language code (e.g., 'en', 'pt', or 'auto').
   */
  const changeLanguage = (langCode) => {
    if (langCode === 'auto') {
      localStorage.removeItem(STORAGE_KEY);
      detectAndSetLanguage();
      return;
    }

    if (languages[langCode]) {
      setLanguage(langCode);
      setContent(deepMerge(en, languages[langCode]));
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
 * Hook to access the current language context.
 *
 * @returns {{language: string, content: Object, changeLanguage: Function, isAuto: boolean, availableLanguages: string[]}}
 * @throws {Error} If used outside of a LanguageProvider.
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};