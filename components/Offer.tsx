"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const capabilities = [
  {
    num: "→ 01",
    title: "Onboarding Automation",
    desc: "Frictionless onboarding for customers and developers. New members hit the ground running.",
  },
  {
    num: "→ 02",
    title: "Seamless Ingestion",
    desc: "Connects to Docs, GitHub, Discord, and Slack. Structured and unstructured — unified.",
  },
  {
    num: "→ 03",
    title: "Agent Interfaces",
    desc: "Fully integrated AI agents inside your Slack or Discord. No new tools to learn.",
  },
  {
    num: "→ 04",
    title: "MCP Servers",
    desc: "Wire Revoca into agentic IDEs like Cursor. Code with full company context from day one.",
  },
];

export default function Offer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="capabilities"
      className="min-h-screen snap-start snap-always py-28 lg:py-36 px-6 border-t border-[#0e0e0e] scroll-mt-20 flex flex-col justify-center"
    >
      <div className="max-w-[780px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-sm text-[#e87a2a]">03.</span>
            <span className="text-3xl font-bold text-[#e8e8e8] tracking-tight">
              What We Offer Today
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a] to-transparent ml-4" />
          </div>
          <p className="font-mono text-[12px] text-[#444] mb-14 ml-9">
            Production-ready. Available now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="bg-[#080808] border border-[#161616] rounded-md p-7 hover:border-[#252525] transition-all duration-300 relative group"
            >
              <div className="absolute top-5 right-5">
                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#0a1a0a] text-[#4a8a4a] border border-[#1a3a1a]">
                  LIVE
                </span>
              </div>
              <div className="font-mono text-[11px] text-[#2e2e2e] mb-4 group-hover:text-[#e87a2a] transition-colors duration-300">
                {c.num}
              </div>
              <h3 className="text-[16px] font-semibold text-[#ccc] mb-3 pr-10">{c.title}</h3>
              <p className="text-[14px] text-[#777] leading-[1.85]">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
