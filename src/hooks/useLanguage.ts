import { useState, useEffect } from 'react';
import { Language } from '../types';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('hi');

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as Language;
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  return { language, changeLanguage };
}