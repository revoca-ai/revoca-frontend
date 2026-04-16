"use client";

import FadeIn from "./FadeIn";

const problems = [
  {
    title: "People go offline. Teams stall.",
    desc: "Critical decisions and task status locked behind one person. The rest of the company waits.",
  },
  {
    title: "Knowledge lives nowhere.",
    desc: "Scattered across Slack threads, Jira tickets, and PRs — disconnected, unstructured, and effectively gone.",
  },
  {
    title: "Onboarding never ends.",
    desc: "Every new hire, the same slow process. Tribal knowledge evaporates every time someone leaves.",
  },
];

export default function Pillars() {
  return (
    <section
      id="about"
      className="h-screen snap-start snap-always overflow-hidden px-6 border-t border-[#0e0e0e] flex flex-col justify-center"
    >
      <div className="max-w-[780px] mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6 sm:mb-14">
            <span className="font-mono text-sm text-[#e87a2a]">01.</span>
            <span className="text-3xl font-bold text-[#e8e8e8] tracking-tight">The Problem</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a] to-transparent ml-4" />
          </div>
        </FadeIn>

        <div className="divide-y divide-[#0f0f0f]">
          {problems.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.12}>
              <div className="grid grid-cols-[72px_1fr] gap-6 sm:gap-12 py-5 sm:py-10 group">
                <span className="font-mono text-[52px] sm:text-[60px] font-bold text-[#111] leading-none pt-1 select-none group-hover:text-[#181818] transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-2">
                  <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#aaa] mb-4 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[14px] text-[#777] leading-[1.9]">{p.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
