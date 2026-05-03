"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./Pillars";

type Connector = {
  name: string;
  svg: string;
};

const connectors: Connector[] = [
  {
    name: "GitHub",
    svg: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    name: "Slack",
    svg: "M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z",
  },
  {
    name: "Discord",
    svg: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z",
  },
  {
    name: "Telegram",
    svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z",
  },
  {
    name: "Docs",
    svg: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z",
  },
];

const more = [
  "Salesforce", "Jira", "Confluence", "Zoom", "Google Meet",
  "Linear", "Notion", "Email", "Loom", "Figma", "Intercom", "...",
];

export default function Connectors() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="integrations"
      className="min-h-screen lg:h-screen lg:snap-start lg:snap-always lg:overflow-hidden px-6 border-t border-[#0e0e0e] flex flex-col justify-center py-24 lg:py-0 relative"
    >
      <div className="max-w-[860px] mx-auto w-full" ref={ref}>
        <SectionHeader
          number="04"
          title="Integrations"
          subtitle="Connects where your team already works."
          isInView={isInView}
        />

        {/* Connector cards */}
        <div className="grid grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {connectors.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
              className="group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-xl bg-[#0a1216]/40 border border-[#22d3ee]/12 backdrop-blur-sm hover:border-[#22d3ee]/40 hover:bg-[#0a1216]/70 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#080c0e] border border-[#1a1a1a] flex items-center justify-center group-hover:border-[#22d3ee]/30 transition-colors duration-300">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-[#888] group-hover:fill-[#22d3ee] transition-colors duration-300"
                >
                  <path d={c.svg} />
                </svg>
              </div>

              {/* Name */}
              <span className="font-mono text-[11px] text-[#888] group-hover:text-[#ccc] transition-colors duration-300 text-center leading-tight">
                {c.name}
              </span>

              {/* LIVE badge */}
              <span
                className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#0a1a20] text-[#22d3ee]/80 border border-[#22d3ee]/25"
              >
                LIVE
              </span>
            </motion.div>
          ))}
        </div>

        {/* "And more" section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="border-t border-[#111] pt-6 sm:pt-8"
        >
          <p className="font-mono text-[11px] text-[#555] tracking-[2px] mb-4 text-center">
            COMING SOON
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {more.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.04 }}
                className="font-mono text-[11px] text-[#666] border border-[#1f2630] rounded px-2.5 py-1 bg-[#0a1216]/30 hover:text-[#22d3ee] hover:border-[#22d3ee]/35 transition-colors duration-200"
              >
                {name}
              </motion.span>
            ))}
          </div>
          <p className="text-center text-[12px] text-[#555] max-w-[400px] mx-auto leading-[1.8] mt-5">
            If your team works in it, Revoca will connect to it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
