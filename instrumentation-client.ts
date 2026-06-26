import { initPostHog } from "@/lib/posthog-client";
import { hasAnalyticsConsent } from "@/lib/consent";

if (typeof window !== "undefined" && hasAnalyticsConsent()) {
  initPostHog();
}
