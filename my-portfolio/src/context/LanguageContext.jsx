import { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en';
import pt from '../locales/pt';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [content, setContent] = useState(en);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const initialLang = browserLang === 'pt' ? 'pt' : 'en';
    setLanguage(initialLang);
    setContent(initialLang === 'pt' ? pt : en);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'pt' : 'en';
    setLanguage(newLang);
    setContent(newLang === 'pt' ? pt : en);
  };

  return (
    <LanguageContext.Provider value={{ language, content, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);