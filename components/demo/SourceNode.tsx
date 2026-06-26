"use client";

import { motion } from "framer-motion";
import type { FetchState, SourceMeta } from "./scenarios";

const READOUT: Record<FetchState, { label: string; cls: string }> = {
  idle: { label: "IDLE", cls: "text-faint" },
  fetching: { label: "FETCHING", cls: "text-accent" },
  done: { label: "200 OK", cls: "text-emerald-400" },
  locked: { label: "403", cls: "text-amber-400" },
};

function StatusGlyph({ state }: { state: FetchState }) {
  if (state === "fetching") {
    return (
      <motion.span
        className="block h-3.5 w-3.5 rounded-full border-2 border-accent/30 border-t-accent"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    );
  }
  if (state === "done") {
    return (
      <motion.svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 stroke-emerald-400"
        fill="none"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
      >
        <path d="M20 6 9 17l-5-5" />
      </motion.svg>
    );
  }
  if (state === "locked") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-amber-400" fill="none" strokeWidth="2">
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }
  return (
    <span className="block h-1.5 w-1.5 rounded-full bg-faint/50" />
  );
}

export default function SourceNode({
  source,
  state,
  active,
  compact = false,
}: {
  source: SourceMeta;
  state: FetchState;
  active: boolean;
  compact?: boolean;
}) {
  const lit = state === "fetching" || state === "done";
  const locked = state === "locked";
  const readout = READOUT[state];

  if (compact) {
    return (
      <motion.div
        animate={{ opacity: active ? 1 : 0.4 }}
        className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] transition-colors duration-300 ${
          lit
            ? "border-accent/40 bg-accent/10 text-ink"
            : locked
              ? "border-amber-400/40 bg-amber-400/[0.07] text-ink"
              : "border-line bg-panel text-faint"
        }`}
      >
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${lit ? "fill-accent" : "fill-current"}`}>
          <path d={source.icon} />
        </svg>
        <span className="font-medium">{source.label}</span>
        <span className="ml-0.5">
          <StatusGlyph state={state} />
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0.28,
        scale: state === "fetching" ? 1.045 : 1,
        y: state === "fetching" ? -1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-[168px] -translate-x-1/2 -translate-y-1/2"
    >
      {/* activity halo */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-2xl"
        animate={{
          opacity: lit ? 1 : 0,
          boxShadow: lit
            ? "0 0 0 1px rgba(34,211,238,0.22), 0 0 40px -8px rgba(34,211,238,0.6)"
            : "0 0 0 0 rgba(34,211,238,0)",
        }}
        transition={{ duration: 0.4 }}
      />

      <div
        className={`relative overflow-hidden rounded-xl border bg-panel/95 backdrop-blur-sm transition-colors duration-300 ${
          lit ? "border-accent/45" : locked ? "border-amber-400/45" : "border-line"
        }`}
      >
        {/* scanning sweep while fetching */}
        {state === "fetching" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-accent/15 to-transparent"
            style={{ animation: "node-scan 1.1s ease-in-out infinite" }}
          />
        )}

        <div className="relative flex items-center gap-2.5 px-3 py-2.5">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
              lit ? "border-accent/30 bg-accent/10" : "border-line bg-raise"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-colors duration-300 ${lit ? "fill-accent" : "fill-body"}`}
            >
              <path d={source.icon} />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12.5px] font-semibold leading-tight text-ink">
              {source.label}
            </span>
            <span className="block truncate font-mono text-[9.5px] uppercase tracking-[0.08em] leading-tight text-faint">
              {locked ? "restricted" : source.sub}
            </span>
          </span>
          <span className="flex h-4 w-4 items-center justify-center">
            <StatusGlyph state={state} />
          </span>
        </div>

        {/* status readout bar */}
        <div
          className={`flex items-center justify-between border-t px-3 py-1 transition-colors duration-300 ${
            lit ? "border-accent/15 bg-accent/[0.04]" : "border-line bg-raise/40"
          }`}
        >
          <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-faint/70">
            {source.id.replace("-", "·")}
          </span>
          <span className={`font-mono text-[8.5px] font-medium tracking-[0.1em] ${readout.cls}`}>
            {readout.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
