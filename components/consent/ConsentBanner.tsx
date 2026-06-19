"use client";

import Link from "next/link";
import { useState } from "react";
import { COOKIE_CATEGORIES } from "@/lib/compliance";
import { useConsent } from "./ConsentProvider";

export default function ConsentBanner({
  mode,
  initialAnalytics,
  initialFunctional,
}: {
  mode: "banner" | "preferences";
  initialAnalytics: boolean;
  initialFunctional: boolean;
}) {
  const { acceptAll, rejectAll, savePreferences, closePreferences, openPreferences } =
    useConsent();
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [functional, setFunctional] = useState(initialFunctional);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[600] p-4 sm:p-6"
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
    >
      <div className="mx-auto max-w-[720px] rounded-xl border border-line bg-panel p-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
        <h2 id="consent-title" className="text-[17px] font-semibold text-ink">
          {mode === "banner" ? "Your privacy choices" : "Manage consent"}
        </h2>
        <p id="consent-description" className="mt-2 text-[14px] leading-[1.7] text-body">
          We use cookies and similar technologies to run Revoca, understand how the
          site is used, and improve the product. Non-essential cookies are off
          until you choose otherwise. Read our{" "}
          <Link href="/privacy" className="font-medium text-accent hover:text-accent-soft">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookies" className="font-medium text-accent hover:text-accent-soft">
            Cookie Policy
          </Link>
          .
        </p>

        {mode === "preferences" && (
          <div className="mt-5 space-y-4">
            {COOKIE_CATEGORIES.map((category) => {
              const isNecessary = category.id === "necessary";
              const checked =
                category.id === "necessary"
                  ? true
                  : category.id === "analytics"
                    ? analytics
                    : functional;
              const onChange =
                category.id === "analytics"
                  ? setAnalytics
                  : category.id === "functional"
                    ? setFunctional
                    : undefined;

              return (
                <label
                  key={category.id}
                  className={`flex items-start gap-3 rounded-lg border border-line p-4 ${
                    isNecessary ? "opacity-80" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-accent"
                    checked={checked}
                    disabled={isNecessary}
                    onChange={(e) => onChange?.(e.target.checked)}
                  />
                  <span>
                    <span className="block text-[14px] font-medium text-ink">
                      {category.name}
                      {isNecessary && (
                        <span className="ml-2 font-normal text-faint">(always on)</span>
                      )}
                    </span>
                    <span className="mt-1 block text-[13px] leading-[1.6] text-body">
                      {category.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {mode === "banner" ? (
            <>
              <button
                type="button"
                onClick={acceptAll}
                className="cursor-pointer rounded-lg bg-accent px-5 py-2.5 text-[14px] font-semibold text-[#04181d] transition-colors hover:bg-accent-soft"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="cursor-pointer rounded-lg border border-line px-5 py-2.5 text-[14px] font-medium text-body transition-colors hover:border-line-strong hover:text-ink"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="cursor-pointer rounded-lg px-5 py-2.5 text-[14px] font-medium text-faint transition-colors hover:text-ink sm:ml-auto"
              >
                Customise
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => savePreferences(analytics, functional)}
                className="cursor-pointer rounded-lg bg-accent px-5 py-2.5 text-[14px] font-semibold text-[#04181d] transition-colors hover:bg-accent-soft"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="cursor-pointer rounded-lg border border-line px-5 py-2.5 text-[14px] font-medium text-body transition-colors hover:border-line-strong hover:text-ink"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="cursor-pointer rounded-lg px-5 py-2.5 text-[14px] font-medium text-faint transition-colors hover:text-ink"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={closePreferences}
                className="cursor-pointer rounded-lg px-5 py-2.5 text-[14px] font-medium text-faint transition-colors hover:text-ink sm:ml-auto"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
