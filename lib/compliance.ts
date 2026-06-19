import { CONTACT_EMAIL } from "./site";

export const DPO_NAME = "Revoca Privacy Team";
export const DPO_EMAIL = CONTACT_EMAIL;
export const DPO_PHONE = "+91-00000-00000"; // Replace with your business phone number
export const DPO_ADDRESS =
  "Revoca AI, India"; // Replace with your registered business postal address

export const GRIEVANCE_ACK_HOURS = 48;
export const GRIEVANCE_RESOLUTION_DAYS = 90;
export const BREACH_NOTIFICATION_HOURS = 72;
export const RIGHTS_REQUEST_ACK_DAYS = 7;

export const DPB_PORTAL_URL = "https://www.meity.gov.in/";
export const DPB_PORTAL_NOTE =
  "Complaints to the Data Protection Board of India are filed through the Board's official digital portal. Until a dedicated portal URL is published, refer to the Ministry of Electronics and Information Technology (MeitY) website for the latest filing instructions.";

export const COOKIE_CATEGORIES = [
  {
    id: "necessary",
    name: "Strictly necessary",
    description:
      "Required for the site to function — authentication sessions (Clerk), security (Cloudflare), and consent preferences. These cannot be disabled.",
    examples: ["__client", "__client_uat", "__cf_bm", "_cfuvid", "revoca_consent"],
    required: true,
  },
  {
    id: "analytics",
    name: "Analytics & performance",
    description:
      "Help us understand how visitors use the website so we can improve it. Data is aggregated where possible.",
    examples: ["_ga", "_ga_*", "ph_* (PostHog)", "Google Analytics"],
    required: false,
  },
  {
    id: "functional",
    name: "Functional",
    description:
      "Enable enhanced features such as session recordings and product diagnostics.",
    examples: ["Microsoft Clarity"],
    required: false,
  },
] as const;

export const DATA_PROCESSING_LOCATIONS = ["India", "United States"] as const;

export const THIRD_PARTY_PROCESSORS = [
  {
    name: "Clerk",
    purpose: "User authentication and account management",
    dataShared: "Name, email address, session identifiers",
    location: "United States",
  },
  {
    name: "PostHog",
    purpose: "Product and website analytics",
    dataShared: "Usage events, page views, device/browser metadata",
    location: "United States",
  },
  {
    name: "Google Analytics",
    purpose: "Website traffic analytics",
    dataShared: "Page views, referral source, device/browser metadata",
    location: "United States",
  },
  {
    name: "Microsoft Clarity",
    purpose: "Session replay and heatmaps (when enabled)",
    dataShared: "Interaction patterns, page content snapshots",
    location: "United States",
  },
  {
    name: "Vercel",
    purpose: "Website hosting and content delivery",
    dataShared: "IP address, request logs",
    location: "India / United States",
  },
  {
    name: "Cloudflare",
    purpose: "Security and bot protection (via Clerk)",
    dataShared: "IP address, request metadata",
    location: "India / United States",
  },
] as const;
