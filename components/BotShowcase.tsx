"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import FadeIn from "./FadeIn";

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
    <span className="text-[#777]">
      {displayed}
      {trigger && displayed.length < text.length && (
        <span
          className="inline-block w-px h-3 bg-[#666] ml-px"
          style={{ animation: "blink 0.8s infinite" }}
        />
      )}
    </span>
  );
}

export default function BotShowcase() {
  const mockRef = useRef(null);
  const isInView = useInView(mockRef, { once: true, margin: "-100px" });

  return (
    <section className="h-screen snap-start snap-always overflow-hidden px-6 border-t border-[#0e0e0e] flex flex-col justify-center">
      <div className="max-w-[780px] mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-5 sm:mb-12">
            <span className="text-3xl font-bold text-[#e8e8e8] tracking-tight">
              See It in Action
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a] to-transparent ml-4" />
          </div>
        </FadeIn>

        <div className="text-center">
          <FadeIn delay={0.05}>
            <p className="text-[14px] text-[#777] max-w-[480px] mx-auto leading-[1.85] mb-8">
              Add Revoca to your channels. It learns each member&apos;s reasoning and decisions
              — then responds as them when they&apos;re away.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-8 text-[13px]">
              <a
                href="https://t.me/RevokaBetaBot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888] hover:text-white transition-colors"
              >
                Telegram Bot
                <span className="inline-block text-[10px] px-2 py-0.5 rounded font-mono ml-1.5 bg-[#0a1a0a] text-[#4a8a4a] border border-[#1a3a1a]">
                  LIVE
                </span>
              </a>
              <span className="text-[#666]">
                Discord Bot
                <span className="inline-block text-[10px] px-2 py-0.5 rounded font-mono ml-1.5 bg-[#141408] text-[#8a8a4a] border border-[#2a2a1a]">
                  COMING SOON
                </span>
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              ref={mockRef}
              className="max-w-[560px] mx-auto bg-[#060606] border border-[#161616] rounded-md p-6 sm:p-8 font-mono text-[12px] sm:text-[13px] leading-[1.9] text-left overflow-hidden break-words"
            >
              <div className="text-[#333] mb-5 text-[11px]"># engineering</div>

              <div className="mb-5 pb-5 border-b border-[#111]">
                <span className="text-[#e87a2a] font-medium">dev_mike:</span>
                <span className="text-[#666]">
                  {" "}@revoca-ai what&apos;s the status of the Q3 payments integration?
                  Sarah is OOO.
                </span>
              </div>

              <div>
                <span className="text-[#ddd] font-medium">revoca-ai:</span>{" "}
                <TypingText text={botResponse} trigger={isInView} />
              </div>
              <div className="text-[11px] text-[#2a2a2a] italic mt-3">
                AI reply · voice: sarah_lead · source: github + slack
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-3">
              <a
                href="https://t.me/RevokaBetaBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#e87a2a]/30 px-6 py-2.5 rounded font-mono text-[13px] text-[#e87a2a] hover:bg-[#e87a2a]/10 hover:border-[#e87a2a]/50 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
                @RevokaBetaBot
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
