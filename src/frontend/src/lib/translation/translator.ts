/**
 * Main translation facade with caching
 */

import { translateWithDeepL } from './deeplClient';
import { translationCache } from './translationCache';
import { SupportedLanguage } from '../language';

// Map our language codes to DeepL language codes
const LANG_CODE_MAP: Record<SupportedLanguage, string> = {
  en: 'EN',
  ar: 'AR',
  de: 'DE',
  fr: 'FR',
  es: 'ES',
  ja: 'JA',
  ru: 'RU'
};

export async function translateText(
  text: string,
  targetLang: SupportedLanguage,
  sourceLang: SupportedLanguage = 'en'
): Promise<string> {
  // No translation needed if same language
  if (sourceLang === targetLang) {
    return text;
  }

  // Check cache first
  const cached = translationCache.get(text, sourceLang, targetLang);
  if (cached) {
    return cached;
  }

  // Translate
  const targetCode = LANG_CODE_MAP[targetLang];
  const sourceCode = sourceLang === 'en' ? 'auto' : LANG_CODE_MAP[sourceLang];
  
  const translation = await translateWithDeepL(text, targetCode, sourceCode);
  
  // Cache the result
  translationCache.set(text, sourceLang, targetLang, translation);
  
  return translation;
}

export async function translateBatch(
  texts: string[],
  targetLang: SupportedLanguage,
  sourceLang: SupportedLanguage = 'en'
): Promise<string[]> {
  return Promise.all(texts.map(text => translateText(text, targetLang, sourceLang)));
}
