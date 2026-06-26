"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  SOURCE_MAP,
  STAGE_H,
  STAGE_W,
  wirePath,
  type FetchState,
  type SourceId,
} from "./scenarios";

interface SparkInstance {
  key: number;
  id: SourceId;
  /** true = panel -> node (request), false = node -> panel (data back) */
  reverse: boolean;
}

const TAIL = 5;

function Spark({
  pathEl,
  reverse,
  onDone,
}: {
  pathEl: SVGPathElement | null;
  reverse: boolean;
  onDone: () => void;
}) {
  const gRef = useRef<SVGGElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!pathEl) {
      doneRef.current();
      return;
    }
    const total = pathEl.getTotalLength();
    if (!total) {
      doneRef.current();
      return;
    }
    const duration = 660;
    const spacing = total * 0.045;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t * t * (3 - 2 * t);
      const head = reverse ? (1 - eased) * total : eased * total;
      const fade = t < 0.12 ? t / 0.12 : t > 0.85 ? (1 - t) / 0.15 : 1;

      for (let k = 0; k < TAIL; k++) {
        const dot = dotRefs.current[k];
        if (!dot) continue;
        let d = head + (reverse ? 1 : -1) * k * spacing;
        d = Math.max(0, Math.min(total, d));
        const pt = pathEl.getPointAtLength(d);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
        dot.setAttribute("opacity", String(fade * (1 - k / TAIL)));
      }
      if (t < 1) raf = requestAnimationFrame(tick);
      else doneRef.current();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathEl, reverse]);

  return (
    <g ref={gRef}>
      {/* tail first (drawn under), head last (k=0, on top with glow) */}
      {Array.from({ length: TAIL })
        .map((_, k) => k)
        .reverse()
        .map((k) => (
          <circle
            key={k}
            ref={(el) => {
              dotRefs.current[k] = el;
            }}
            r={k === 0 ? 3.2 : 3.8 - k * 0.55}
            fill={k === 0 ? "#eafdff" : "#22d3ee"}
            opacity={0}
            style={k === 0 ? { filter: "drop-shadow(0 0 6px rgba(34,211,238,0.9))" } : undefined}
          />
        ))}
    </g>
  );
}

export default function Wires({
  activeSources,
  sources,
  reduceMotion,
}: {
  activeSources: SourceId[];
  sources: Record<SourceId, FetchState>;
  reduceMotion: boolean | null;
}) {
  const pathRefs = useRef<Partial<Record<SourceId, SVGPathElement | null>>>({});
  const prevStates = useRef<Record<SourceId, FetchState>>(
    {} as Record<SourceId, FetchState>,
  );
  const [sparks, setSparks] = useState<SparkInstance[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;
    const prev = prevStates.current;
    const next: SparkInstance[] = [];
    for (const id of activeSources) {
      const was = prev[id];
      const now = sources[id];
      if (was !== "fetching" && now === "fetching") {
        next.push({ key: counter.current++, id, reverse: true });
      }
      if (was !== "done" && now === "done") {
        next.push({ key: counter.current++, id, reverse: false });
      }
    }
    if (next.length) setSparks((s) => [...s, ...next]);
    prevStates.current = { ...prevStates.current, ...sources };
  }, [sources, activeSources, reduceMotion]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="wire-grad-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(34,211,238,0.25)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0.85)" />
        </linearGradient>
        <linearGradient id="wire-grad-r" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="rgba(34,211,238,0.25)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0.85)" />
        </linearGradient>
      </defs>

      {activeSources.map((id) => {
        const meta = SOURCE_MAP[id];
        const d = wirePath(meta);
        const left = meta.x < STAGE_W / 2;
        const state = sources[id] ?? "idle";
        const lit = state === "fetching" || state === "done";
        const locked = state === "locked";
        return (
          <g key={id}>
            {/* dim base rail (also the measuring path) */}
            <path
              ref={(el) => {
                pathRefs.current[id] = el;
              }}
              d={d}
              stroke="rgba(151,168,184,0.16)"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
            {/* ambient connected current */}
            {!reduceMotion && (
              <path
                d={d}
                stroke="rgba(34,211,238,0.32)"
                strokeWidth={1.4}
                strokeDasharray="2 10"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  opacity: lit ? 0 : 0.7,
                  animation: "wire-flow 1.6s linear infinite",
                }}
              />
            )}
            {/* lit overlay */}
            <motion.path
              d={d}
              stroke={locked ? "rgba(251,191,36,0.6)" : left ? "url(#wire-grad-l)" : "url(#wire-grad-r)"}
              strokeWidth={1.8}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: lit || locked ? 1 : 0,
                opacity: lit ? 1 : locked ? 0.75 : 0,
              }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeInOut" }}
              style={{
                filter: lit ? "drop-shadow(0 0 5px rgba(34,211,238,0.55))" : "none",
              }}
            />
          </g>
        );
      })}

      {sparks.map((sp) => (
        <Spark
          key={sp.key}
          pathEl={pathRefs.current[sp.id] ?? null}
          reverse={sp.reverse}
          onDone={() => setSparks((list) => list.filter((s) => s.key !== sp.key))}
        />
      ))}
    </svg>
  );
}
