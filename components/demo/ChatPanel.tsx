"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Platform, Scene, SourceId, Turn } from "./scenarios";

const PLATFORM: Record<Platform, { name: string; accent: string; glyph: string }> = {
  slack: {
    name: "Slack",
    accent: "#9b5cf6",
    glyph:
      "M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z",
  },
  discord: {
    name: "Discord",
    accent: "#5865f2",
    glyph:
      "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
  },
  telegram: {
    name: "Telegram",
    accent: "#33a0d9",
    glyph:
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z",
  },
};

const SOURCE_TOKEN: Record<SourceId, string> = {
  slack: "slack",
  "github-pr": "github·pr",
  "github-issue": "github·issues",
  docs: "docs",
  meet: "meet",
  web: "web",
};

function TypingText({ text, run, speed = 10 }: { text: string; run: boolean; speed?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) {
      setN(0);
      return;
    }
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [run, text, speed]);
  const done = n >= text.length;
  return (
    <>
      {text.slice(0, n)}
      {run && !done && (
        <span
          className="ml-px inline-block h-3.5 w-px bg-accent align-middle"
          style={{ animation: "blink 0.8s infinite" }}
        />
      )}
    </>
  );
}

function Dots() {
  return (
    <span className="inline-flex gap-1">
      {[0, 0.18, 0.36].map((d) => (
        <motion.span
          key={d}
          className="h-1 w-1 rounded-full bg-accent"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: d }}
        />
      ))}
    </span>
  );
}

const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px stroke-amber-400" fill="none" strokeWidth="2">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export interface ChatState {
  composerTyping: boolean;
  questionVisible: boolean;
  visibleSteps: number;
  analyzing: boolean;
  answerVisible: boolean;
  chipsVisible: boolean;
}

function QuestionRow({
  turn,
  visible,
  reduceMotion,
}: {
  turn: Turn;
  visible: boolean;
  reduceMotion: boolean | null;
}) {
  if (!visible) return null;
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex gap-2.5"
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold text-white"
        style={{ background: turn.user.color }}
      >
        {turn.user.initials}
      </span>
      <div className="min-w-0">
        <div className="mb-0.5 flex items-center gap-1.5 text-[11.5px]">
          <span className="font-semibold text-ink">{turn.user.name}</span>
          <span className="rounded bg-raise px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.06em] text-faint">
            {turn.user.role}
          </span>
          <span className="text-faint">{turn.user.time}</span>
        </div>
        <p className="text-[#c7d1da]">
          <span className="font-medium text-accent">@Revoca</span> {turn.question}
        </p>
      </div>
    </motion.div>
  );
}

