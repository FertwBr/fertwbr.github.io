import { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en';
import pt from '../locales/pt';
import de from '../locales/de';
import ja from '../locales/ja';
import hi from '../locales/hi';
import es from '../locales/es';

const LanguageContext = createContext();

const languages = {
  en,
  pt,
  de,
  ja,
  hi,
  es
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [content, setContent] = useState(en);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    
    const initialLang = languages[browserLang] ? browserLang : 'en';
    
    setLanguage(initialLang);
    setContent(languages[initialLang]);
  }, []);

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
      setContent(languages[langCode]);
    } else {
      console.warn(`Language ${langCode} not supported`);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, content, changeLanguage, availableLanguages: Object.keys(languages) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);