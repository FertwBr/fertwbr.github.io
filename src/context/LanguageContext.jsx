import { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en';
import pt from '../locales/pt';
import de from '../locales/de';
import ja from '../locales/ja';
import hi from '../locales/hi';
import es from '../locales/es';

const LanguageContext = createContext();

const STORAGE_KEY = 'fertwbr-global-lang';

const languages = { en, pt, de, ja, hi, es };

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [content, setContent] = useState(en);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEY);

    if (savedLang && languages[savedLang]) {
      setLanguage(savedLang);
      setContent(languages[savedLang]);
      setIsAuto(false);
    } else {
      detectAndSetLanguage();
    }
  }, []);

  const detectAndSetLanguage = () => {
    const browserLang = navigator.language.split('-')[0];
    const targetLang = languages[browserLang] ? browserLang : 'en';
    setLanguage(targetLang);
    setContent(languages[targetLang]);
    setIsAuto(true);
  };

  const changeLanguage = (langCode) => {
    if (langCode === 'auto') {
      localStorage.removeItem(STORAGE_KEY);
      detectAndSetLanguage();
      return;
    }

    if (languages[langCode]) {
      setLanguage(langCode);
      setContent(languages[langCode]);
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};