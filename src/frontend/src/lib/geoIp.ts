/**
 * Best-effort client-side geo-IP detection using free public APIs
 * Returns a normalized country code or null if detection fails
 */

interface GeoIPResponse {
  country?: string;
  country_code?: string;
  countryCode?: string;
}

export async function detectCountry(): Promise<string | null> {
  try {
    // Try ipapi.co first (no key required, 1000 requests/day)
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3000)
    });
    
    if (response.ok) {
      const data: GeoIPResponse = await response.json();
      return data.country_code || data.countryCode || null;
    }
  } catch (error) {
    console.warn('Geo-IP detection failed:', error);
  }
  
  return null;
}

export function normalizeCountryCode(code: string | null): string {
  if (!code) return 'US'; // Default fallback
  return code.toUpperCase();
}
