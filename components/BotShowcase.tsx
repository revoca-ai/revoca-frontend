"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import FadeIn from "./FadeIn";
import posthog from "posthog-js";

const botResponse =
  "Sarah's last update (Jul 14): Stripe webhook handler is 80% complete. Blocked on PCI docs from legal — Chase has those. Refund flow deprioritized per Jordan's call on Jul 11. ETA: EOD Thursday.";

function TypingText({ text, trigger }: { text: string; trigger: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!trigger) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return (
    <span className="text-[#9aa9b3]">
      {displayed}
      {trigger && displayed.length < text.length && (
        <span
          className="inline-block w-px h-3 bg-[#22d3ee] ml-px"
          style={{ animation: "blink 0.8s infinite" }}
        />
      )}
    </span>
  );
}

export default function BotShowcase() {
  const mockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mockRef, { once: true, margin: "-100px" });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setStep(1), 200);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => setStep(3), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isInView]);

  return (
    <section className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden px-6 border-t border-[#0e0e0e] flex flex-col justify-center py-24 lg:py-0 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 1100px 600px at 50% 50%, rgba(34,211,238,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-[860px] mx-auto w-full relative">
        <FadeIn>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-sm text-[#22d3ee] tracking-[2px]">
              {">>"} LIVE
            </span>
            <span className="text-3xl font-bold text-[#f6feff] tracking-tight">
              See It in Action
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#22d3ee]/30 to-transparent ml-4" />
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5">
              <path d="M6 1.5 L10.5 10 L1.5 10 Z" fill="#22d3ee" opacity="0.5" />
            </svg>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="font-mono text-[12px] text-[#666] mb-8 sm:mb-10 ml-12">
            Add Revoca to your channels. It learns your team — then responds as them.
          </p>
        </FadeIn>

        <div ref={mockRef}>
          <FadeIn delay={0.15}>
            <div
              className="max-w-[660px] mx-auto rounded-xl overflow-hidden border border-[#22d3ee]/20 bg-[#070b0d]/70 backdrop-blur-md font-mono text-[12px] sm:text-[13px] leading-[1.9] text-left break-words"
              style={{
                boxShadow:
                  "0 30px 80px -30px rgba(0,0,0,0.9), 0 0 60px -20px rgba(34,211,238,0.15)",
              }}
            >
              {/* Terminal chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#040809] border-b border-[#16242a]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1f1f1f]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1f1f1f]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1f1f1f]" />
                </div>
                <span className="font-mono text-[10px] text-[#556] tracking-[2px]">
                  # engineering — slack
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#22d3ee]/80">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{ boxShadow: "0 0 8px rgba(34,211,238,0.7)" }}
                  />
                  LIVE
                </span>
              </div>

              <div className="p-5 sm:p-7">
                {/* User prompt */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4 }}
                  className="mb-5 pb-5 border-b border-[#111]"
                >
                  <div className="flex items-center gap-2 mb-2 text-[11px]">
                    <span className="w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[9px] text-[#888]">
                      M
                    </span>
                    <span className="text-[#bcc6cc] font-medium">dev_mike</span>
                    <span className="text-[#333]">·</span>
                    <span className="text-[#555]">14:32</span>
                  </div>
                  <span className="text-[#9aa9b3]">
                    @revoca-ai what&apos;s the status of the Q3 payments
                    integration? Sarah is OOO.
                  </span>
                </motion.div>

                {/* Thinking */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-[11px] text-[#556]"
                  >
                    <span className="font-mono">revoca-ai is reasoning</span>
                    <span className="flex gap-0.5">
                      {[0, 0.2, 0.4].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1 h-1 rounded-full bg-[#22d3ee]"
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: d,
                          }}
                        />
                      ))}
                    </span>
                  </motion.div>
                )}

                {/* Bot reply */}
                {step >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-2 text-[11px]">
                      <span className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/Revoca%20logo.svg" alt="Revoca" className="w-full h-full object-cover" />
                      </span>
                      <span className="text-[#e9faff] font-medium">revoca-ai</span>
                      <span className="text-[10px] px-1.5 py-px rounded bg-[#0a1a20] text-[#22d3ee]/90 border border-[#22d3ee]/25 font-mono">
                        as sarah_lead
                      </span>
                    </div>
                    <TypingText text={botResponse} trigger={step >= 3} />
                    <div className="text-[11px] text-[#445] italic mt-3 flex items-center gap-3 flex-wrap">
                      <span>↳ source: github + slack</span>
                      <span className="text-[#222]">·</span>
                      <span>confidence: 0.94</span>
                      <span className="text-[#222]">·</span>
                      <span>traced 3 reasoning steps</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-[13px]">
              <a
                href="https://t.me/RevokaBetaBot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  posthog.capture("bot_showcase_telegram_clicked", {
                    location: "bot_showcase",
                  })
                }
                className="inline-flex items-center gap-2 border border-[#22d3ee]/30 px-6 py-2.5 rounded font-mono text-[13px] text-[#22d3ee] hover:bg-[#22d3ee]/10 hover:border-[#22d3ee]/50 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
                Try @RevokaBetaBot
              </a>
              <span className="font-mono text-[11px] text-[#666]">
                Slack &amp; Discord
                <span
                  className="ml-2 text-[10px] px-2 py-0.5 rounded font-mono bg-[#0a1a20] text-[#22d3ee]/80 border border-[#22d3ee]/25"
                  style={{ boxShadow: "0 0 8px rgba(34,211,238,0.15)" }}
                >
                  LIVE
                </span>
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
