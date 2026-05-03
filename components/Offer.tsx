"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./Pillars";

const capabilities = [
  {
    title: "Onboarding Automation",
    desc: "Frictionless onboarding for customers and developers. New members hit the ground running.",
    icon: "onboard",
  },
  {
    title: "Seamless Ingestion",
    desc: "Connects to Docs, GitHub, Discord, and Slack. Structured and unstructured — unified.",
    icon: "ingest",
  },
  {
    title: "Agent Interfaces",
    desc: "Fully integrated AI agents inside your Slack or Discord. No new tools to learn.",
    icon: "agent",
  },
  {
    title: "MCP Servers",
    desc: "Wire Revoca into agentic IDEs like Cursor. Code with full company context from day one.",
    icon: "mcp",
  },
];

function CapIcon({ kind }: { kind: string }) {
  if (kind === "onboard") {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7">
        <motion.path
          d="M5 14 L13 14"
          stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        />
        <path d="M11 10 L15 14 L11 18" fill="none" stroke="#22d3ee" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="14" r="4" fill="none" stroke="#22d3ee" strokeWidth="1.4" opacity="0.6" />
      </svg>
    );
  }
  if (kind === "ingest") {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7">
        {[6, 14, 22].map((x, i) => (
          <motion.line
            key={i}
            x1={x} y1="4" x2="14" y2="14"
            stroke="#22d3ee" strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        <circle cx="14" cy="14" r="4" fill="#22d3ee" opacity="0.85" />
        <line x1="14" y1="18" x2="14" y2="24" stroke="#22d3ee" strokeWidth="1.2" />
      </svg>
    );
  }
  if (kind === "agent") {
    return (
      <svg viewBox="0 0 28 28" className="w-7 h-7">
        <rect x="6" y="9" width="16" height="12" rx="2" fill="none" stroke="#22d3ee" strokeWidth="1.4" />
        <circle cx="11" cy="15" r="1.4" fill="#22d3ee" />
        <circle cx="17" cy="15" r="1.4" fill="#22d3ee" />
        <line x1="14" y1="5" x2="14" y2="9" stroke="#22d3ee" strokeWidth="1.2" />
        <circle cx="14" cy="4" r="1.2" fill="#22d3ee" />
      </svg>
    );
  }
  // mcp — connector pins
  return (
    <svg viewBox="0 0 28 28" className="w-7 h-7">
      <rect x="8" y="6" width="12" height="14" rx="1.5" fill="none" stroke="#22d3ee" strokeWidth="1.4" />
      <line x1="11" y1="20" x2="11" y2="24" stroke="#22d3ee" strokeWidth="1.4" />
      <line x1="17" y1="20" x2="17" y2="24" stroke="#22d3ee" strokeWidth="1.4" />
      <line x1="11" y1="2" x2="11" y2="6" stroke="#22d3ee" strokeWidth="1.4" opacity="0.5" />
      <line x1="17" y1="2" x2="17" y2="6" stroke="#22d3ee" strokeWidth="1.4" opacity="0.5" />
      <motion.circle
        cx="14" cy="13" r="2.5"
        fill="#22d3ee"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
    </svg>
  );
}

export default function Offer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="capabilities"
      className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden px-6 border-t border-[#0e0e0e] flex flex-col justify-center py-24 lg:py-0 relative"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 1100px 600px at 50% 50%, rgba(34,211,238,0.04), transparent 70%)",
        }}
      />

      <div className="max-w-[1000px] mx-auto w-full relative" ref={ref}>
        <SectionHeader
          number="03"
          title="What We Offer Today"
          subtitle="Production-ready. Available now."
          isInView={isInView}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group relative rounded-xl p-6 sm:p-7 bg-[#0a1216]/40 border border-[#22d3ee]/15 backdrop-blur-md hover:border-[#22d3ee]/40 hover:bg-[#0a1216]/70 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 320px 180px at 50% 0%, rgba(34,211,238,0.06), transparent 70%)",
                }}
              />

              <div className="absolute top-5 right-5">
                <span
                  className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#0a1a20] text-[#22d3ee]/80 border border-[#22d3ee]/25"
                  style={{ boxShadow: "0 0 6px rgba(34,211,238,0.1)" }}
                >
                  LIVE
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4 relative">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#0a1a20] border border-[#22d3ee]/25">
                  <CapIcon kind={c.icon} />
                </div>
                <span className="font-mono text-[10px] text-[#22d3ee]/60 tracking-[2px]">
                  {">> "}{String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#e9faff] mb-3 relative">
                {c.title}
              </h3>
              <p className="text-[13.5px] text-[#7a8893] leading-[1.85] relative">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
