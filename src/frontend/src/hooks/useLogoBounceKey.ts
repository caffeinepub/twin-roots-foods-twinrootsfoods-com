import { useEffect, useState } from 'react';
import { useLocation } from '@tanstack/react-router';

/**
 * Hook that returns a changing key whenever the route changes or on initial load.
 * This key can be used to remount/restart animations on navigation.
 */
export function useLogoBounceKey(): number {
  const location = useLocation();
  const [bounceKey, setBounceKey] = useState(0);

  useEffect(() => {
    // Increment the key on route change to trigger animation
    setBounceKey((prev) => prev + 1);
  }, [location.pathname]);

  return bounceKey;
}
