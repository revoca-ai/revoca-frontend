"use client";

import FadeIn from "./FadeIn";

const pillars = [
  {
    label: "[ ONBOARD ]",
    title: "Dev Onboarding",
    desc: "New devs ramp up in days, not months. Revoca surfaces past decisions, architectural context, and tribal knowledge from your existing tools.",
  },
  {
    label: "[ SUPPORT ]",
    title: "24/7 Customer Support",
    desc: "Your team's expertise, available around the clock. The bot responds in your team members' voice, backed by their actual decision history.",
  },
  {
    label: "[ CONTEXT ]",
    title: "Never Out of Office",
    desc: "A context graph of each employee's decisions and reasoning. Your team never loses momentum, even when key people are offline.",
  },
];

export default function Pillars() {
  return (
    <section id="about" className="py-24 lg:py-28 px-6">
      <div className="max-w-[720px] mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-sm text-[#e87a2a]">01.</span>
            <span className="text-2xl font-bold text-[#e8e8e8] tracking-tight">
              What Revoca Does
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#1a1a1a] to-transparent ml-4" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <FadeIn key={p.label} delay={i * 0.1}>
              <div className="bg-[#0a0a0a] border border-[#161616] rounded-md p-7 hover:border-[#2a2a2a] hover:shadow-[0_0_30px_rgba(255,255,255,0.01)] transition-all duration-300 h-full">
                <div className="font-mono text-[11px] text-[#e87a2a] tracking-[2px] mb-3.5">
                  {p.label}
                </div>
                <h3 className="text-[15px] font-semibold text-[#ccc] mb-2.5">
                  {p.title}
                </h3>
                <p className="text-[13px] text-[#666] leading-[1.7]">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
