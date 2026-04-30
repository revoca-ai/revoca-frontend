"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const solutions = [
  {
    icon: "◈",
    label: "Continuity",
    title: "Your Company Keeps Moving",
    desc: "When senior people are out, on leave, or gone — their context stays. No project stalls waiting for one person to return.",
  },
  {
    icon: "◎",
    label: "Decision Intelligence",
    title: "The Why, Not Just the What",
    desc: "Revoca preserves the reasoning behind every decision. Managers and founders see what happened and why — the full picture, not just the outcome.",
  },
  {
    icon: "◐",
    label: "Business Insights",
    title: "Real-Time View Across Teams",
    desc: "Leadership sees where things are stuck, what's at risk, and where momentum is building — across the entire company, in real time.",
  },
];

export default function Pipeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden px-6 border-t border-[#0e0e0e] flex flex-col justify-center py-24 lg:py-0"
    >
      <div className="max-w-[780px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-14">
            <span className="font-mono text-sm text-[#22d3ee]">02.</span>
            <span className="text-3xl font-bold text-[#e8e8e8] tracking-tight">
              How Revoca Fixes This
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a] to-transparent ml-4" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {solutions.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.15 }}
              className="relative bg-[#060606] border border-[#22d3ee]/10 rounded-md p-5 sm:p-8
                         hover:border-[#22d3ee]/25 hover:shadow-[0_0_40px_rgba(34,211,238,0.06)]
                         transition-all duration-400 overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 200px 150px at 50% 0%, rgba(34,211,238,0.04) 0%, transparent 70%)",
                }}
              />
              <div className="text-[#22d3ee] text-2xl mb-5 relative">{s.icon}</div>
              <div className="font-mono text-[11px] text-[#22d3ee]/50 tracking-[2px] mb-3 uppercase relative">
                {s.label}
              </div>
              <h3 className="text-[16px] font-semibold text-[#ccc] mb-4 leading-snug relative">
                {s.title}
              </h3>
              <p className="text-[14px] text-[#777] leading-[1.85] relative">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
