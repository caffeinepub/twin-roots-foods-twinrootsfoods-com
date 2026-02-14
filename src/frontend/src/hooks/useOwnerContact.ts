import { useState, useEffect } from 'react';
import { getOwnerContact, type OwnerContact } from '../lib/ownerContact';

// React hook to access owner contact details with automatic updates
export function useOwnerContact(): OwnerContact {
  const [contact, setContact] = useState<OwnerContact>(getOwnerContact());

  useEffect(() => {
    // Update contact when localStorage changes
    const handleUpdate = () => {
      setContact(getOwnerContact());
    };

    // Listen for custom event dispatched by setOwnerContact
    window.addEventListener('ownerContactUpdated', handleUpdate);
    
    // Also listen for storage events (changes from other tabs)
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('ownerContactUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return contact;
}
