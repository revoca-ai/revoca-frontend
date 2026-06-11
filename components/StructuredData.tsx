import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  BOOKING_URL,
  BETA_BOT_URL,
  GITHUB_URL,
  CONTACT_EMAIL,
  FAQS,
} from "@/lib/site";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Revoca AI",
      alternateName: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-hires.png`,
      },
      slogan: "The context layer your company runs on.",
      description: SITE_DESCRIPTION,
      email: CONTACT_EMAIL,
      sameAs: [GITHUB_URL, BETA_BOT_URL],
      founder: [
        {
          "@type": "Person",
          name: "Sukhman Singh",
          jobTitle: "Co-founder",
          alumniOf: "IIT Roorkee",
        },
        {
          "@type": "Person",
          name: "Pratham Agarwal",
          jobTitle: "Co-founder",
          alumniOf: "IIT Roorkee",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "sales",
        url: BOOKING_URL,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "Revoca",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Slack, Discord, Telegram",
      description:
        "Revoca is an AI context layer and institutional memory for companies. It connects to Slack, GitHub, Discord, and docs, builds a living knowledge graph of decisions and the reasoning behind them, and answers questions with sources — inside the tools teams already use, or through MCP servers in agentic IDEs like Cursor.",
      featureList: [
        "Onboarding automation for customers and developers",
        "Knowledge ingestion from Slack, GitHub, Discord, and docs",
        "AI agents inside Slack and Discord",
        "MCP servers for agentic IDEs like Cursor",
        "Strictly isolated agents with scoped access",
        "Source-linked answers with confidence scores",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Private beta — free to try; design partner program open.",
        url: BETA_BOT_URL,
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
