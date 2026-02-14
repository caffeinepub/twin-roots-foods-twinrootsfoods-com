// Owner contact details management with localStorage persistence

const STORAGE_KEY_EMAIL = 'twinroots_owner_email';
const STORAGE_KEY_WHATSAPP = 'twinroots_owner_whatsapp';
const DEFAULT_WHATSAPP = '+919876543210';

export interface OwnerContact {
  email: string;
  whatsapp: string;
  whatsappLink: string; // wa.me-safe digits-only version
}

// Normalize WhatsApp number to digits only for wa.me links
function normalizeWhatsAppForLink(whatsapp: string): string {
  return whatsapp.replace(/\D/g, '');
}

// Validate email format
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate WhatsApp number (must contain at least one digit)
export function isValidWhatsApp(whatsapp: string): boolean {
  if (!whatsapp) return false;
  return /\d/.test(whatsapp);
}

// Get owner contact details from localStorage with safe defaults
export function getOwnerContact(): OwnerContact {
  try {
    const email = localStorage.getItem(STORAGE_KEY_EMAIL) || '';
    const whatsapp = localStorage.getItem(STORAGE_KEY_WHATSAPP) || DEFAULT_WHATSAPP;
    
    return {
      email,
      whatsapp,
      whatsappLink: normalizeWhatsAppForLink(whatsapp)
    };
  } catch (error) {
    console.error('Error reading owner contact from localStorage:', error);
    return {
      email: '',
      whatsapp: DEFAULT_WHATSAPP,
      whatsappLink: normalizeWhatsAppForLink(DEFAULT_WHATSAPP)
    };
  }
}

// Save owner contact details to localStorage
export function setOwnerContact(email: string, whatsapp: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_EMAIL, email);
    localStorage.setItem(STORAGE_KEY_WHATSAPP, whatsapp);
    
    // Dispatch custom event to notify components of the change
    window.dispatchEvent(new CustomEvent('ownerContactUpdated'));
  } catch (error) {
    console.error('Error saving owner contact to localStorage:', error);
    throw error;
  }
}

// Clear owner contact details
export function clearOwnerContact(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_EMAIL);
    localStorage.removeItem(STORAGE_KEY_WHATSAPP);
    window.dispatchEvent(new CustomEvent('ownerContactUpdated'));
  } catch (error) {
    console.error('Error clearing owner contact from localStorage:', error);
  }
}
