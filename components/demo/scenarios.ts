// Data + geometry for the animated product theater.
// The "stage" uses a fixed design coordinate space so the SVG wires and the
// absolutely-positioned nodes/panel share one coordinate system.

export const STAGE_W = 1100;
export const STAGE_H = 640;
export const PANEL_LEFT = 300;
export const PANEL_RIGHT = 800;

export type SourceId =
  | "slack"
  | "github-pr"
  | "github-issue"
  | "docs"
  | "meet"
  | "web";

export type Platform = "slack" | "discord" | "telegram";

export type FetchState = "idle" | "fetching" | "done" | "locked";

export interface SourceMeta {
  id: SourceId;
  label: string;
  sub: string;
  /** node centre in design space */
  x: number;
  y: number;
  /** where the wire meets the panel edge (design-space y) */
  anchorY: number;
  /** filled brand glyph */
  icon: string;
}

export const SOURCES: SourceMeta[] = [
  {
    id: "slack",
    label: "Slack",
    sub: "Threads & channels",
    x: 118,
    y: 150,
    anchorY: 206,
    icon: "M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z",
  },
  {
    id: "github-pr",
    label: "GitHub",
    sub: "Pull requests",
    x: 92,
    y: 320,
    anchorY: 320,
    icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    id: "docs",
    label: "Docs",
    sub: "Wikis & specs",
    x: 118,
    y: 490,
    anchorY: 434,
    icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z",
  },
  {
    id: "github-issue",
    label: "GitHub",
    sub: "Issues",
    x: 982,
    y: 150,
    anchorY: 206,
    icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    id: "meet",
    label: "Google Meet",
    sub: "Call recordings",
    x: 1008,
    y: 320,
    anchorY: 320,
    icon: "M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z",
  },
  {
    id: "web",
    label: "Web",
    sub: "URLs & runbooks",
    x: 982,
    y: 490,
    anchorY: 434,
    icon: "M3.9 12a4 4 0 014-4h3v1.9h-3a2.1 2.1 0 100 4.2h3V16h-3a4 4 0 01-4-4zm5.1 1h6v-2H9v2zm7-5h-3v1.9h3a2.1 2.1 0 110 4.2h-3V16h3a4 4 0 100-8z",
  },
];

export const SOURCE_MAP: Record<SourceId, SourceMeta> = SOURCES.reduce(
  (acc, s) => {
    acc[s.id] = s;
    return acc;
  },
  {} as Record<SourceId, SourceMeta>,
);

/** Bezier path (node -> panel edge) in design space. */
export function wirePath(s: SourceMeta): string {
  const left = s.x < STAGE_W / 2;
  if (left) {
    return `M ${s.x} ${s.y} C ${s.x + 150} ${s.y}, ${PANEL_LEFT - 150} ${s.anchorY}, ${PANEL_LEFT} ${s.anchorY}`;
  }
  return `M ${s.x} ${s.y} C ${s.x - 150} ${s.y}, ${PANEL_RIGHT + 150} ${s.anchorY}, ${PANEL_RIGHT} ${s.anchorY}`;
}

export interface Step {
  source: SourceId;
  label: string;
}

export interface User {
  name: string;
  role: string;
  initials: string;
  color: string;
  time: string;
}

export interface Turn {
  user: User;
  question: string;
  steps: Step[];
  answer: string;
  chips: string[];
  /** restricted answer — styled as a denial (amber + lock). */
  restricted?: boolean;
}

export interface Scene {
  id: string;
  platform: Platform;
  channel: string;
  eyebrow: string;
  caption: string;
  activeSources: SourceId[];
  /** source that returns 403 during a restricted turn. */
  lockedSource?: SourceId;
  turns: Turn[];
}

