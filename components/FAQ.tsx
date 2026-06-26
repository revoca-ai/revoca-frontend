"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { captureIfConsented } from "@/lib/posthog-client";
import FadeIn from "./FadeIn";
import { Container, SectionHeading } from "./Section";
import { FAQS } from "@/lib/site";

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
    <section id="faq" className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.35fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions"
              subtitle="Everything else — we're happy to answer directly."
            />
            <FadeIn delay={0.2}>
              <a
                href="mailto:revoca.ai@gmail.com"
                onClick={() => captureIfConsented("faq_email_clicked")}
                className="-mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-accent transition-colors duration-200 hover:text-accent-soft"
              >
                revoca.ai@gmail.com
                <span aria-hidden>&rarr;</span>
              </a>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <div className="border-t border-line">
              {FAQS.map((f, i) => (
                <FAQItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  open={openIndex === i}
                  onToggle={() => {
                    const next = openIndex === i ? null : i;
                    setOpenIndex(next);
                    if (next !== null) captureIfConsented("faq_opened", { question: f.q });
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
