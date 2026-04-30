"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// posthog is initialized in instrumentation-client.ts (Next.js instrumentation hook)
// which runs before React hydration. This provider just wires the client into React context.
export default function PHProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
