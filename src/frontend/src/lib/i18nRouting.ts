/**
 * Utilities for language-prefixed routing
 */

import { SupportedLanguage, isValidLanguage, DEFAULT_LANGUAGE } from './language';

export function parseLanguageFromPath(pathname: string): SupportedLanguage | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isValidLanguage(segments[0])) {
    return segments[0];
  }
  return null;
}

export function stripLanguagePrefix(pathname: string): string {
  const lang = parseLanguageFromPath(pathname);
  if (lang) {
    return pathname.replace(`/${lang}`, '') || '/';
  }
  return pathname;
}

export function addLanguagePrefix(pathname: string, lang: SupportedLanguage): string {
  const stripped = stripLanguagePrefix(pathname);
  return `/${lang}${stripped === '/' ? '' : stripped}`;
}

export function switchLanguageInPath(pathname: string, newLang: SupportedLanguage): string {
  const stripped = stripLanguagePrefix(pathname);
  return addLanguagePrefix(stripped, newLang);
}
