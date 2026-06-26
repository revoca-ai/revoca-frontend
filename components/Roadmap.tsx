"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FadeIn from "./FadeIn";
import { Container, SectionHeading } from "./Section";

const items = [
  {
    quarter: "Q1 2026",
    title: "Legacy systems of record",
    desc: "Deep integrations with Salesforce, SAP, Confluence, and Jira — your full company history, finally queryable.",
    sources: ["Salesforce", "SAP", "Confluence", "Jira"],
  },
  {
    quarter: "Q2 2026",
    title: "Meeting ingestion",
    desc: "Decisions made verbally in Zoom or Google Meet — captured, transcribed, and added to your context graph. The lost-meeting-decision problem, solved.",
    sources: ["Zoom", "Google Meet", "Microsoft Teams"],
  },
  {
    quarter: "Q3 2026",
    title: "Sandboxed database access",
    desc: "Secure, isolated AI access to your databases — for accurate customer support and business insight, with zero exposure risk.",
    sources: ["Postgres", "MySQL", "MongoDB", "Snowflake"],
  },
];

export default function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="roadmap" className="border-t border-line bg-panel/30 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Roadmap"
          title="Where this is going"
          subtitle="The context layer expands to cover every place your company's knowledge lives — including the places it gets lost today."
        />

        <div className="relative" ref={ref}>
          {/* Timeline track */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
          <motion.div
            className="absolute left-[7px] top-2 w-px bg-accent/60"
            initial={{ height: 0 }}
            animate={isInView ? { height: "calc(100% - 16px)" } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          <div className="space-y-5">
            {items.map((item, i) => (
              <FadeIn key={item.title} delay={0.15 + i * 0.12}>
                <div className="group relative pl-10">
                  {/* Node */}
                  <span className="absolute left-0 top-7 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent/50 bg-canvas">
                    <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                  </span>

                  <div className="rounded-xl border border-line bg-panel p-6 transition-all duration-300 hover:border-line-strong sm:p-7">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-line bg-raise px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
                        Planned
                      </span>
                      <span className="font-mono text-[12px] text-faint">
                        {item.quarter}
                      </span>
                    </div>
                    <h3 className="mb-2 text-[17px] font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mb-4 max-w-[640px] text-[14.5px] leading-[1.75] text-body">
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.sources.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-line bg-raise/60 px-2.5 py-1 text-[12.5px] text-faint"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
