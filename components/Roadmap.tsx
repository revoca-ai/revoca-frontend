"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    label: "[ LEGACY ]",
    title: "Legacy Systems of Record",
    desc: "Deep integrations with Salesforce, SAP, Confluence, and Jira — your full company history, finally queryable.",
  },
  {
    label: "[ MEETINGS ]",
    title: "Video Conference Ingestion",
    desc: "Decisions made verbally in Zoom or Google Meet — captured, transcribed, added to your knowledge graph.",
  },
  {
    label: "[ DATABASE ]",
    title: "Sandboxed DB Access",
    desc: "Secure, isolated AI access to your databases. Accurate customer support and business insights, with zero exposure risk.",
  },
];

export default function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="roadmap"
      className="min-h-screen snap-start snap-always py-28 lg:py-36 px-6 border-t border-[#0e0e0e] scroll-mt-20 flex flex-col justify-center"
    >
      <div className="max-w-[780px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-sm text-[#e87a2a]">05.</span>
            <span className="text-3xl font-bold text-[#e8e8e8] tracking-tight">
              What&apos;s Next
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a] to-transparent ml-4" />
          </div>
          <p className="font-mono text-[12px] text-[#444] mb-14 ml-9">
            The pipeline. What we&apos;re building towards.
          </p>
        </motion.div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="flex gap-7 p-7 border border-[#161616] rounded-md bg-[#080808] hover:border-[#222] transition-all duration-300 group"
            >
              <div className="font-mono text-[24px] text-[#161616] group-hover:text-[#222] transition-colors duration-300 shrink-0 select-none pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="font-mono text-[11px] text-[#555] tracking-[2px]">{item.label}</span>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#0e0e08] text-[#6a6a3a] border border-[#2a2a18]">
                    IN PIPELINE
                  </span>
                </div>
                <h3 className="text-[16px] font-semibold text-[#bbb] mb-2">{item.title}</h3>
                <p className="text-[14px] text-[#777] leading-[1.85]">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
