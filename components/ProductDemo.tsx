"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

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
    }, 14);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return (
    <span className="text-[#c3cdd6]">
      {displayed}
      {trigger && displayed.length < text.length && (
        <span
          className="ml-px inline-block h-3.5 w-px bg-accent align-middle"
          style={{ animation: "blink 0.8s infinite" }}
        />
      )}
    </span>
  );
}

export default function ProductDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = reduceMotion
      ? [setTimeout(() => setStep(3), 0)]
      : [
          setTimeout(() => setStep(1), 400),
          setTimeout(() => setStep(2), 1600),
          setTimeout(() => setStep(3), 2600),
        ];
    return () => timers.forEach(clearTimeout);
  }, [isInView, reduceMotion]);

  return (
    <div ref={ref} className="relative">
      {/* Ambient glow behind the window */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-12 -top-10 bottom-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 30%, rgba(34,211,238,0.07), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[680px] overflow-hidden rounded-xl border border-line bg-panel shadow-[0_32px_80px_-24px_rgba(0,0,0,0.8)]">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-line bg-raise/60 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#262e36]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#262e36]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#262e36]" />
          </div>
          <span className="text-[12px] font-medium text-faint">
            #engineering — Slack
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              style={{ animation: "status-pulse 2.4s ease-in-out infinite" }}
            />
            Connected
          </span>
        </div>

        <div className="p-5 text-left text-[13.5px] leading-[1.8] sm:p-7">
          {/* User question */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-5 border-b border-line pb-5"
          >
            <div className="mb-1.5 flex items-center gap-2 text-[12px]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#2a3340] text-[10px] font-semibold text-[#aab6c2]">
                M
              </span>
              <span className="font-semibold text-ink">Mike Torres</span>
              <span className="text-faint">2:32 PM</span>
            </div>
            <p className="text-[#c3cdd6]">
              <span className="font-medium text-accent">@Revoca</span>
              {" what’s the status of the Q3 payments integration? Sarah is OOO."}
            </p>
          </motion.div>

          {/* Thinking indicator */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-[12px] text-faint"
            >
              <span>Revoca is tracing context</span>
              <span className="flex gap-1">
                {[0, 0.2, 0.4].map((d) => (
                  <motion.span
                    key={d}
                    className="h-1 w-1 rounded-full bg-accent"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: d }}
                  />
                ))}
              </span>
            </motion.div>
          )}

          {/* Answer */}
          {step >= 3 && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-1.5 flex items-center gap-2 text-[12px]">
                <span className="h-5 w-5 shrink-0 overflow-hidden rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Revoca%20logo.svg"
                    alt="Revoca"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="font-semibold text-ink">Revoca</span>
                <span className="rounded border border-accent/25 bg-accent/10 px-1.5 py-px text-[10px] font-medium text-accent">
                  APP
                </span>
                <span className="text-faint">2:32 PM</span>
              </div>
              <TypingText text={botResponse} trigger={step >= 3} />
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {["Sources: GitHub + Slack", "Confidence 0.94", "3 reasoning steps"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-line bg-raise px-2 py-1 font-mono text-[10.5px] text-faint"
                    >
                      {chip}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
