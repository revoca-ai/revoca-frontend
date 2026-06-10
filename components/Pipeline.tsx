"use client";

import FadeIn from "./FadeIn";
import { Container, SectionHeading } from "./Section";

const pillars = [
  {
    step: "01",
    label: "Continuity",
    title: "Work never waits on one person",
    desc: "When senior people are out, on leave, or gone for good, their context stays behind. Anyone can query past decisions and task status instantly — no project stalls waiting for a return date.",
  },
  {
    step: "02",
    label: "Decision intelligence",
    title: "The why, not just the what",
    desc: "Revoca doesn't just search — it reasons. It traces what was decided, why it was decided, and what context drove it, across your entire knowledge base.",
  },
  {
    step: "03",
    label: "Visibility",
    title: "A live view across every team",
    desc: "Leadership sees where things are stuck, what's at risk, and where momentum is building — across the whole company, in real time.",
  },
];

export default function Pipeline() {
  return (
    <section id="how-it-works" className="border-t border-line bg-panel/30 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              One layer that{" "}
              <em className="font-serif font-normal italic text-accent-soft">
                remembers
              </em>{" "}
              everything
            </>
          }
          subtitle="Revoca observes where your team already works, builds a living context graph of decisions and reasoning, and answers from it — like a teammate who has been there since day one."
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {pillars.map((p, i) => (
            <FadeIn key={p.step} delay={0.1 + i * 0.08} className="h-full">
              <div className="group flex h-full flex-col bg-panel p-8 transition-colors duration-300 hover:bg-raise/70">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-[12px] text-faint">{p.step}</span>
                  <span className="rounded-full border border-line bg-raise px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-faint transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent">
                    {p.label}
                  </span>
                </div>
                <h3 className="mb-3 text-[18px] font-semibold leading-snug text-ink">
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
