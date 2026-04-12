"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { title: "connect", desc: "Link your GitHub, Docs, Discord, Slack, Telegram" },
  { title: "ingest", desc: "Build decision traces and context graphs per member" },
  { title: "respond", desc: "AI replies as your team in company chats, 24/7" },
];

export default function Pipeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="py-24 lg:py-28 px-6">
      <div className="max-w-[720px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-sm text-[#e87a2a]">02.</span>
            <span className="text-2xl font-bold text-[#e8e8e8] tracking-tight">
              How It Works
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a] to-transparent ml-4" />
          </div>
        </motion.div>

        {/* Desktop: horizontal */}
        <div className="hidden md:flex items-center justify-center">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                className="text-center flex-1 px-5 py-6 border border-[#161616] rounded-md bg-[#0a0a0a] hover:border-[#2a2a2a] transition-colors duration-300 min-w-[180px]"
              >
                <h4 className="font-mono text-[13px] text-[#ccc] mb-2">{step.title}</h4>
                <p className="text-[12px] text-[#555]">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.2 }}
                  className="text-[#2a2a2a] font-mono text-sm mx-2.5 shrink-0"
                >
                  ---&gt;
                </motion.span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="flex md:hidden flex-col items-center gap-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center w-full">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                className="text-center w-full px-5 py-6 border border-[#161616] rounded-md bg-[#0a0a0a]"
              >
                <h4 className="font-mono text-[13px] text-[#ccc] mb-2">{step.title}</h4>
                <p className="text-[12px] text-[#555]">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <span className="text-[#2a2a2a] font-mono text-sm my-1">&darr;</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
