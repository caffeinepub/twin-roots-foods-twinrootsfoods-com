/**
 * Translation hook that returns translated UI strings
 */

import { useLanguage } from './LanguageProvider';
import { UI_STRINGS, UIStringKey } from './strings';
import { translateText } from '../lib/translation/translator';
import { useQuery } from '@tanstack/react-query';

export function useT() {
  const { language } = useLanguage();

  // Always call useQuery (hooks must be called unconditionally)
  const { data: translations } = useQuery({
    queryKey: ['translations', language],
    queryFn: async () => {
      const keys = Object.keys(UI_STRINGS) as UIStringKey[];
      const texts = Object.values(UI_STRINGS);
      
      const translated = await Promise.all(
        texts.map(text => translateText(text, language, 'en'))
      );
      
      const translationMap: Record<string, string> = {};
      keys.forEach((key, index) => {
        translationMap[key] = translated[index];
      });
      
      return translationMap;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: language !== 'en' // Only fetch when not English
  });

  return (key: UIStringKey) => {
    // For English or while loading, return English strings
    if (language === 'en' || !translations || !translations[key]) {
      return UI_STRINGS[key];
    }
    return translations[key];
  };
}

// Hook for translating dynamic content (product names, descriptions, etc.)
export function useTranslate() {
  const { language } = useLanguage();

  return async (text: string, sourceLang: 'en' | 'ar' | 'de' | 'fr' | 'es' | 'ja' | 'ru' = 'en'): Promise<string> => {
    if (language === sourceLang) {
      return text;
    }
    return translateText(text, language, sourceLang);
  };
}
