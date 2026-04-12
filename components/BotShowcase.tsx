"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import FadeIn from "./FadeIn";

const botResponse =
  "We went with Postgres because we needed ACID transactions for the session store. Alex discussed this in the arch review on March 2nd. The key concern was data consistency during concurrent session invalidations.";

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
    }, 18);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return (
    <span className="text-[#555]">
      {displayed}
      {trigger && displayed.length < text.length && (
        <span className="inline-block w-px h-3 bg-[#666] ml-px" style={{ animation: "blink 0.8s infinite" }} />
      )}
    </span>
  );
}

export default function BotShowcase() {
  const mockRef = useRef(null);
  const isInView = useInView(mockRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-28 px-6">
      <div className="max-w-[720px] mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-sm text-[#e87a2a]">03.</span>
            <span className="text-2xl font-bold text-[#e8e8e8] tracking-tight">
              Meet the Bots
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a] to-transparent ml-4" />
          </div>
        </FadeIn>

        <div className="text-center">
          <FadeIn>
            <h3 className="text-xl font-semibold text-[#ddd] mb-3">
              <span className="font-mono text-sm text-[#eee] bg-[#0e0e0e] border border-[#1e1e1e] px-2.5 py-1 rounded">
                @revoca-ai
              </span>
            </h3>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-sm text-[#666] max-w-[480px] mx-auto leading-[1.7] mb-5">
              Add Revoca to your team&apos;s channels. It learns each member&apos;s voice,
              reasoning patterns, and decision history, then responds as them when they&apos;re away.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-7 text-[13px]">
              <a href="https://t.me/RevokaBetaBot" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-white transition-colors">
                Telegram Bot
                <span className="inline-block text-[10px] px-2 py-0.5 rounded font-mono ml-1.5 bg-[#0a1a0a] text-[#4a8a4a] border border-[#1a3a1a] shadow-[0_0_8px_rgba(74,138,74,0.08)]">
                  LIVE
                </span>
              </a>
              <span className="text-[#888]">
                Discord Bot
                <span className="inline-block text-[10px] px-2 py-0.5 rounded font-mono ml-1.5 bg-[#141408] text-[#8a8a4a] border border-[#2a2a1a]">
                  COMING SOON
                </span>
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ul className="inline-block text-left list-none p-0 mb-7">
              {[
                "Persona-based replies in each member's voice",
                "Backed by real decision traces, not hallucinations",
                "Clearly disclosed as AI, transparent by design",
                "Per-channel routing to different team members",
              ].map((feature) => (
                <li key={feature} className="text-[13px] text-[#777] mb-2 pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-[#444]">
                  {feature}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div
              ref={mockRef}
              className="max-w-[520px] mx-auto bg-[#080808] border border-[#161616] rounded-md p-4 sm:p-6 font-mono text-[11px] sm:text-xs leading-[1.8] text-left overflow-hidden break-words"
            >
              <div className="text-[#2a2a2a] mb-3.5 text-[11px]"># engineering</div>
              <div className="mb-3.5">
                <span className="text-[#666] font-medium">dev_jane:</span>
                <span className="text-[#555]">
                  {" "}@revoca-ai why did we choose PostgreSQL over MongoDB for the auth service?
                </span>
              </div>
              <div>
                <span className="text-[#ddd] font-medium">revoca-ai:</span>{" "}
                <TypingText text={botResponse} trigger={isInView} />
              </div>
              <div className="text-[10px] text-[#2a2a2a] italic mt-1.5">
                AI reply, voice: alex_lead
              </div>
            </div>
          </FadeIn>

          {/* Try the Beta CTA */}
          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-3">
              <p className="font-mono text-[11px] text-[#e87a2a] tracking-[2px] uppercase">
                Try the beta
              </p>
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
