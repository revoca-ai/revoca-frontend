"use client";

import { motion, useReducedMotion } from "framer-motion";
import { captureIfConsented } from "@/lib/posthog-client";
import TryBetaButton from "./TryBetaButton";
import ProductDemo from "./ProductDemo";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="product" className="relative overflow-hidden pt-[144px] pb-20 sm:pb-24">
      {/* Atmosphere: faint grid + top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(151,168,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(151,168,184,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 65% at 50% 0%, rgba(34,211,238,0.08), transparent 70%)",
        }}
      />

      <motion.div
        variants={stagger}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="relative mx-auto flex w-full max-w-[860px] flex-col items-center px-6 text-center"
      >
        <motion.a
          variants={fadeUp}
          href="https://t.me/RevokaBetaBot"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => captureIfConsented("hero_beta_badge_clicked", { location: "hero" })}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 py-1.5 pl-3 pr-4 text-[13px] text-body backdrop-blur-sm transition-colors duration-200 hover:border-line-strong hover:text-ink"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Now in private beta
          <span className="text-faint">&rarr;</span>
        </motion.a>

        <motion.h1
          variants={fadeUp}
          className="mb-6 text-[clamp(32px,9vw,42px)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[60px] lg:text-[68px]"
        >
          The context layer
          <br />
          your company{" "}
          <em className="font-serif font-normal italic text-accent-soft">
            runs on
          </em>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-[540px] text-[16px] leading-[1.75] text-body sm:text-[17px]"
        >
          Revoca captures every decision, the reasoning behind it, and the
          context around it — across Slack, GitHub, and your docs. So work
          never stalls when people are away.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mb-14 flex flex-col items-center justify-center gap-3 sm:mb-16 sm:flex-row"
        >
          <a
            href="https://calendly.com/revoca-ai/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => captureIfConsented("hero_book_call_clicked", { location: "hero" })}
            className="rounded-lg bg-accent px-7 py-3 text-[15px] font-semibold text-[#04181d] shadow-[0_8px_30px_-8px_rgba(34,211,238,0.45)] transition-all duration-200 hover:bg-accent-soft hover:shadow-[0_8px_36px_-6px_rgba(34,211,238,0.55)]"
          >
            Book a demo
          </a>
          <TryBetaButton location="hero" />
        </motion.div>

        <motion.div variants={fadeUp} className="w-full">
          <ProductDemo />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex w-full max-w-[680px] flex-col items-center gap-3 rounded-xl border border-line bg-panel/45 px-5 py-4 text-[13px] text-faint sm:flex-row sm:justify-center sm:gap-5"
        >
          <span className="text-body">Connect Slack, GitHub, and docs.</span>
          <span className="hidden h-1 w-1 rounded-full bg-line-strong sm:block" />
          <span>Ask in the tools your team already uses.</span>
          <span className="hidden h-1 w-1 rounded-full bg-line-strong sm:block" />
          <span>Get a sourced answer in seconds.</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
