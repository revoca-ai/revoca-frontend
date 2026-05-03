"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./Pillars";

const items = [
  {
    label: "LEGACY",
    quarter: "Q1",
    title: "Legacy Systems of Record",
    desc: "Deep integrations with Salesforce, SAP, Confluence, and Jira — your full company history, finally queryable.",
    sources: ["Salesforce", "SAP", "Confluence", "Jira"],
  },
  {
    label: "MEETINGS",
    quarter: "Q2",
    title: "Video Conference Ingestion",
    desc: "Decisions made verbally in Zoom or Google Meet — captured, transcribed, added to your knowledge graph.",
    sources: ["Zoom", "Google Meet", "Microsoft Teams"],
  },
  {
    label: "DATABASE",
    quarter: "Q3",
    title: "Sandboxed DB Access",
    desc: "Secure, isolated AI access to your databases. Accurate customer support and business insights, with zero exposure risk.",
    sources: ["Postgres", "MySQL", "MongoDB", "Snowflake"],
  },
];

export default function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="roadmap"
      className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden px-6 border-t border-[#0e0e0e] flex flex-col justify-center py-24 lg:py-0 relative"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 1100px 600px at 50% 50%, rgba(34,211,238,0.04), transparent 70%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto w-full relative" ref={ref}>
        <SectionHeader
          number="05"
          title="What's Next"
          subtitle="The pipeline. What we're building towards."
          isInView={isInView}
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical track on the left */}
          <div className="absolute left-[16px] top-1 bottom-1 w-px bg-[#161616]" />
          <motion.div
            className="absolute left-[16px] top-1 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, #22d3ee 20%, #22d3ee 80%, transparent)",
              boxShadow: "0 0 8px rgba(34,211,238,0.7)",
            }}
            initial={{ height: "0%" }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
          />
          {/* Comet — head dot traveling down */}
          <motion.div
            className="absolute left-[10px] w-[14px] h-[14px] rounded-full bg-[#22d3ee]"
            style={{
              boxShadow:
                "0 0 14px rgba(34,211,238,1), 0 0 28px rgba(34,211,238,0.5)",
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={
              isInView ? { top: "calc(100% - 14px)", opacity: [0, 1, 1, 0] } : {}
            }
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
          />

          <div className="space-y-4 sm:space-y-5">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.18 }}
                className="relative pl-12 group"
              >
                {/* Node marker */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-[10px] top-5 w-[14px] h-[14px] rounded-full bg-[#040a0c] border-2 border-[#22d3ee] z-10"
                />

                <div className="rounded-xl p-5 sm:p-7 bg-[#0a1216]/40 border border-[#22d3ee]/15 backdrop-blur-md hover:border-[#22d3ee]/40 hover:bg-[#0a1216]/70 transition-all duration-500 relative overflow-hidden">
                  {/* Hover gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 380px 140px at 0% 50%, rgba(34,211,238,0.07) 0%, transparent 70%)",
                    }}
                  />

                  <div className="relative flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-[10px] text-[#22d3ee] tracking-[2px]">
                        [ {item.label} ]
                      </span>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#0a1a1f] text-[#22d3ee]/80 border border-[#22d3ee]/25">
                        IN PIPELINE
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#555] tracking-[2px]">
                      {item.quarter} · 2026
                    </span>
                  </div>

                  <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#e9faff] mb-2 relative">
                    {item.title}
                  </h3>
                  <p className="text-[13px] sm:text-[13.5px] text-[#7a8893] leading-[1.85] relative mb-3">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 relative">
                    {item.sources.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#1a2228] text-[#7d8b94] bg-[#070b0d]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