function ReplyRow({
  turn,
  active,
  isActiveTurn,
  reduceMotion,
}: {
  turn: Turn;
  active: ChatState;
  isActiveTurn: boolean;
  reduceMotion: boolean | null;
}) {
  // completed turns: everything shown, no step logs; active turn: progressive
  const showReply = isActiveTurn ? active.visibleSteps > 0 || active.analyzing || active.answerVisible : true;
  if (!showReply) return null;

  const answerVisible = isActiveTurn ? active.answerVisible : true;
  const chipsVisible = isActiveTurn ? active.chipsVisible : true;
  const restricted = turn.restricted;

  return (
    <div className="flex gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md border border-accent/25 bg-accent/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Revoca%20logo.svg" alt="Revoca" className="h-4 w-4 object-contain" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center gap-1.5 text-[11.5px]">
          <span className="font-semibold text-ink">Revoca</span>
          <span className="rounded border border-accent/25 bg-accent/10 px-1.5 py-px font-mono text-[9px] font-medium tracking-[0.06em] text-accent">
            APP
          </span>
          <span className="text-faint">→ {turn.user.name.split(" ")[0]}</span>
        </div>

        {/* step logs — active turn only */}
        {isActiveTurn && active.visibleSteps > 0 && (
          <div className="space-y-1.5">
            {turn.steps.slice(0, active.visibleSteps).map((step, i) => {
              const isLast = i === active.visibleSteps - 1;
              const stillWorking = isLast && !active.analyzing && !active.answerVisible;
              const denied = restricted && step.source === "docs";
              return (
                <motion.div
                  key={step.label}
                  initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-[12px] text-faint"
                >
                  <span className="flex h-3.5 w-3.5 items-center justify-center">
                    {stillWorking ? (
                      <motion.span
                        className="block h-3 w-3 rounded-full border-2 border-accent/25 border-t-accent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                    ) : denied ? (
                      <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-amber-400" fill="none" strokeWidth="2.6">
                        <rect x="5" y="11" width="14" height="9" rx="2" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-emerald-400" fill="none" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.04em] ${denied ? "text-amber-400/80" : "text-accent/70"}`}>
                    {SOURCE_TOKEN[step.source]}
                  </span>
                  <span className="text-faint/50">›</span>
                  <span>{step.label}</span>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* analyzing */}
        {isActiveTurn && active.analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 flex items-center gap-2 text-[12px] text-faint"
          >
            <span>Reasoning over context</span>
            <Dots />
          </motion.div>
        )}

        {/* answer */}
        {answerVisible && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-2.5"
          >
            <div className={`rounded-lg border-l-2 py-0.5 pl-3 ${restricted ? "border-amber-400/60" : "border-accent/50"}`}>
              <p className={restricted ? "text-amber-300/90" : "text-[#c7d1da]"}>
                {restricted && <LockIcon />}
                {isActiveTurn && !reduceMotion ? (
                  <TypingText text={turn.answer} run />
                ) : (
                  turn.answer
                )}
              </p>
            </div>

            {chipsVisible && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-3 flex flex-wrap gap-1.5"
              >
                {turn.chips.map((chip) => (
                  <span
                    key={chip}
                    className={`rounded-md border px-2 py-1 font-mono text-[10px] ${
                      restricted
                        ? "border-amber-400/30 bg-amber-400/[0.06] text-amber-300/80"
                        : "border-line bg-raise text-faint"
                    }`}
                  >
                    {chip}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function ChatPanel({
  scene,
  currentTurn,
  active,
  reduceMotion,
}: {
  scene: Scene;
  currentTurn: number;
  active: ChatState;
  reduceMotion: boolean | null;
}) {
  const theme = PLATFORM[scene.platform];
  const activeTurn = scene.turns[currentTurn];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [currentTurn, active.visibleSteps, active.answerVisible, active.chipsVisible, active.questionVisible]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]">
      {/* platform identity hairline */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
      />

      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-raise/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4" style={{ fill: theme.accent }}>
            <path d={theme.glyph} />
          </svg>
          <span className="text-[12.5px] font-semibold text-ink">{scene.channel}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
            {theme.name}
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-emerald-400">
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            style={{ animation: "status-pulse 2.4s ease-in-out infinite" }}
          />
          revoca · live
        </span>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-left text-[13px] leading-[1.65] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-5"
      >
        {scene.turns.map((turn, i) => {
          if (i > currentTurn) return null;
          const isActiveTurn = i === currentTurn;
          const qVisible = isActiveTurn ? active.questionVisible : true;
          return (
            <div key={i} className="space-y-4">
              {/* divider between turns */}
              {i > 0 && (
                <div className="flex items-center gap-2 pt-1 text-faint/40">
                  <span className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em]">new request</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
              )}
              <QuestionRow turn={turn} visible={qVisible} reduceMotion={reduceMotion} />
              <ReplyRow turn={turn} active={active} isActiveTurn={isActiveTurn} reduceMotion={reduceMotion} />
            </div>
          );
        })}
      </div>

      {/* composer */}
      <div className="border-t border-line bg-raise/40 px-4 py-3">
        <div
          className={`flex items-center gap-2 rounded-lg border bg-panel px-3 py-2 text-[12px] transition-colors duration-300 ${
            active.composerTyping ? "border-accent/40" : "border-line"
          }`}
        >
          {active.composerTyping ? (
            <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-[#c7d1da]">
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[8px] font-semibold text-white"
                style={{ background: activeTurn.user.color }}
              >
                {activeTurn.user.initials}
              </span>
              <span className="truncate">
                <span className="font-medium text-accent">@Revoca</span>{" "}
                {reduceMotion ? activeTurn.question : <TypingText text={activeTurn.question} run speed={18} />}
              </span>
            </span>
          ) : (
            <span className="flex-1 text-faint">Message {scene.channel}…</span>
          )}
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-opacity duration-300"
            style={{ background: theme.accent, opacity: active.composerTyping ? 1 : 0.5 }}
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white">
              <path d="M3 11l18-8-8 18-2-7-8-3z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
