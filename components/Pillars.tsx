"use client";

import FadeIn from "./FadeIn";
import { Container, SectionHeading } from "./Section";

const problems = [
  {
    title: "People go offline. Context disappears.",
    desc: "A senior engineer takes two weeks off and three projects stall. A PM moves on, and six months of reasoning leaves with them.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
        <path d="m16 8 5 5M21 8l-5 5" />
      </svg>
    ),
  },
  {
    title: "The 'why' gets buried.",
    desc: "Decisions happen across Slack, Jira, GitHub, and calls — but the reasoning behind them is scattered, unstructured, and gone when you need it.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h10M4 18h6" />
        <path d="m17.5 15.5 3 3M20.5 15.5l-3 3" />
      </svg>
    ),
  },
  {
    title: "Leadership is flying blind.",
    desc: "There's no live view of what's happening across teams — where things are stuck, what's at risk. It's all locked in people's heads.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
        <path d="m4 4 16 16" />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section id="problem" className="border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="The problem"
          title={
            <>
              Institutional knowledge
              <br />
              walks out the door
            </>
          }
          subtitle="Your company's most valuable asset — the context behind its decisions — has no system of record. It lives in people, and people leave, log off, and forget."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <FadeIn key={p.title} delay={0.1 + i * 0.08}>
              <div className="group h-full rounded-xl border border-line bg-panel p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raise text-body transition-colors duration-300 group-hover:text-accent">
                  {p.icon}
                </div>
                <h3 className="mb-2.5 text-[17px] font-semibold leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-[1.75] text-body">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
