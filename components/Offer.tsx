"use client";

import FadeIn from "./FadeIn";
import { Container, SectionHeading } from "./Section";

const capabilities = [
  {
    title: "Onboarding automation",
    desc: "Frictionless onboarding for customers and developers — especially powerful for dev tools and library integrations. New members are productive from day one.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h9" />
        <path d="m10 8 4 4-4 4" />
        <circle cx="18.5" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Seamless ingestion",
    desc: "Connects to your docs, GitHub, Discord, and Slack. Structured and unstructured knowledge, unified into one queryable context graph.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4v5M12 4v5M18 4v5" />
        <path d="M6 9c0 3 2.5 4 6 4s6-1 6-4" />
        <path d="M12 13v7" />
        <path d="m9 17 3 3 3-3" />
      </svg>
    ),
  },
  {
    title: "Agents in your tools",
    desc: "AI agents that live directly inside Slack and Discord. Your team asks questions where they already work — nothing new to learn or adopt.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="8" width="14" height="11" rx="2.5" />
        <path d="M12 4.5V8" />
        <circle cx="12" cy="3.5" r="1" />
        <path d="M9.5 13.5h.01M14.5 13.5h.01" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    title: "MCP servers for IDEs",
    desc: "Wire Revoca into agentic IDEs like Cursor through MCP. Developers write code with full company context from their first commit.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 9-3.5 3L8 15M16 9l3.5 3L16 15" />
        <path d="m13 6-2 12" />
      </svg>
    ),
  },
];

export default function Offer() {
  return (
    <section id="capabilities" className="border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Production-ready today"
          subtitle="Not a roadmap promise. These capabilities are live and deployed with teams now."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <FadeIn key={c.title} delay={0.1 + i * 0.06}>
              <div className="group relative h-full rounded-xl border border-line bg-panel p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong">
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raise text-body transition-colors duration-300 group-hover:text-accent">
                    {c.icon}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Available now
                  </span>
                </div>
                <h3 className="mb-2.5 text-[17px] font-semibold text-ink">{c.title}</h3>
                <p className="text-[14.5px] leading-[1.75] text-body">{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
