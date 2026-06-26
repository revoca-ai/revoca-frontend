import posthog from "posthog-js";

let initialized = false;

export function initPostHog() {
  if (initialized || typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    capture_exceptions: true,
    person_profiles: "always",
    capture_pageview: true,
    capture_pageleave: true,
    persistence: "localStorage+cookie",
    session_recording: {
      maskAllInputs: true,
    },
    debug: process.env.NODE_ENV === "development",
  });

  posthog.opt_in_capturing();
  initialized = true;
}

export function shutdownPostHog() {
  if (!initialized || typeof window === "undefined") return;
  posthog.opt_out_capturing();
  posthog.reset(true);
  initialized = false;
}

export function captureIfConsented(
  event: string,
  properties?: Record<string, unknown>,
) {
  if (!initialized) return;
  posthog.capture(event, properties);
}

export { posthog };
