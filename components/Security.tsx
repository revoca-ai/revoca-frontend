"use client";

import FadeIn from "./FadeIn";
import { Container } from "./Section";

const guarantees = [
  {
    title: "Strictly isolated agents",
    desc: "One unified knowledge base, multiple agents — each with hard access boundaries. A customer-facing agent can never see internal proprietary data.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
        <path d="M13 7h3M17 7v3" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Scoped access by design",
    desc: "Every query is answered only from the context that agent is permitted to see. Permissions are enforced at the architecture level, not as an afterthought.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
        <path d="M12 14.5v2" />
      </svg>
    ),
  },
  {
    title: "Zero data leakage as the bar",
    desc: "Containment isn't a feature we added — it's the constraint the system was designed around. Your knowledge stays yours, full stop.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4.5 6v5c0 4.5 3 8.4 7.5 10 4.5-1.6 7.5-5.5 7.5-10V6L12 3Z" />
        <path d="m9 12 2 2 4-4.5" />
      </svg>
    ),
  },
];

export default function Security() {
  return (
    <section id="security" className="border-t border-line py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <FadeIn>
              <p className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
                Security
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[40px]">
                Isolated and secure,{" "}
                <em className="font-serif font-normal italic text-accent-soft">
                  by architecture
                </em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-4 max-w-[460px] text-[16px] leading-[1.7] text-body">
                A context layer is only as valuable as it is trustworthy.
                Revoca is built so that the right people — and only the right
                people — can reach any given piece of knowledge.
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <a
                href="https://calendly.com/revoca-ai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-accent transition-colors duration-200 hover:text-accent-soft"
              >
                Discuss your security requirements
                <span aria-hidden>&rarr;</span>
              </a>
            </FadeIn>
          </div>

          {/* Right: guarantees */}
          <div className="flex flex-col gap-4">
            {guarantees.map((g, i) => (
              <FadeIn key={g.title} delay={0.1 + i * 0.08}>
                <div className="group flex gap-5 rounded-xl border border-line bg-panel p-6 transition-all duration-300 hover:border-line-strong">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-raise text-body transition-colors duration-300 group-hover:text-accent">
                    {g.icon}
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-[16px] font-semibold text-ink">
                      {g.title}
                    </h3>
                    <p className="text-[14.5px] leading-[1.75] text-body">{g.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
