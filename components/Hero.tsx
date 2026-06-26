"use client";

import { motion, useReducedMotion } from "framer-motion";
import posthog from "posthog-js";
import TryBetaButton from "./TryBetaButton";

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

const CAPABILITIES = [
  {
    title: "Continuity",
    desc: "Work keeps moving when the people with context are offline or gone.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
        <path d="M17 8v6M14 11h6" />
      </svg>
    ),
  },
  {
    title: "Decision intelligence",
    desc: "Trace what was decided, why, and which sources back it up.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h10M4 18h6" />
        <path d="m17 15 3 3M20 15l-3 3" />
      </svg>
    ),
  },
  {
    title: "Cross-platform",
    desc: "Slack threads, GitHub PRs, docs, and calls — unified in one graph.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M8.2 7.5 10.5 16M15.8 7.5 13.5 16M8 6h8" />
      </svg>
    ),
  },
];

const INTEGRATIONS = [
  {
    name: "Slack",
    svg: "M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z",
  },
  {
    name: "GitHub",
    svg: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    name: "Discord",
    svg: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
  },
  {
    name: "Telegram",
    svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z",
  },
  {
    name: "Docs",
    svg: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z",
  },
  {
    name: "Meet",
    svg: "M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z",
  },
];

function scrollToDemo(reduceMotion: boolean | null) {
  const el = document.getElementById("demo");
  if (!el) return;
  const navOffset = 88;
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({
    top,
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="product"
      className="relative flex min-h-[100svh] flex-col pb-14 pt-[88px]"
    >
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
        className="relative mx-auto flex w-full max-w-[1040px] flex-1 flex-col items-center justify-center px-6 text-center"
      >
        <motion.a
          variants={fadeUp}
          href="https://t.me/RevokaBetaBot"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => posthog.capture("hero_beta_badge_clicked", { location: "hero" })}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 py-1.5 pl-3 pr-4 text-[13px] text-body backdrop-blur-sm transition-colors duration-200 hover:border-line-strong hover:text-ink"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Now in private beta
          <span className="text-faint">&rarr;</span>
        </motion.a>

        <motion.h1
          variants={fadeUp}
          className="mb-3 text-[clamp(30px,8vw,38px)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[48px] lg:text-[56px]"
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
          className="mx-auto mb-5 max-w-[480px] text-[15px] leading-[1.6] text-body sm:text-[16px]"
        >
          Capture decisions, reasoning, and context across all your platforms so
          work never stalls when someone&apos;s away.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="https://calendly.com/revoca-ai/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("hero_book_call_clicked", { location: "hero" })}
            className="rounded-lg bg-accent px-7 py-3 text-[15px] font-semibold text-[#04181d] shadow-[0_8px_30px_-8px_rgba(34,211,238,0.45)] transition-all duration-200 hover:bg-accent-soft hover:shadow-[0_8px_36px_-6px_rgba(34,211,238,0.55)]"
          >
            Book a demo
          </a>
          <TryBetaButton location="hero" />
        </motion.div>

        {/* capability cards */}
        <motion.div
          variants={fadeUp}
          className="mb-5 grid w-full max-w-[880px] grid-cols-1 gap-2.5 text-left sm:grid-cols-3"
        >
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="rounded-xl border border-line bg-panel/55 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-line-strong hover:bg-panel/80"
            >
              <span className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-raise text-accent">
                {cap.icon}
              </span>
              <h3 className="mb-1 text-[14px] font-semibold text-ink">{cap.title}</h3>
              <p className="text-[12.5px] leading-[1.55] text-faint">{cap.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* integrations */}
        <motion.div variants={fadeUp} className="w-full max-w-[720px]">
          <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            Connects where your team already works
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {INTEGRATIONS.map((item) => (
              <span
                key={item.name}
                className="flex items-center gap-1.5 rounded-lg border border-line bg-panel/45 px-2.5 py-1.5 transition-colors duration-200 hover:border-line-strong hover:bg-panel/70"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-body">
                  <path d={item.svg} />
                </svg>
                <span className="text-[12px] font-medium text-body">{item.name}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue — smooth scroll on click only */}
      <motion.button
        type="button"
        onClick={() => scrollToDemo(reduceMotion)}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1.5 border-0 bg-transparent font-mono text-[11px] uppercase tracking-[0.14em] text-faint transition-colors hover:text-body"
      >
        <span>Watch live demo</span>
        <motion.span
          aria-hidden
          animate={reduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-accent"
        >
          ↓
        </motion.span>
      </motion.button>
    </section>
  );
}
