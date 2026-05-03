"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  {
    title: "People go offline. Context disappears.",
    desc: "A senior engineer leaves for two weeks and three projects stall. A PM quits and six months of reasoning walks out the door with them.",
    visual: "fade",
  },
  {
    title: "The why gets buried.",
    desc: "Decisions are made across Slack, Jira, GitHub, and calls — but the reasoning behind them is scattered, unstructured, and gone when you need it.",
    visual: "scatter",
  },
  {
    title: "Leadership is flying blind.",
    desc: "There's no real-time view of what's happening across teams. Where things are stuck, what's at risk — it's all locked in people's heads.",
    visual: "fog",
  },
];

function CardVisual({ kind, active }: { kind: string; active: boolean }) {
  const trigger = active;
  if (kind === "fade") {
    return (
      <svg viewBox="0 0 160 90" className="w-full h-full">
        <line x1="30" y1="30" x2="80" y2="20" stroke="#22d3ee" strokeOpacity="0.35" strokeWidth="0.7" />
        <line x1="80" y1="20" x2="130" y2="35" stroke="#22d3ee" strokeOpacity="0.35" strokeWidth="0.7" />
        <line x1="30" y1="30" x2="50" y2="65" stroke="#22d3ee" strokeOpacity="0.35" strokeWidth="0.7" />
        <line x1="50" y1="65" x2="100" y2="70" stroke="#22d3ee" strokeOpacity="0.35" strokeWidth="0.7" />
        <line x1="100" y1="70" x2="130" y2="35" stroke="#22d3ee" strokeOpacity="0.35" strokeWidth="0.7" />
        {/* Severed edge — flickers on enter + hover */}
        <motion.line
          x1="80" y1="20" x2="100" y2="70"
          stroke="#22d3ee" strokeWidth="0.7" strokeDasharray="2 3"
          animate={trigger ? { opacity: [0.5, 0.08, 0.5] } : { opacity: 0.2 }}
          transition={{ duration: 1.6, repeat: trigger ? Infinity : 0, ease: "easeInOut" }}
        />
        {[[30, 30], [80, 20], [130, 35], [50, 65], [130, 70]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#22d3ee" opacity="0.85" />
        ))}
        {/* Fading node — pulses on enter + hover */}
        <motion.circle
          cx="100" cy="70" r="2.4"
          fill="#22d3ee"
          animate={trigger ? { opacity: [1, 0.12, 1] } : { opacity: 0.5 }}
          transition={{ duration: 1.8, repeat: trigger ? Infinity : 0, ease: "easeInOut" }}
        />
        {/* Ripple ring */}
        {trigger && (
          <motion.circle
            cx="100" cy="70" r="2.4"
            fill="none" stroke="#22d3ee" strokeWidth="0.8"
            animate={{ r: [2.4, 9], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </svg>
    );
  }
  if (kind === "scatter") {
    const pts = [
      [22, 18], [62, 14], [108, 22], [142, 30],
      [30, 42], [78, 38], [116, 50], [148, 58],
      [38, 66], [86, 70], [128, 78], [60, 58],
    ];
    return (
      <svg viewBox="0 0 160 90" className="w-full h-full">
        {pts.slice(0, 6).map(([x1, y1], i) => {
          const [x2, y2] = pts[i + 6];
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="1.5 4"
              animate={trigger ? { opacity: [0.05, 0.22, 0.05] } : { opacity: 0.05 }}
              transition={{ duration: 2.2, repeat: trigger ? Infinity : 0, delay: i * 0.18, ease: "easeInOut" }}
            />
          );
        })}
        {pts.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x} cy={y} r="1.6"
            fill="#22d3ee"
            animate={
              trigger
                ? { opacity: [0.35, 0.9, 0.35], y: [0, -2.5, 0] }
                : { opacity: 0.55, y: 0 }
            }
            transition={{
              duration: 2 + (i % 3) * 0.35,
              repeat: trigger ? Infinity : 0,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    );
  }
  // fog — scanning overlay, only on hover
  return (
    <svg viewBox="0 0 160 90" className="w-full h-full">
      <defs>
        <linearGradient id="fog-grad" x1="0" x2="1">
          <stop offset="0"   stopColor="#050505" stopOpacity="0" />
          <stop offset="0.4" stopColor="#050505" stopOpacity="0.88" />
          <stop offset="0.6" stopColor="#050505" stopOpacity="0.88" />
          <stop offset="1"   stopColor="#050505" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[[20, 50, 24], [44, 32, 42], [68, 60, 14], [92, 28, 46], [116, 50, 24], [140, 38, 36]].map(
        ([x, y, h], i) => (
          <rect key={i} x={x} y={y} width="14" height={h} fill="#22d3ee" opacity="0.5" />
        )
      )}
      {/* Fog only moves on hover; otherwise sits at rest covering half */}
      <motion.rect
        x="-60" y="0" width="80" height="90"
        fill="url(#fog-grad)"
        animate={trigger ? { x: [-60, 180] } : { x: 40 }}
        transition={
          trigger
            ? { duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }
            : { duration: 0.6 }
        }
      />
      <text
        x="80" y="56"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="22"
        fill="#22d3ee"
        opacity={trigger ? 0.95 : 0.55}
      >?</text>
    </svg>
  );
}

export default function Pillars() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden px-6 border-t border-[#0e0e0e] flex flex-col justify-center py-24 lg:py-0 relative"
    >
      {/* Section ambient cyan wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 1100px 600px at 50% 50%, rgba(34,211,238,0.04), transparent 70%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto w-full relative" ref={ref}>
        <SectionHeader
          number="01"
          title="The Problem"
          subtitle="Why your company's context keeps slipping through the cracks."
          isInView={isInView}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.12 }}
              className="group relative rounded-xl overflow-hidden cursor-default border border-[#1a1a1a] bg-[#080808]/70 hover:border-[#22d3ee]/30 backdrop-blur-md transition-all duration-500"
            >
                {/* Top visual */}
                <div className="aspect-[16/7] w-full overflow-hidden relative bg-gradient-to-b from-[#0a1216]/40 to-transparent border-b border-[#141414] p-4">
                  <CardVisual kind={p.visual} active={isInView} />
                </div>

                {/* Card body */}
                <div className="p-6 sm:p-7">
                  <div className="font-mono text-[10px] tracking-[3px] text-[#22d3ee]/70 mb-3">
                    {">> "}PROBLEM_{String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#e9faff] leading-snug mb-3">
                    {p.title}
                  </h3>
                  <p className="text-[13.5px] text-[#7a8893] leading-[1.85]">
                    {p.desc}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, #22d3ee 50%, transparent)",
                    opacity: 0.2,
                  }}
                />
              </motion.div>
          ))}
        </div>

        {/* Status footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center font-mono text-[11px] text-[#444] mt-12 tracking-[2px] flex items-center justify-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7a3a3a]" />
          <span>STATUS = CONTEXT_FRAGMENTED</span>
        </motion.div>
      </div>
    </section>
  );
}

// Shared section header — visual rhyme across sections
export function SectionHeader({
  number,
  title,
  subtitle,
  isInView,
}: {
  number: string;
  title: string;
  subtitle?: string;
  isInView: boolean;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-2"
      >
        <span className="font-mono text-sm text-[#22d3ee] tracking-[2px]">
          {">> "}{number}.
        </span>
        <span className="text-3xl font-bold text-[#f6feff] tracking-tight">
          {title}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-[#22d3ee]/30 to-transparent ml-4" />
      </motion.div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-[12px] text-[#666] ml-9"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
