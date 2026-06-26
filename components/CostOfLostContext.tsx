"use client";

import FadeIn from "./FadeIn";
import { Container, SectionHeading } from "./Section";

const stats = [
  {
    value: "1.8 hrs",
    label: "per day, per knowledge worker",
    desc: "Time spent searching for information instead of working — 9.3 hours every week, per McKinsey Global Institute.",
  },
  {
    value: "≈ $2.4M",
    label: "per year, per 100-person team",
    desc: "What that hidden tax costs a typical P&L at fully-loaded salaries — before counting onboarding ramps or decisions remade without context.",
  },
  {
    value: "42%",
    label: "of senior-engineer interruptions",
    desc: "Are fully automatable — questions an AI with your company's context can answer with sources, based on early Revoca pilots.",
  },
];

export default function CostOfLostContext() {
  return (
    <section id="cost" className="border-t border-line bg-panel/30 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="The hidden tax"
          title={
            <>
              Lost institutional knowledge is a{" "}
              <em className="font-serif font-normal italic text-accent-soft">
                line item
              </em>
            </>
          }
          subtitle="You hire five people. Four show up to work. The fifth is off searching for answers that already exist somewhere in your company."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {stats.map((s, i) => (
            <FadeIn key={s.value} delay={0.1 + i * 0.08}>
              <div className="flex h-full flex-col rounded-xl border border-line bg-panel p-7">
                <div className="text-[40px] font-semibold tracking-[-0.02em] text-accent-soft">
                  {s.value}
                </div>
                <div className="mt-1 text-[14px] font-medium text-ink">
                  {s.label}
                </div>
                <p className="mt-3 text-[14px] leading-[1.75] text-body">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-8 text-[12.5px] text-faint">
            Sources: McKinsey Global Institute knowledge-worker time-use study
            (corroborated by IDC and Adobe); log analysis of senior-engineer
            Slack mentions across early Revoca pilots.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
