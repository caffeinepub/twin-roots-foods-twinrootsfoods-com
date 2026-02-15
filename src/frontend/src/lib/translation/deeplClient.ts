/**
 * DeepL translation client for browser-side translation
 * Note: In production, you should proxy this through your backend to protect API keys
 */

interface DeepLTranslateResponse {
  translations: Array<{
    detected_source_language: string;
    text: string;
  }>;
}

const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

// For demo purposes - in production, use environment variable or backend proxy
// This is a placeholder; real implementation should use backend proxy
const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY || '';

export async function translateWithDeepL(
  text: string,
  targetLang: string,
  sourceLang: string = 'auto'
): Promise<string> {
  if (!text.trim()) return text;
  
  // If no API key, return original text (graceful degradation)
  if (!DEEPL_API_KEY) {
    console.warn('DeepL API key not configured, returning original text');
    return text;
  }

  try {
    const params = new URLSearchParams({
      auth_key: DEEPL_API_KEY,
      text: text,
      target_lang: targetLang.toUpperCase(),
      ...(sourceLang !== 'auto' && { source_lang: sourceLang.toUpperCase() })
    });

    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`);
    }

    const data: DeepLTranslateResponse = await response.json();
    return data.translations[0]?.text || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text
  }
}
