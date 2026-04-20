"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Initialise once when the module is first loaded in the browser.
// Must stay here — moving it inside the component causes re-init on every render.
if (typeof window !== "undefined" && !posthog.__loaded) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",           // proxied by next.config.ts → bypasses ad blockers
    ui_host: "https://us.posthog.com",
    person_profiles: "always",
    capture_pageview: true,
    capture_pageleave: true,
    session_recording: { maskAllInputs: false },
  });
}

export default function PHProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
