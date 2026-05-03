"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./Pillars";

const solutions = [
  {
    label: "Continuity",
    title: "Your Company Keeps Moving",
    desc: "When senior people are out, on leave, or gone — their context stays. No project stalls waiting for one person to return.",
    visual: "heartbeat",
  },
  {
    label: "Decision Intelligence",
    title: "The Why, Not Just the What",
    desc: "Revoca preserves the reasoning behind every decision. Managers and founders see what happened and why — the full picture, not just the outcome.",
    visual: "tree",
  },
  {
    label: "Business Insights",
    title: "Real-Time View Across Teams",
    desc: "Leadership sees where things are stuck, what's at risk, and where momentum is building — across the entire company, in real time.",
    visual: "chart",
  },
];

function SolutionVisual({ kind }: { kind: string }) {
  if (kind === "heartbeat") {
    return (
      <svg viewBox="0 0 160 90" className="w-full h-full">
        <line x1="0" y1="45" x2="160" y2="45" stroke="#22d3ee" strokeOpacity="0.1" strokeWidth="0.5" />
        <path
          d="M0 45 L36 45 L42 30 L50 60 L58 38 L66 50 L74 45 L160 45"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <motion.circle
          cx="50" cy="60" r="2.4"
          fill="#22d3ee"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    );
  }
  if (kind === "tree") {
    return (
      <svg viewBox="0 0 160 90" className="w-full h-full">
        <line x1="80" y1="78" x2="80" y2="58" stroke="#22d3ee" strokeWidth="1" opacity="0.85" />
        <line x1="80" y1="58" x2="50" y2="38" stroke="#22d3ee" strokeWidth="1" opacity="0.7" />
        <line x1="80" y1="58" x2="110" y2="38" stroke="#22d3ee" strokeWidth="1" opacity="0.7" />
        <line x1="50" y1="38" x2="30" y2="20" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
        <line x1="50" y1="38" x2="60" y2="20" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
        <line x1="110" y1="38" x2="100" y2="20" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
        <line x1="110" y1="38" x2="130" y2="20" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
        <circle cx="80" cy="78" r="2.5" fill="#22d3ee" />
        <circle cx="80" cy="58" r="2" fill="#22d3ee" />
        <circle cx="50" cy="38" r="1.8" fill="#22d3ee" />
        <circle cx="110" cy="38" r="1.8" fill="#22d3ee" />
        <circle cx="30" cy="20" r="1.4" fill="#22d3ee" opacity="0.5" />
        <circle cx="60" cy="20" r="1.4" fill="#22d3ee" opacity="0.5" />
        <circle cx="100" cy="20" r="1.4" fill="#22d3ee" opacity="0.5" />
        <circle cx="130" cy="20" r="1.4" fill="#22d3ee" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 90" className="w-full h-full">
      <line x1="10" y1="20" x2="150" y2="20" stroke="#22d3ee" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="10" y1="45" x2="150" y2="45" stroke="#22d3ee" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="10" y1="70" x2="150" y2="70" stroke="#22d3ee" strokeOpacity="0.06" strokeWidth="0.5" />
      <motion.path
        d="M10 60 L30 50 L50 55 L70 35 L90 40 L110 25 L130 30 L150 18"
        fill="none" stroke="#22d3ee" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      />
      <circle cx="150" cy="18" r="2.5" fill="#22d3ee" opacity="0.8" />
    </svg>
  );
}

// Subtle data-flow line connecting the cards
function FlowConnector({ visible, side }: { visible: boolean; side: "left" | "right" }) {
  return (
    <div
      className={`hidden md:block absolute top-[44%] -translate-y-1/2 w-6 h-px ${
        side === "left" ? "-left-3" : "-right-3"
      }`}
      style={{
        background:
          side === "left"
            ? "linear-gradient(90deg, transparent, #22d3ee)"
            : "linear-gradient(90deg, #22d3ee, transparent)",
        opacity: visible ? 0.5 : 0,
        transition: "opacity 600ms",
      }}
    />
  );
}

export default function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden px-6 border-t border-[#0e0e0e] flex flex-col justify-center py-24 lg:py-0 relative"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 1100px 600px at 50% 50%, rgba(34,211,238,0.06), transparent 70%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto w-full relative" ref={ref}>
        <SectionHeader
          number="02"
          title="How Revoca Fixes This"
          subtitle="The same context — but always present, always queryable."
          isInView={isInView}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative">
          {solutions.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.15 }}
              className="group relative rounded-xl overflow-hidden border border-[#22d3ee]/15 bg-[#0a1216]/40 backdrop-blur-md
                         hover:border-[#22d3ee]/40 hover:bg-[#0a1216]/70
                         hover:shadow-[0_0_60px_rgba(34,211,238,0.12),inset_0_0_40px_rgba(34,211,238,0.04)]
                         transition-all duration-500"
            >
              {i > 0 && <FlowConnector visible={isInView} side="left" />}
              {i < solutions.length - 1 && <FlowConnector visible={isInView} side="right" />}

              {/* Visual */}
              <div className="aspect-[16/7] w-full overflow-hidden relative bg-gradient-to-b from-[#0c1a20]/40 to-transparent border-b border-[#1a2228] p-4">
                <SolutionVisual kind={s.visual} />
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-end mb-3">
                  <span className="font-mono text-[9px] tracking-[2px] text-[#22d3ee]/60 px-2 py-0.5 rounded border border-[#22d3ee]/20 bg-[#0a1a20]">
                    {s.label.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#f0fbff] leading-snug mb-3">
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-[#7a8893] leading-[1.85]">
                  {s.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center font-mono text-[11px] text-[#444] mt-12 tracking-[2px] flex items-center justify-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" />
          <span>STATUS = CONTEXT_RESTORED</span>
        </motion.div>
      </div>
    </section>
  );
}
