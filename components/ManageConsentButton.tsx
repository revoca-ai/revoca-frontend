"use client";

import { useOptionalConsent } from "./consent/ConsentProvider";

export default function ManageConsentButton({
  className = "",
}: {
  className?: string;
}) {
  const consent = useOptionalConsent();

  if (!consent) return null;

  return (
    <button
      type="button"
      onClick={consent.openPreferences}
      className={`cursor-pointer text-left text-[14px] text-body transition-colors duration-200 hover:text-ink ${className}`}
    >
      Manage consent
    </button>
  );
}
