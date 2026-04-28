"use client";

import { motion } from "framer-motion";
import posthog from "posthog-js";


const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section className="h-screen snap-start snap-always overflow-hidden flex flex-col justify-center items-center text-center relative px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 50% 40%, rgba(232,122,42,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-[800px] relative"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-[11px] text-[#e87a2a] tracking-[3px] mb-8 uppercase"
        >
          // the ultimate context layer for your company
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-[64px] lg:text-[76px] font-extrabold text-[#f2f2f2] leading-[1.04] tracking-[-3px] mb-7"
        >
          The context layer
          <br />
          <span className="text-[#e87a2a]">your company runs on.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-[15px] text-[#4a4a4a] max-w-[480px] mx-auto leading-[1.85] mb-10"
        >
          Every decision, every reason, every context — captured and preserved.
          So your company keeps moving, no matter what.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://calendly.com/revoca-ai/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("hero_book_call_clicked", { location: "hero" })}
            className="inline-block bg-[#e87a2a] px-10 py-3.5 font-mono text-[13px] text-black font-bold rounded hover:bg-[#d06a1a] hover:shadow-[0_0_40px_rgba(232,122,42,0.3)] transition-all duration-300"
          >
            Book a Call &rarr;
          </a>
          <a
            href="https://t.me/RevokaBetaBot"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("hero_try_beta_clicked", { location: "hero" })}
            className="inline-block border border-[#1e1e1e] px-10 py-3.5 font-mono text-[13px] text-[#555] rounded hover:border-[#2e2e2e] hover:text-[#888] transition-all duration-300"
          >
            Try the Beta &rarr;
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#1e1e1e]" />
        <span className="font-mono text-[9px] text-[#2a2a2a] tracking-[3px]">SCROLL</span>
      </motion.div>
    </section>
  );
}
