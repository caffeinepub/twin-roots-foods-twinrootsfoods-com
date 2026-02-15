/**
 * Language configuration and country-to-language mapping
 */

export type SupportedLanguage = 'en' | 'ar' | 'de' | 'fr' | 'es' | 'ja' | 'ru';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  en: { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' }
};

// Country code to language mapping
export const COUNTRY_TO_LANGUAGE: Record<string, SupportedLanguage> = {
  US: 'en',
  AE: 'ar',
  SA: 'ar',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  FR: 'fr',
  BE: 'fr',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  JP: 'ja',
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru'
};

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

const STORAGE_KEY = 'twinroots_language';

export function getLanguageFromCountry(countryCode: string): SupportedLanguage {
  return COUNTRY_TO_LANGUAGE[countryCode.toUpperCase()] || DEFAULT_LANGUAGE;
}

export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return lang in SUPPORTED_LANGUAGES;
}

export function getPersistedLanguage(): SupportedLanguage | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isValidLanguage(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read persisted language:', error);
  }
  return null;
}

export function persistLanguage(lang: SupportedLanguage): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    console.warn('Failed to persist language:', error);
  }
}
