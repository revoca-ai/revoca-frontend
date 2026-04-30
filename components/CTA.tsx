"use client";

import FadeIn from "./FadeIn";
import posthog from "posthog-js";

export default function CTA() {
  return (
    <section className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden px-6 relative border-t border-[#0e0e0e] flex flex-col pt-24 lg:pt-0">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(34,211,238,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Main CTA content — fills remaining space and centers vertically */}
      <div className="flex-1 flex flex-col justify-center items-center text-center relative max-w-[720px] mx-auto w-full">
        <FadeIn>
          <div className="inline-block font-mono text-[10px] text-[#22d3ee] tracking-[3px] uppercase mb-6 border border-[#22d3ee]/20 px-4 py-2 rounded">
            06. Get In Touch
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#f0f0f0] tracking-[-2px] leading-[1.08] mb-4">
            See Revoca in action.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-[14px] text-[#777] max-w-[400px] mx-auto leading-[1.8] mb-8">
            Book a call to explore what Revoca unlocks for your business.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://calendly.com/revoca-ai/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("cta_book_call_clicked", { location: "cta_section" })}
              className="inline-block bg-[#22d3ee] px-12 py-4 font-mono text-[13px] text-black font-bold rounded hover:bg-[#06b6d4] hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-all duration-300"
            >
              Book a Call &rarr;
            </a>
            <a
              href="https://t.me/RevokaBetaBot"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("cta_try_beta_clicked", { location: "cta_section" })}
              className="inline-block border border-[#1e1e1e] px-12 py-4 font-mono text-[13px] text-[#555] rounded hover:border-[#333] hover:text-[#999] transition-all duration-300"
            >
              Try the Beta &rarr;
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="mailto:revoca.ai@gmail.com"
              onClick={() => posthog.capture("cta_email_clicked", { location: "cta_section" })}
              className="inline-flex items-center gap-2 font-mono text-[12px] text-[#444] hover:text-[#888] transition-colors duration-300 border-b border-[#222] hover:border-[#444] pb-px"
            >
              revoca.ai@gmail.com
            </a>
            <span className="hidden sm:block text-[#222] font-mono text-[12px]">·</span>
            <a
              href="https://www.notion.so/Revoca-The-Context-Layer-for-the-Companies-44007ae8743d468bad2a1c7fb7af6efb?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("cta_vision_deck_clicked", { location: "cta_section" })}
              className="inline-flex items-center gap-2 font-mono text-[12px] text-[#444] hover:text-[#888] transition-colors duration-300 border-b border-[#222] hover:border-[#444] pb-px"
            >
              Read the full vision deck ↗
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 sm:mt-12 pt-8 border-t border-[#111] grid grid-cols-3 gap-6 max-w-[360px] mx-auto">
            {[
              { value: "24/7", label: "Always On" },
              { value: "0", label: "Data Leakage" },
              { value: "∞", label: "Context Depth" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-2xl font-bold text-[#22d3ee] mb-1">{stat.value}</div>
                <div className="font-mono text-[9px] text-[#2e2e2e] tracking-[2px] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Footer pinned at the bottom of this snap section */}
      <footer className="shrink-0 py-6 border-t border-[#111] relative">
        <div className="max-w-[780px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href="#" className="font-mono text-sm font-bold tracking-tight">
            <span className="text-[#22d3ee]">&gt;</span>{" "}
            <span className="text-[#ddd]">revoca</span>
            <span className="text-[#333]">.</span>
            <span className="text-[#22d3ee]">ai</span>
          </a>
          <p className="font-mono text-[10px] text-[#282828] text-center">
            &copy; 2025 Revoca AI &mdash; The Context Layer for Your Company
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
