"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import posthog from "posthog-js";
import { useRef } from "react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function MagneticButton({
  children,
  href,
  primary,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.12);
    y.set((e.clientY - cy) * 0.18);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={
        primary
          ? "inline-block bg-[#22d3ee] px-10 py-3.5 font-mono text-[13px] text-black font-bold rounded hover:bg-[#06b6d4] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all duration-300"
          : "inline-block border border-[#1e1e1e] bg-[#050505]/40 backdrop-blur-sm px-10 py-3.5 font-mono text-[13px] text-[#aaa] rounded hover:border-[#22d3ee]/30 hover:text-[#fff] transition-colors duration-300"
      }
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden flex flex-col justify-center items-center text-center relative px-6 pt-20 lg:pt-0">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 520px at 50% 30%, rgba(34,211,238,0.06), rgba(5,5,5,0) 70%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-[820px] flex flex-col items-center"
      >
        <motion.div
          variants={fadeUp}
          className="font-mono text-[11px] text-[#22d3ee] tracking-[3px] mb-8 uppercase"
        >
          {"// the ultimate context layer for your company"}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-[44px] sm:text-[64px] lg:text-[78px] font-extrabold text-[#f6feff] leading-[1.04] tracking-[-2px] sm:tracking-[-3px] mb-7"
        >
          The context layer
          <br />
          <span className="text-[#22d3ee]">your company runs on.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-[15px] text-[#9ca3af] max-w-[500px] mx-auto leading-[1.85] mb-10"
        >
          Every decision, every reason, every context — captured and preserved.
          So your company keeps moving, no matter what.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            href="https://calendly.com/revoca-ai/30min"
            primary
            onClick={() => posthog.capture("hero_book_call_clicked", { location: "hero" })}
          >
            Book a Call &rarr;
          </MagneticButton>
          <MagneticButton
            href="https://t.me/RevokaBetaBot"
            onClick={() => posthog.capture("hero_try_beta_clicked", { location: "hero" })}
          >
            Try the Beta &rarr;
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <div className="w-px h-10 bg-gradient-to-b from-[#22d3ee]/40 to-transparent" />
        <span className="font-mono text-[9px] text-[#3a3a3a] tracking-[3px]">SCROLL</span>
      </motion.div>
    </section>
  );
}
