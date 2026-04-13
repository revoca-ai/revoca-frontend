"use client";

import FadeIn from "./FadeIn";

export default function CTA() {
  return (
    <section className="min-h-screen snap-start snap-always py-32 lg:py-44 px-6 relative border-t border-[#0e0e0e] flex flex-col justify-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(232,122,42,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[720px] mx-auto text-center relative">
        <FadeIn>
          <div className="inline-block font-mono text-[10px] text-[#e87a2a] tracking-[3px] uppercase mb-8 border border-[#e87a2a]/20 px-4 py-2 rounded">
            06. Get In Touch
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#f0f0f0] tracking-[-2px] leading-[1.08] mb-5">
            See Revoca in action.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-[14px] text-[#777] max-w-[400px] mx-auto leading-[1.8] mb-12">
            Book a call to explore what Revoca unlocks for your business.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://cal.com/revoca-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e87a2a] px-12 py-4 font-mono text-[13px] text-black font-bold rounded hover:bg-[#d06a1a] hover:shadow-[0_0_40px_rgba(232,122,42,0.25)] transition-all duration-300"
            >
              Book a Call &rarr;
            </a>
            <a
              href="https://t.me/RevokaBetaBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#1e1e1e] px-12 py-4 font-mono text-[13px] text-[#555] rounded hover:border-[#333] hover:text-[#999] transition-all duration-300"
            >
              Try the Beta &rarr;
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="mt-6">
            <a
              href="https://www.notion.so/Revoca-The-Context-Layer-for-the-Companies-44007ae8743d468bad2a1c7fb7af6efb?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[12px] text-[#444] hover:text-[#888] transition-colors duration-300 border-b border-[#222] hover:border-[#444] pb-px"
            >
              Read the full vision deck ↗
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-16 pt-10 border-t border-[#111] grid grid-cols-3 gap-6 max-w-[360px] mx-auto">
            {[
              { value: "24/7", label: "Always On" },
              { value: "0", label: "Data Leakage" },
              { value: "∞", label: "Context Depth" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-2xl font-bold text-[#e87a2a] mb-1">{stat.value}</div>
                <div className="font-mono text-[9px] text-[#2e2e2e] tracking-[2px] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
