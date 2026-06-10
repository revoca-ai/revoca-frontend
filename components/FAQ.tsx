"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import posthog from "posthog-js";
import FadeIn from "./FadeIn";
import { Container, SectionHeading } from "./Section";

const faqs = [
  {
    q: "How does Revoca learn my company's context?",
    a: "You connect the places your team already works — Slack, GitHub, Discord, and your docs. Revoca ingests both structured and unstructured knowledge and builds a living context graph of decisions, the reasoning behind them, and the people involved. From then on it stays current automatically.",
  },
  {
    q: "Where does my team interact with Revoca?",
    a: "Inside the tools you already use. Ask questions in Slack or Discord and get answers in-channel, or wire Revoca into agentic IDEs like Cursor through our MCP servers so developers code with full company context. There's no new app to adopt.",
  },
  {
    q: "Can one team's agent access another team's data?",
    a: "No. Revoca runs multiple agents over one knowledge base, each with strictly isolated, scoped access. A customer-facing agent cannot reach internal proprietary data — isolation is enforced at the architecture level, not as a setting.",
  },
  {
    q: "What does setup look like?",
    a: "Connect your sources and Revoca starts building your context graph immediately — there's no manual tagging, migration, or curation. Book a demo and we'll walk through a setup scoped to your stack.",
  },
  {
    q: "How can I try it today?",
    a: "Revoca is in private beta. You can try the beta bot on Telegram right now, or book a call and we'll set your team up directly in Slack or Discord.",
  },
];

function FAQItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left transition-colors duration-200"
      >
        <span
          className={`text-[16px] font-medium transition-colors duration-200 ${
            open ? "text-ink" : "text-body hover:text-ink"
          }`}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`shrink-0 text-[20px] leading-none ${
            open ? "text-accent" : "text-faint"
          }`}
          aria-hidden
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[640px] pb-6 text-[14.5px] leading-[1.8] text-body">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions"
              subtitle="Everything else — we're happy to answer directly."
            />
            <FadeIn delay={0.2}>
              <a
                href="mailto:revoca.ai@gmail.com"
                onClick={() => posthog.capture("faq_email_clicked")}
                className="-mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-accent transition-colors duration-200 hover:text-accent-soft"
              >
                revoca.ai@gmail.com
                <span aria-hidden>&rarr;</span>
              </a>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <div className="border-t border-line">
              {faqs.map((f, i) => (
                <FAQItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  open={openIndex === i}
                  onToggle={() => {
                    const next = openIndex === i ? null : i;
                    setOpenIndex(next);
                    if (next !== null) posthog.capture("faq_opened", { question: f.q });
                  }}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
