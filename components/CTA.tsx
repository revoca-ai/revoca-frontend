"use client";

import posthog from "posthog-js";
import FadeIn from "./FadeIn";
import { Container } from "./Section";
import TryBetaButton from "./TryBetaButton";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-line py-28 sm:py-36">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 50% 100%, rgba(34,211,238,0.09), transparent 70%)",
        }}
      />

      <Container className="relative text-center">
        <FadeIn>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Revoca%20logo.svg"
            alt="Revoca"
            className="mx-auto mb-8 h-14 w-14 rounded-full"
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="mx-auto max-w-[640px] text-[clamp(28px,8vw,36px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[48px]">
            Stop losing what your
            <br />
            company already{" "}
            <em className="font-serif font-normal italic text-accent-soft">
              knows
            </em>
          </h2>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mx-auto mt-5 max-w-[440px] text-[16px] leading-[1.7] text-body">
            Book a 30-minute demo and see what Revoca unlocks for your team —
            or start with the beta today.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://calendly.com/revoca-ai/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("cta_book_call_clicked", { location: "cta_section" })
              }
              className="rounded-lg bg-accent px-7 py-3 text-[15px] font-semibold text-[#04181d] shadow-[0_8px_30px_-8px_rgba(34,211,238,0.45)] transition-all duration-200 hover:bg-accent-soft hover:shadow-[0_8px_36px_-6px_rgba(34,211,238,0.55)]"
            >
              Book a demo
            </a>
            <TryBetaButton location="cta_section" />
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 flex flex-col items-center justify-center gap-2 text-[14px] sm:flex-row sm:gap-6">
            <a
              href="mailto:revoca.ai@gmail.com"
              onClick={() => posthog.capture("cta_email_clicked", { location: "cta_section" })}
              className="text-faint transition-colors duration-200 hover:text-ink"
            >
              revoca.ai@gmail.com
            </a>
            <span className="hidden text-line-strong sm:block">·</span>
            <a
              href="https://www.notion.so/Revoca-The-Context-Layer-for-the-Companies-44007ae8743d468bad2a1c7fb7af6efb?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("cta_vision_deck_clicked", { location: "cta_section" })
              }
              className="text-faint transition-colors duration-200 hover:text-ink"
            >
              Read the full vision deck ↗
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
