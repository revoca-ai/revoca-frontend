"use client";

import FadeIn from "./FadeIn";

export default function CTA() {
  return (
    <section className="h-screen snap-start snap-always overflow-hidden px-6 relative border-t border-[#0e0e0e] flex flex-col">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(232,122,42,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Main CTA content — fills remaining space and centers vertically */}
      <div className="flex-1 flex flex-col justify-center items-center text-center relative max-w-[720px] mx-auto w-full">
        <FadeIn>
          <div className="inline-block font-mono text-[10px] text-[#e87a2a] tracking-[3px] uppercase mb-6 border border-[#e87a2a]/20 px-4 py-2 rounded">
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
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="mailto:heyrevoca@gmail.com"
              className="inline-flex items-center gap-2 font-mono text-[12px] text-[#444] hover:text-[#888] transition-colors duration-300 border-b border-[#222] hover:border-[#444] pb-px"
            >
              heyrevoca@gmail.com
            </a>
            <span className="hidden sm:block text-[#222] font-mono text-[12px]">·</span>
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
          <div className="mt-8 sm:mt-12 pt-8 border-t border-[#111] grid grid-cols-3 gap-6 max-w-[360px] mx-auto">
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

      {/* Footer pinned at the bottom of this snap section */}
      <footer className="shrink-0 py-6 border-t border-[#111] relative">
        <div className="max-w-[780px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href="#" className="font-mono text-sm font-bold tracking-tight">
            <span className="text-[#e87a2a]">&gt;</span>{" "}
            <span className="text-[#ddd]">revoca</span>
            <span className="text-[#333]">.</span>
            <span className="text-[#e87a2a]">ai</span>
          </a>
          <p className="font-mono text-[10px] text-[#282828] text-center">
            &copy; 2025 Revoca AI &mdash; The Context Layer for Your Company
          </p>
          <a
            href="mailto:heyrevoca@gmail.com"
            className="font-mono text-[11px] text-[#3a3a3a] hover:text-[#e87a2a] transition-colors duration-200"
          >
            heyrevoca@gmail.com
          </a>
        </div>
      </footer>
    </section>
  );
}
