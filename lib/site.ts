export const SITE_URL = "https://revocaai.xyz";
export const SITE_NAME = "Revoca";
export const SITE_TITLE = "Revoca — The Context Layer for the Enterprise";
export const SITE_DESCRIPTION =
  "Revoca is the AI context layer that preserves your company's institutional knowledge — every decision, the reasoning behind it, and the context around it — across Slack, GitHub, and your docs. Queryable 24/7, so work never stalls when people are away.";

export const BOOKING_URL = "https://calendly.com/revoca-ai/30min";
export const BETA_BOT_URL = "https://t.me/RevokaBetaBot";
export const GITHUB_URL = "https://github.com/revoca-ai";
export const CONTACT_EMAIL = "revoca.ai@gmail.com";

// One source of truth for the FAQ — rendered in the FAQ section and emitted
// as FAQPage JSON-LD so search and answer engines can quote it directly.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is a context layer?",
    a: "A context layer is a system that sits across a company's tools — Slack, GitHub, docs, tickets — and captures not just documents but decisions, the reasoning behind them, and who was involved. Unlike enterprise search, which finds files, a context layer preserves institutional knowledge as a connected, queryable graph. Revoca is a context layer for the enterprise: ask it what was decided and why, and it answers with sources.",
  },
  {
    q: "Is Revoca an AI memory layer or 'AI brain' for my company?",
    a: "Yes — that's a fair way to describe it. Revoca acts as a persistent institutional memory: an AI brain that has effectively been there since day one, observing decisions across your tools. When a senior engineer is offline or a PM leaves, their context stays queryable instead of walking out the door.",
  },
  {
    q: "How does Revoca learn my company's context?",
    a: "You connect the places your team already works — Slack, GitHub, Discord, and your docs. Revoca ingests both structured and unstructured knowledge and builds a living context graph of decisions, the reasoning behind them, and the people involved. From then on it stays current automatically.",
  },
  {
    q: "How is Revoca different from enterprise search or a wiki?",
    a: "Enterprise search finds documents; wikis hold what someone remembered to write down. Revoca captures the layer in between — the decisions and trade-off discussions that happen in Slack threads, pull requests, and calls — and preserves why things were decided, not just what. Answers come with sources and confidence, and nothing depends on people maintaining pages.",
  },
  {
    q: "How much does lost institutional knowledge actually cost?",
    a: "McKinsey Global Institute found knowledge workers spend about 1.8 hours every day — 9.3 hours per week — searching for information. For a 100-person team at a typical fully-loaded cost, that is roughly $2.4M per year, before counting slow onboarding ramps or decisions remade without context. A queryable context layer claws much of that back.",
  },
  {
    q: "Where does my team interact with Revoca?",
    a: "Inside the tools you already use. Ask questions in Slack or Discord and get answers in-channel, or wire Revoca into agentic IDEs like Cursor through our MCP servers so developers code with full company context. There's no new app to adopt.",
  },
  {
    q: "Can one team's agent access another team's data?",
    a: "No. Revoca runs multiple agents over one knowledge base, each with strictly isolated, scoped access. A customer-facing agent cannot reach internal proprietary data — isolation is enforced at the architecture level, not as a setting.",
  },
  {
    q: "How can I try Revoca today?",
    a: "Revoca is in private beta and onboarding a small group of design partners. Connect your sources and the context graph starts building immediately — no manual tagging or migration. Try the beta bot on Telegram, or book a call and we'll set your team up directly in Slack or Discord.",
  },
];