export const SCENES: Scene[] = [
  {
    id: "decision-trace",
    platform: "slack",
    channel: "#product-eng",
    eyebrow: "Decision trace",
    caption:
      "Resolves a blocked launch the moment the owner is unreachable — across Slack, GitHub & Meet.",
    activeSources: ["slack", "github-pr", "github-issue", "meet"],
    turns: [
      {
        user: { name: "Priya Menon", role: "PM", initials: "P", color: "#7c5cff", time: "9:14 AM" },
        question:
          "where are we on the SSO launch? Board demo is Thursday and I can't reach Daniel.",
        steps: [
          { source: "slack", label: "Searching #sso-launch + 3 threads" },
          { source: "github-pr", label: "Reading PR #482 and 2 more" },
          { source: "github-issue", label: "Checking issues #460, #471" },
          { source: "meet", label: "Pulling notes from the Jun 18 sync" },
        ],
        answer:
          "SSO is ~85% shipped. SAML + Okta are done (PR #482, merged Jun 22). The blocker is SCIM provisioning — Daniel flagged a token-refresh edge case on Jun 24, waiting on Auth0. Azure AD was pushed to post-launch in the Jun 18 sync. Demo-ready by Wed EOD if Auth0 replies.",
        chips: ["Slack ×3", "GitHub ×3", "Meet ×1", "Confidence 0.92"],
      },
    ],
  },
  {
    id: "cross-platform",
    platform: "telegram",
    channel: "Revenue · Acme",
    eyebrow: "Cross-platform synthesis",
    caption:
      "Traces a customer commitment from the sales thread to the contract to the eng backlog.",
    activeSources: ["slack", "docs", "github-issue", "meet"],
    turns: [
      {
        user: { name: "Lena Powell", role: "CSM", initials: "L", color: "#33a0d9", time: "2:48 PM" },
        question:
          "did we ever promise Acme custom data residency, and where does it stand?",
        steps: [
          { source: "slack", label: "Searching #acme-deal + #sales" },
          { source: "docs", label: "Reading the signed MSA + redlines" },
          { source: "github-issue", label: "Checking issue #ENG-318" },
          { source: "meet", label: "Reviewing the Apr 9 QBR recording" },
        ],
        answer:
          "Yes — committed in the Apr 9 QBR and written into the MSA (§7.2): EU-region data residency by end of Q3. Engineering tracks it in #ENG-318 (\"in design\"), but it's had no owner since May. The Q3 date is at risk — worth flagging to Daniel now.",
        chips: ["Slack ×2", "Docs ×1", "GitHub ×1", "Meet ×1", "Confidence 0.89"],
      },
    ],
  },
  {
    id: "permissions",
    platform: "discord",
    channel: "#general",
    eyebrow: "Permission-aware",
    caption:
      "Two people, one question — Revoca answers based on who's asking and what they're cleared to see.",
    activeSources: ["slack", "docs"],
    lockedSource: "docs",
    turns: [
      {
        user: { name: "Sam Reyes", role: "Engineer", initials: "S", color: "#43b581", time: "11:02 AM" },
        question: "what's the comp band for the new Staff Engineer role?",
        steps: [
          { source: "slack", label: "Reading the request in #general" },
          { source: "docs", label: "Checking Comp Bands 2026 · People Ops" },
        ],
        answer:
          "Sorry Sam — I can't share that here. Compensation data is restricted to People Ops and hiring managers, so 2 sources are hidden from this answer. Ask your manager or a People-Ops-authorized channel.",
        chips: ["2 sources hidden", "403 · access denied"],
        restricted: true,
      },
      {
        user: { name: "Dana Whitfield", role: "VP Eng", initials: "D", color: "#d98b3a", time: "11:05 AM" },
        question: "same question — comp band for the new Staff Engineer (L6)?",
        steps: [
          { source: "slack", label: "Reading the request in #general" },
          { source: "docs", label: "Reading Comp Bands 2026 · People Ops" },
        ],
        answer:
          "Staff Engineer (L6): $210k–$245k base + 0.15–0.30% equity, 15% target bonus. Source: Comp Bands 2026 (People Ops). Last updated May 4.",
        chips: ["Docs ×1 · authorized", "Access · VP Eng", "Confidence 0.97"],
      },
    ],
  },
];
