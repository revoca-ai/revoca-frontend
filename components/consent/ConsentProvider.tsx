"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type ConsentPreferences,
  hasConsentChoice,
  persistConsent,
  readStoredConsent,
} from "@/lib/consent";
import ConsentBanner from "./ConsentBanner";
import AnalyticsScripts from "./AnalyticsScripts";
import { initPostHog, shutdownPostHog } from "@/lib/posthog-client";

type ConsentContextValue = {
  consent: ConsentPreferences | null;
  showPreferences: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (analytics: boolean, functional: boolean) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function applyConsent(preferences: ConsentPreferences) {
  if (preferences.analytics) {
    initPostHog();
  } else {
    shutdownPostHog();
  }

  window.dispatchEvent(
    new CustomEvent("revoca:consent-change", { detail: preferences }),
  );
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);
  const [ready, setReady] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    if (stored) applyConsent(stored);
    setReady(true);
  }, []);

  const save = useCallback((analytics: boolean, functional: boolean) => {
    const next = persistConsent({ analytics, functional });
    setConsent(next);
    applyConsent(next);
    setShowPreferences(false);
  }, []);

  const acceptAll = useCallback(() => save(true, true), [save]);
  const rejectAll = useCallback(() => save(false, false), [save]);

  const value = useMemo(
    () => ({
      consent,
      showPreferences,
      openPreferences: () => setShowPreferences(true),
      closePreferences: () => setShowPreferences(false),
      acceptAll,
      rejectAll,
      savePreferences: save,
    }),
    [consent, showPreferences, acceptAll, rejectAll, save],
  );

  const showBanner = ready && !hasConsentChoice() && !showPreferences;

  return (
    <ConsentContext.Provider value={value}>
      {children}
      <AnalyticsScripts
        analyticsEnabled={consent?.analytics === true}
        functionalEnabled={consent?.functional === true}
      />
      {(showBanner || showPreferences) && (
        <ConsentBanner
          mode={showPreferences ? "preferences" : "banner"}
          initialAnalytics={consent?.analytics ?? false}
          initialFunctional={consent?.functional ?? false}
        />
      )}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}

export function useOptionalConsent() {
  return useContext(ConsentContext);
}
