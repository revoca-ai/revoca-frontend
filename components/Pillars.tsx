"use client";

import FadeIn from "./FadeIn";

const problems = [
  {
    title: "People go offline. Context disappears.",
    desc: "A senior engineer leaves for two weeks and three projects stall. A PM quits and six months of reasoning walks out the door with them.",
  },
  {
    title: "The why gets buried.",
    desc: "Decisions are made across Slack, Jira, GitHub, and calls — but the reasoning behind them is scattered, unstructured, and gone when you need it.",
  },
  {
    title: "Leadership is flying blind.",
    desc: "There's no real-time view of what's happening across teams. Where things are stuck, what's at risk — it's all locked in people's heads.",
  },
];

export default function Pillars() {
  return (
    <section
      id="about"
      className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden px-6 border-t border-[#0e0e0e] flex flex-col justify-center py-24 lg:py-0"
    >
      <div className="max-w-[780px] mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6 sm:mb-14">
            <span className="font-mono text-sm text-[#22d3ee]">01.</span>
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
