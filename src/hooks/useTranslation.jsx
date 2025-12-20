import { useState, useEffect } from 'react';
import en from '../locales/en';
import pt from '../locales/pt';

export function useTranslation() {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState(en);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    const detected = browserLang === 'pt' ? 'pt' : 'en';
    setLanguage(detected);
    setT(detected === 'pt' ? pt : en);
  }, []);

  return { t, language };
}