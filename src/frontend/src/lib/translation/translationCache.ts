/**
 * In-memory and sessionStorage-backed translation cache
 */

interface CacheEntry {
  translation: string;
  timestamp: number;
}

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const STORAGE_KEY = 'twinroots_translation_cache';

class TranslationCache {
  private memoryCache: Map<string, CacheEntry> = new Map();

  private getCacheKey(text: string, sourceLang: string, targetLang: string): string {
    return `${sourceLang}:${targetLang}:${text.substring(0, 100)}`;
  }

  get(text: string, sourceLang: string, targetLang: string): string | null {
    const key = this.getCacheKey(text, sourceLang, targetLang);
    
    // Check memory cache first
    const memEntry = this.memoryCache.get(key);
    if (memEntry && Date.now() - memEntry.timestamp < CACHE_DURATION) {
      return memEntry.translation;
    }

    // Check sessionStorage
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const cache: Record<string, CacheEntry> = JSON.parse(stored);
        const entry = cache[key];
        if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
          // Restore to memory cache
          this.memoryCache.set(key, entry);
          return entry.translation;
        }
      }
    } catch (error) {
      console.warn('Failed to read translation cache:', error);
    }

    return null;
  }

  set(text: string, sourceLang: string, targetLang: string, translation: string): void {
    const key = this.getCacheKey(text, sourceLang, targetLang);
    const entry: CacheEntry = {
      translation,
      timestamp: Date.now()
    };

    // Store in memory
    this.memoryCache.set(key, entry);

    // Store in sessionStorage
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      const cache: Record<string, CacheEntry> = stored ? JSON.parse(stored) : {};
      cache[key] = entry;
      
      // Limit cache size (keep last 100 entries)
      const entries = Object.entries(cache);
      if (entries.length > 100) {
        const sorted = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
        const limited = Object.fromEntries(sorted.slice(0, 100));
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
      }
    } catch (error) {
      console.warn('Failed to write translation cache:', error);
    }
  }

  clear(): void {
    this.memoryCache.clear();
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear translation cache:', error);
    }
  }
}

export const translationCache = new TranslationCache();
