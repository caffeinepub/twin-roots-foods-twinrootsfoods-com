const OWNER_MODE_KEY = 'owner-mode-enabled';

export function isOwnerModeEnabled(): boolean {
  try {
    return localStorage.getItem(OWNER_MODE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function enableOwnerMode(): void {
  localStorage.setItem(OWNER_MODE_KEY, 'true');
}

export function disableOwnerMode(): void {
  localStorage.removeItem(OWNER_MODE_KEY);
}
