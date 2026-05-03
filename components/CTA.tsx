"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import FadeIn from "./FadeIn";
import posthog from "posthog-js";
import { useRef } from "react";

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
  const sx = useSpring(x, { stiffness: 250, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 22, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.22);
    y.set((e.clientY - cy) * 0.32);
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
          ? "relative inline-block bg-[#22d3ee] px-12 py-4 font-mono text-[13px] text-black font-bold rounded overflow-hidden group hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] transition-shadow duration-300"
          : "relative inline-block border border-[#1e1e1e] bg-[#050505]/40 backdrop-blur-sm px-12 py-4 font-mono text-[13px] text-[#aaa] rounded hover:border-[#22d3ee]/40 hover:text-[#fff] transition-colors duration-300 group"
      }
    >
      {primary && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
          }}
        />
      )}
      <span className="relative">{children}</span>
    </motion.a>
  );
}

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden px-6 relative border-t border-[#0e0e0e] flex flex-col pt-24 lg:pt-0">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 1000px 600px at 50% 40%, rgba(34,211,238,0.07), transparent 70%)",
        }}
      />

      <div
        className="flex-1 flex flex-col justify-center items-center text-center relative max-w-[760px] mx-auto w-full"
        ref={ref}
      >
        {/* Final logo with one subtle pulse ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[120px] h-[120px] mb-8 flex items-center justify-center"
        >
          <motion.div
            className="absolute w-full h-full rounded-full border border-[#22d3ee]/30"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={
              isInView
                ? { scale: [0.85, 1.5], opacity: [0.5, 0] }
                : {}
            }
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <div className="w-full h-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Revoca%20logo.svg"
              alt="Revoca"
              className="w-24 h-24 rounded-full"
            />
          </div>
        </motion.div>

        <FadeIn>
          <div className="inline-block font-mono text-[10px] text-[#22d3ee] tracking-[3px] uppercase mb-6 border border-[#22d3ee]/25 px-4 py-2 rounded bg-[#050505]/40 backdrop-blur-sm">
            {">> "}06. Get In Touch
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#f6feff] tracking-[-2px] leading-[1.08] mb-4">
            See Revoca in action.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-[14px] text-[#7a8893] max-w-[420px] mx-auto leading-[1.8] mb-8">
            Book a call to explore what Revoca unlocks for your business.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton
              href="https://calendly.com/revoca-ai/30min"
              primary
              onClick={() => posthog.capture("cta_book_call_clicked", { location: "cta_section" })}
            >
              Book a Call &rarr;
            </MagneticButton>
            <MagneticButton
              href="https://t.me/RevokaBetaBot"
              onClick={() => posthog.capture("cta_try_beta_clicked", { location: "cta_section" })}
            >
              Try the Beta &rarr;
            </MagneticButton>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="mailto:revoca.ai@gmail.com"
              onClick={() => posthog.capture("cta_email_clicked", { location: "cta_section" })}
              className="inline-flex items-center gap-2 font-mono text-[12px] text-[#666] hover:text-[#22d3ee] transition-colors duration-300 border-b border-[#222] hover:border-[#22d3ee]/40 pb-px"
            >
              revoca.ai@gmail.com
            </a>
            <span className="hidden sm:block text-[#222] font-mono text-[12px]">·</span>
            <a
              href="https://www.notion.so/Revoca-The-Context-Layer-for-the-Companies-44007ae8743d468bad2a1c7fb7af6efb?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("cta_vision_deck_clicked", { location: "cta_section" })}
              className="inline-flex items-center gap-2 font-mono text-[12px] text-[#666] hover:text-[#22d3ee] transition-colors duration-300 border-b border-[#222] hover:border-[#22d3ee]/40 pb-px"
            >
              Read the full vision deck ↗
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 sm:mt-12 pt-8 border-t border-[#111] grid grid-cols-3 gap-6 max-w-[400px] mx-auto">
            {[
              { value: "24/7", label: "Always On" },
              { value: "0", label: "Data Leakage" },
              { value: "∞", label: "Context Depth" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-mono text-2xl font-bold text-[#22d3ee] mb-1"
                  style={{ textShadow: "0 0 14px rgba(34,211,238,0.4)" }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] text-[#444] tracking-[2px] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Footer */}
      <footer className="shrink-0 py-6 border-t border-[#111] relative">
        <div className="max-w-[860px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href="#" className="font-mono text-sm font-bold tracking-tight flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Revoca%20logo.svg" alt="Revoca" className="w-4 h-4 rounded-full" />
            <span className="text-[#ddd]">revoca</span>
            <span className="text-[#333]">.</span>
            <span className="text-[#22d3ee]">ai</span>
          </a>
          <p className="font-mono text-[10px] text-[#282828] text-center">
            &copy; 2026 Revoca AI &mdash; The Context Layer for Your Company
          </p>
          <a
            href="mailto:revoca.ai@gmail.com"
            className="font-mono text-[11px] text-[#3a3a3a] hover:text-[#22d3ee] transition-colors duration-200"
          >
            revoca.ai@gmail.com
          </a>
        </div>
      </footer>
    </section>
  );
}
