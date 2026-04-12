"use client";

import FadeIn from "./FadeIn";

export default function CTA() {
  return (
    <section className="py-24 lg:py-28 px-6">
      <div className="max-w-[720px] mx-auto text-center">
        <FadeIn>
          <span className="block font-mono text-sm text-[#e87a2a] mb-4">
            05. What&apos;s Next?
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#eee] tracking-tight mb-4">
            Get In Touch
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-sm text-[#555] max-w-[420px] mx-auto leading-[1.7] mb-8">
            See how Revoca can turn your team&apos;s scattered knowledge into a living,
            always-on context layer.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <a
            href="https://cal.com/revoca-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#e87a2a]/30 px-10 py-3.5 font-mono text-[13px] text-[#e87a2a] rounded hover:bg-[#e87a2a]/10 hover:border-[#e87a2a]/50 hover:shadow-[0_0_20px_rgba(232,122,42,0.08)] transition-all duration-300"
          >
            Book a Call &rarr;
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
