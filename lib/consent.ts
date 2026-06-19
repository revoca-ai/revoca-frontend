export type ConsentCategory = "analytics" | "functional";

export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  functional: boolean;
  updatedAt: string;
};

export const CONSENT_STORAGE_KEY = "revoca_consent";
export const CONSENT_COOKIE_NAME = "revoca_consent";
export const CONSENT_VERSION = 1;

export const DEFAULT_CONSENT: ConsentPreferences = {
  necessary: true,
  analytics: false,
  functional: false,
  updatedAt: "",
};

export function parseConsent(raw: string | null): ConsentPreferences | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentPreferences & { version?: number };
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      functional: Boolean(parsed.functional),
      updatedAt: parsed.updatedAt || "",
    };
  } catch {
    return null;
  }
}

export function readStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;

  const fromStorage = parseConsent(localStorage.getItem(CONSENT_STORAGE_KEY));
  if (fromStorage) return fromStorage;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!match) return null;
  return parseConsent(decodeURIComponent(match.split("=")[1] ?? ""));
}

export function persistConsent(
  preferences: Pick<ConsentPreferences, "analytics" | "functional">,
) {
  const payload = {
    version: CONSENT_VERSION,
    necessary: true as const,
    analytics: preferences.analytics,
    functional: preferences.functional,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(payload),
  )}; path=/; max-age=31536000; SameSite=Lax; Secure`;

  return {
    necessary: true as const,
    analytics: payload.analytics,
    functional: payload.functional,
    updatedAt: payload.updatedAt,
  };
}

export function hasAnalyticsConsent(): boolean {
  return readStoredConsent()?.analytics === true;
}

export function hasFunctionalConsent(): boolean {
  return readStoredConsent()?.functional === true;
}

export function hasConsentChoice(): boolean {
  return readStoredConsent() !== null;
}
