"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const solutions = [
  {
    icon: "◈",
    label: "Always On",
    title: "24×7 Uninterrupted Workflows",
    desc: "Query any past decision or task status instantly — even when the person is away. No one is ever blocked.",
  },
  {
    icon: "◎",
    label: "Reasons",
    title: "Read Between the Lines",
    desc: "Revoca doesn't just search — it reasons. It traces what was decided and why, across your entire company.",
  },
  {
    icon: "◐",
    label: "Secure",
    title: "Isolated by Design",
    desc: "One knowledge base, multiple agents with strictly isolated access. Zero data leakage — our absolute priority.",
  },
];

export default function Pipeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className="min-h-screen snap-start snap-always py-28 lg:py-36 px-6 border-t border-[#0e0e0e] scroll-mt-20 flex flex-col justify-center"
    >
      <div className="max-w-[780px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-16">
            <span className="font-mono text-sm text-[#e87a2a]">02.</span>
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
              className="relative bg-[#060606] border border-[#e87a2a]/10 rounded-md p-8
                         hover:border-[#e87a2a]/25 hover:shadow-[0_0_40px_rgba(232,122,42,0.06)]
                         transition-all duration-400 overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 200px 150px at 50% 0%, rgba(232,122,42,0.04) 0%, transparent 70%)",
                }}
              />
              <div className="text-[#e87a2a] text-2xl mb-5 relative">{s.icon}</div>
              <div className="font-mono text-[11px] text-[#e87a2a]/50 tracking-[2px] mb-3 uppercase relative">
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
