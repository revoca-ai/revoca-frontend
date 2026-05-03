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

function SolutionVisual({ kind, active }: { kind: string; active: boolean }) {
  const trigger = active;
  if (kind === "heartbeat") {
    return (
      <svg viewBox="0 0 160 90" className="w-full h-full">
        <line x1="0" y1="45" x2="160" y2="45" stroke="#22d3ee" strokeOpacity="0.1" strokeWidth="0.5" />
        {/* Heartbeat trace — draws in and loops on enter + hover */}
        <motion.path
          d="M0 45 L36 45 L42 30 L50 60 L58 38 L66 50 L74 45 L160 45"
          fill="none" stroke="#22d3ee" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round"
          animate={trigger ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1, opacity: 0.5 }}
          transition={trigger
            ? { duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.8, 1] }
            : { duration: 0.4 }}
        />
        {trigger && (
          <motion.circle r="2.2" cy="45" fill="#22d3ee"
            animate={{ cx: [0, 160] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}
        <motion.circle cx="50" cy="60" r="2.4" fill="#22d3ee"
          animate={trigger ? { opacity: [1, 0.4, 1], scale: [1, 1.4, 1] } : { opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.8, repeat: trigger ? Infinity : 0, ease: "easeInOut" }}
          style={{ transformOrigin: "50px 60px" }}
        />
      </svg>
    );
  }
  if (kind === "tree") {
    return (
      <svg viewBox="0 0 160 90" className="w-full h-full">
        {/* Branches draw in on hover, show static when idle */}
        {[
          { x1: 80,  y1: 78, x2: 80,  y2: 58, delay: 0,   w: 1.2, op: 0.85 },
          { x1: 80,  y1: 58, x2: 50,  y2: 38, delay: 0.3, w: 1.2, op: 0.7  },
          { x1: 80,  y1: 58, x2: 110, y2: 38, delay: 0.3, w: 1.2, op: 0.7  },
          { x1: 50,  y1: 38, x2: 30,  y2: 20, delay: 0.6, w: 0.9, op: 0.5  },
          { x1: 50,  y1: 38, x2: 60,  y2: 20, delay: 0.7, w: 0.9, op: 0.5  },
          { x1: 110, y1: 38, x2: 100, y2: 20, delay: 0.6, w: 0.9, op: 0.5  },
          { x1: 110, y1: 38, x2: 130, y2: 20, delay: 0.7, w: 0.9, op: 0.5  },
        ].map((seg, i) => (
          <motion.line
            key={i}
            x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
            stroke="#22d3ee" strokeWidth={seg.w}
            animate={
              trigger
                ? { pathLength: [0, 1], opacity: seg.op }
                : { pathLength: 1, opacity: seg.op * 0.5 }
            }
            transition={
              trigger
                ? { duration: 0.5, delay: seg.delay, ease: "easeOut" }
                : { duration: 0.4 }
            }
          />
        ))}
        {/* Nodes pop in on hover, dim when idle */}
        {[
          { cx: 80,  cy: 78, r: 2.5, delay: 0,   op: 1,   idleOp: 0.6  },
          { cx: 80,  cy: 58, r: 2,   delay: 0.3,  op: 1,   idleOp: 0.6  },
          { cx: 50,  cy: 38, r: 1.8, delay: 0.55, op: 1,   idleOp: 0.55 },
          { cx: 110, cy: 38, r: 1.8, delay: 0.55, op: 1,   idleOp: 0.55 },
          { cx: 30,  cy: 20, r: 1.4, delay: 0.85, op: 0.6, idleOp: 0.35 },
          { cx: 60,  cy: 20, r: 1.4, delay: 0.95, op: 0.6, idleOp: 0.35 },
          { cx: 100, cy: 20, r: 1.4, delay: 0.85, op: 0.6, idleOp: 0.35 },
          { cx: 130, cy: 20, r: 1.4, delay: 0.95, op: 0.6, idleOp: 0.35 },
        ].map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx} cy={n.cy} r={n.r}
            fill="#22d3ee"
            animate={
              trigger
                ? { opacity: n.op, scale: 1 }
                : { opacity: n.idleOp, scale: 1 }
            }
            transition={
              trigger
                ? { duration: 0.3, delay: n.delay, ease: "backOut" }
                : { duration: 0.4 }
            }
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
        ))}
      </svg>
    );
  }
  // chart — all animations tied to trigger (so they start when section enters view)
  return (
    <svg viewBox="0 0 160 90" className="w-full h-full">
      <line x1="10" y1="20" x2="150" y2="20" stroke="#22d3ee" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="10" y1="45" x2="150" y2="45" stroke="#22d3ee" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="10" y1="70" x2="150" y2="70" stroke="#22d3ee" strokeOpacity="0.06" strokeWidth="0.5" />
      <defs>
        <linearGradient id="chart-area-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.22" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill fades in after trigger */}
      <motion.path
        d="M10 60 L30 50 L50 55 L70 35 L90 40 L110 25 L130 30 L150 18 L150 80 L10 80 Z"
        fill="url(#chart-area-2)"
        animate={trigger ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      />
      {/* Line draws in on trigger */}
      <motion.path
        d="M10 60 L30 50 L50 55 L70 35 L90 40 L110 25 L130 30 L150 18"
        fill="none" stroke="#22d3ee" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"
        animate={trigger ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {/* Bouncing data points appear along the line once drawn */}
      {trigger && [[30, 50], [50, 55], [70, 35], [90, 40], [110, 25], [130, 30]].map(([cx, cy], i) => (
        <motion.circle
          key={i} cx={cx} cy={cy} r="1.8" fill="#22d3ee"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0.5], scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4, delay: 1.0 + i * 0.1, ease: "backOut" }}
        />
      ))}
      {/* Live dot pulses continuously */}
      <motion.circle
        cx="150" cy="18" r="2.5" fill="#22d3ee"
        animate={trigger ? { opacity: [1, 0.4, 1], scale: [1, 1.6, 1] } : { opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.4, repeat: trigger ? Infinity : 0, ease: "easeInOut", delay: 1.2 }}
        style={{ transformOrigin: "150px 18px" }}
      />
      {/* Ripple from live dot */}
      {trigger && (
        <motion.circle
          cx="150" cy="18" r="2.5" fill="none" stroke="#22d3ee" strokeWidth="0.8"
          animate={{ r: [2.5, 10], opacity: [0.6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
        />
      )}
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
                         hover:border-[#22d3ee]/35 hover:bg-[#0a1216]/65
                         transition-all duration-500"
            >
              {i > 0 && <FlowConnector visible={isInView} side="left" />}
              {i < solutions.length - 1 && <FlowConnector visible={isInView} side="right" />}

              {/* Visual */}
              <div className="aspect-[16/7] w-full overflow-hidden relative bg-gradient-to-b from-[#0c1a20]/40 to-transparent border-b border-[#1a2228] p-4">
                <SolutionVisual kind={s.visual} active={isInView} />
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
