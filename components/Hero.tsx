"use client";

import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative px-6">
      {/* Radial glow */}
      <div
        className="absolute pointer-events-none w-full max-w-[600px] h-[400px]"
        style={{
          background: "radial-gradient(ellipse, rgba(255,255,255,0.015) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-[720px]"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-[13px] text-[#e87a2a] tracking-[2px] mb-6"
        >
          // the context layer for enterprises
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-[#f0f0f0] leading-[1.1] tracking-[-1px] sm:tracking-[-2px] mb-3"
        >
          Your devs go offline.
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          className="text-2xl sm:text-4xl lg:text-[48px] font-extrabold text-[#2a1a0a] leading-[1.1] tracking-[-1px] sm:tracking-[-2px] mb-7"
        >
          Revoca keeps them present.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-[15px] text-[#666] max-w-[480px] mx-auto leading-[1.8] mb-9"
        >
          A living context graph of your team&apos;s decisions, reasoning, and expertise.
          When someone&apos;s away, Revoca responds in their voice, backed by real decision traces.
        </motion.p>

        <motion.div variants={fadeUp}>
          <a
            href="https://cal.com/revoca-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#e87a2a] px-9 py-3.5 font-mono text-[13px] text-black font-semibold rounded hover:bg-[#d06a1a] hover:shadow-[0_0_20px_rgba(232,122,42,0.15)] transition-all duration-300"
          >
            Book a Call &rarr;
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
