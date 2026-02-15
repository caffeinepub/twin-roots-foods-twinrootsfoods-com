/**
 * Language context provider with geo-IP detection and persistence
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SupportedLanguage, DEFAULT_LANGUAGE, getPersistedLanguage, persistLanguage, getLanguageFromCountry, SUPPORTED_LANGUAGES } from '../lib/language';
import { detectCountry, normalizeCountryCode } from '../lib/geoIp';

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isInitializing: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function initializeLanguage() {
      // Check for persisted manual selection first
      const persisted = getPersistedLanguage();
      if (persisted) {
        setLanguageState(persisted);
        applyLanguageToDocument(persisted);
        setIsInitializing(false);
        return;
      }

      // Try geo-IP detection
      try {
        const countryCode = await detectCountry();
        const normalized = normalizeCountryCode(countryCode);
        const detectedLang = getLanguageFromCountry(normalized);
        setLanguageState(detectedLang);
        applyLanguageToDocument(detectedLang);
      } catch (error) {
        console.warn('Language detection failed, using default:', error);
        setLanguageState(DEFAULT_LANGUAGE);
        applyLanguageToDocument(DEFAULT_LANGUAGE);
      } finally {
        setIsInitializing(false);
      }
    }

    initializeLanguage();
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    persistLanguage(lang);
    applyLanguageToDocument(lang);
  };

  function applyLanguageToDocument(lang: SupportedLanguage) {
    const config = SUPPORTED_LANGUAGES[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = config.dir;
    
    // Add/remove RTL class for styling
    if (config.dir === 'rtl') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isInitializing }}>
      {children}
    </LanguageContext.Provider>
  );
}
