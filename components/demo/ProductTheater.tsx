"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import FadeIn from "../FadeIn";
import ChatPanel, { type ChatState } from "./ChatPanel";
import SourceNode from "./SourceNode";
import Wires from "./Wires";
import {
  SCENES,
  SOURCES,
  STAGE_H,
  STAGE_W,
  type FetchState,
  type Platform,
  type SourceId,
} from "./scenarios";

const PLATFORM_DOT: Record<Platform, string> = {
  slack: "#9b5cf6",
  discord: "#5865f2",
  telegram: "#33a0d9",
};

const idleSources = (): Record<SourceId, FetchState> =>
  SOURCES.reduce(
    (acc, s) => {
      acc[s.id] = "idle";
      return acc;
    },
    {} as Record<SourceId, FetchState>,
  );

const emptyChat: ChatState = {
  composerTyping: false,
  questionVisible: false,
  visibleSteps: 0,
  analyzing: false,
  answerVisible: false,
  chipsVisible: false,
};

export default function ProductTheater() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduceMotion = useReducedMotion();

  const [sceneIndex, setSceneIndex] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [chat, setChat] = useState<ChatState>(emptyChat);
  const [sources, setSources] = useState<Record<SourceId, FetchState>>(idleSources);
  const [duration, setDuration] = useState(9000);

  const scene = SCENES[sceneIndex];

  useEffect(() => {
    if (!inView) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const setSrc = (id: SourceId, val: FetchState) =>
      setSources((s) => ({ ...s, [id]: val }));

    // reset
    setCurrentTurn(0);
    setChat(emptyChat);
    setSources(idleSources());

    const lockedId = scene.lockedSource;

    if (reduceMotion) {
      const last = scene.turns.length - 1;
      at(150, () => {
        setCurrentTurn(last);
        setChat({
          composerTyping: false,
          questionVisible: true,
          visibleSteps: scene.turns[last].steps.length,
          analyzing: false,
          answerVisible: true,
          chipsVisible: true,
        });
        setSources(() => {
          const next = idleSources();
          for (const turn of scene.turns) {
            for (const step of turn.steps) {
              next[step.source] =
                turn.restricted && step.source === lockedId ? "locked" : "done";
            }
          }
          return next;
        });
      });
      const end = 4000;
      at(end, () => setSceneIndex((i) => (i + 1) % SCENES.length));
      setDuration(end);
      return () => timers.forEach(clearTimeout);
    }

    // --- animated timeline, turn by turn ---
    let cursor = 0;
    const stepGap = 780;
    const typeSpeed = 18;
    const answerSpeed = 10;

    scene.turns.forEach((turn, ti) => {
      const isFirst = ti === 0;

      at(cursor, () => {
        setCurrentTurn(ti);
        setChat(emptyChat);
      });
      // fresh turn: reset this turn's sources so they re-animate
      if (!isFirst) {
        at(cursor, () =>
          setSources((s) => {
            const n = { ...s };
            for (const step of turn.steps) n[step.source] = "idle";
            return n;
          }),
        );
      }
      cursor += isFirst ? 280 : 420;

      // type into composer, then post
      at(cursor, () => setChat((c) => ({ ...c, composerTyping: true })));
      cursor += turn.question.length * typeSpeed + 380;
      at(cursor, () =>
        setChat((c) => ({ ...c, composerTyping: false, questionVisible: true })),
      );
      cursor += 420;

      // fetch steps
      turn.steps.forEach((step, i) => {
        const start = cursor + i * stepGap;
        const locked = turn.restricted && step.source === lockedId;
        at(start, () => {
          setChat((c) => ({ ...c, visibleSteps: i + 1 }));
          setSrc(step.source, locked ? "locked" : "fetching");
        });
        if (!locked) at(start + 440, () => setSrc(step.source, "done"));
      });
      cursor += turn.steps.length * stepGap + 140;

      // reasoning + answer
      at(cursor, () => setChat((c) => ({ ...c, analyzing: true })));
      cursor += 1000;
      at(cursor, () => setChat((c) => ({ ...c, analyzing: false, answerVisible: true })));
      cursor += turn.answer.length * answerSpeed + 260;
      at(cursor, () => setChat((c) => ({ ...c, chipsVisible: true })));

      // pause before the next turn (longer after a denial so it reads)
      cursor += turn.restricted ? 950 : 520;
    });

    cursor += 1700; // hold
    at(cursor, () => setSceneIndex((i) => (i + 1) % SCENES.length));
    setDuration(cursor);

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIndex, reduceMotion, inView]);

  const activeIds = scene.activeSources;

  return (
    <section
      id="demo"
      ref={ref}
      className="relative flex h-[100svh] max-h-[100svh] scroll-mt-[88px] flex-col overflow-hidden border-t border-line"
    >
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 0%, rgba(34,211,238,0.07), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-[1200px] flex-col px-6 py-4 sm:py-5">
        <div className="mb-2 shrink-0 text-center sm:mb-3">
          <FadeIn>
            <p className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent sm:text-[11px]">
              Live demo
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="mx-auto max-w-[640px] text-[20px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[26px] lg:text-[28px]">
              Watch Revoca{" "}
              <em className="font-serif font-normal italic text-accent-soft">
                trace the answer
              </em>{" "}
              across your stack
            </h2>
          </FadeIn>
        </div>

        {/* Tabs */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mb-2 flex max-w-[720px] shrink-0 flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {SCENES.map((s, i) => {
              const active = i === sceneIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => setSceneIndex(i)}
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-full border px-4 py-1.5 text-[12.5px] font-medium transition-colors duration-300 ${
                    active
                      ? "border-accent/40 text-ink"
                      : "border-line text-faint hover:border-line-strong hover:text-body"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="theater-tab"
                      className="absolute inset-0 -z-0 rounded-full bg-accent/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className="relative z-10 h-1.5 w-1.5 rounded-full transition-opacity duration-300"
                    style={{
                      background: PLATFORM_DOT[s.platform],
                      opacity: active ? 1 : 0.55,
                    }}
                  />
                  <span className="relative z-10 font-mono text-[10px] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative z-10">{s.eyebrow}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* progress bar */}
        <div className="mx-auto mb-2 h-px w-full max-w-[640px] shrink-0 overflow-hidden bg-line sm:mb-3">
          <motion.div
            key={sceneIndex}
            className="h-full bg-accent/70"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </div>

        {/* ===== Desktop stage ===== */}
        <FadeIn delay={0.24} className="hidden min-h-0 flex-1 flex-col lg:flex">
          <div className="min-h-0 flex-1">
            <div className="relative mx-auto h-full w-full max-w-[1100px]">
              {/* control-room backdrop */}
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(151,168,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(151,168,184,0.05) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                    maskImage:
                      "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 38% 46% at 50% 50%, rgba(34,211,238,0.06), transparent 70%)",
                  }}
                />
                {/* corner ticks */}
                {[
                  "left-3 top-3 border-l border-t",
                  "right-3 top-3 border-r border-t",
                  "left-3 bottom-3 border-l border-b",
                  "right-3 bottom-3 border-r border-b",
                ].map((pos) => (
                  <span
                    key={pos}
                    className={`absolute h-4 w-4 border-line-strong ${pos}`}
                  />
                ))}
                <span className="absolute left-5 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-faint/40">
                  revoca · context graph
                </span>
                <span className="absolute right-5 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-faint/40">
                  live trace
                </span>
              </div>

              <Wires
                activeSources={activeIds}
                sources={sources}
                reduceMotion={reduceMotion}
              />

              {/* nodes */}
              {SOURCES.map((s) => (
                <div
                  key={s.id}
                  className="absolute"
                  style={{
                    left: `${(s.x / STAGE_W) * 100}%`,
                    top: `${(s.y / STAGE_H) * 100}%`,
                  }}
                >
                  <SourceNode
                    source={s}
                    state={sources[s.id]}
                    active={activeIds.includes(s.id)}
                  />
                </div>
              ))}

              {/* centre panel */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: "46%", height: "92%" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={sceneIndex}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <ChatPanel
                      scene={scene}
                      currentTurn={currentTurn}
                      active={chat}
                      reduceMotion={reduceMotion}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ===== Mobile / tablet ===== */}
        <FadeIn delay={0.24} className="flex min-h-0 flex-1 flex-col lg:hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            {/* source chips */}
            <div className="mb-2 flex shrink-0 flex-wrap justify-center gap-1.5">
              {activeIds.map((id) => {
                const meta = SOURCES.find((s) => s.id === id)!;
                return (
                  <SourceNode
                    key={id}
                    source={meta}
                    state={sources[id]}
                    active
                    compact
                  />
                );
              })}
            </div>
            <div className="mx-auto h-px max-w-[180px] shrink-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="mt-2 min-h-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sceneIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="mx-auto flex h-full max-w-[520px] flex-col"
                >
                  <ChatPanel
                    scene={scene}
                    currentTurn={currentTurn}
                    active={chat}
                    reduceMotion={reduceMotion}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>

        {/* scene caption */}
        <div className="mx-auto mt-2 max-w-[620px] shrink-0 text-center sm:mt-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={sceneIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="text-[12px] leading-[1.5] text-faint sm:text-[13px] sm:leading-[1.6]"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent/80">
                {String(sceneIndex + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
              </span>
              <span className="mx-2 text-line-strong">·</span>
              {scene.caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
