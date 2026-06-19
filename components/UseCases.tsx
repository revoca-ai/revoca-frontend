"use client";

import type { ReactNode } from "react";
import FadeIn from "./FadeIn";
import { Container } from "./Section";

type Question = { q: string; stake: string };

type Vertical = {
  id: string;
  team: string;
  tagline: string;
  pain: string;
  icon: ReactNode;
  questions: Question[];
};

const verticals: Vertical[] = [
  {
    id: "engineering",
    team: "Engineering & Platform",
    tagline: "Your codebase's hardest decisions were never written down",
    pain: "When the engineers who made the calls are offline or gone, the reasoning behind your codebase disappears with them.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 6-5 6 5 6" />
        <path d="m16 6 5 6-5 6" />
      </svg>
    ),
    questions: [
      {
        q: "Why was this architecture chosen, and what did we reject?",
        stake: "Re-litigated in every design review once the original authors are gone.",
      },
      {
        q: "What breaks in production if we change this service?",
        stake: "One wrong assumption away from an outage nobody can explain.",
      },
      {
        q: "Has anyone hit this exact error before, and how was it fixed?",
        stake: "Hours of re-debugging a problem your team already solved once.",
      },
      {
        q: "Which critical decisions are blocked on someone who's OOO?",
        stake: "Releases slip by days because the context left on vacation.",
      },
    ],
  },
  {
    id: "product",
    team: "Product & Design",
    tagline: "You're rebuilding things that already failed",
    pain: "Roadmap decisions, killed features, and customer promises are scattered across threads no one revisits before the next planning cycle.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="M14 17.5h7M17.5 14v7" />
      </svg>
    ),
    questions: [
      {
        q: "Why did we kill this feature last year, and would the reasons still hold?",
        stake: "Teams keep rebuilding ideas that already failed, on repeat.",
      },
      {
        q: "What did customers actually ask for before we scoped this?",
        stake: "Roadmaps built on the loudest voice, not the real signal.",
      },
      {
        q: "What did we promise this account, and by when?",
        stake: "Commitments you don't even know exist until they're broken.",
      },
    ],
  },
  {
    id: "sales",
    team: "Sales & Revenue",
    tagline: "The same objection keeps sinking deals",
    pain: "Why deals are won or lost, and what was promised to close them, vanishes the moment a rep changes seats or leaves.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l5-5 4 3 6-7" />
        <path d="M17 8h4v4" />
      </svg>
    ),
    questions: [
      {
        q: "Why did we lose the last three deals in this segment?",
        stake: "A pattern nobody flagged keeps costing you the next one.",
      },
      {
        q: "What was promised to this customer during the sales cycle?",
        stake: "Renewals blow up over commitments made and forgotten.",
      },
      {
        q: "Who has touched this account before, and what happened?",
        stake: "Cold outreach to warm relationships you didn't know you had.",
      },
    ],
  },
  {
    id: "support",
    team: "Customer Success & Support",
    tagline: "You're firefighting the same fire every quarter",
    pain: "Account history, recurring issues, and root causes are buried in tickets and threads no one has time to read before they respond.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.6 9.6 0 0 1-4-.9L3 21l1.9-4A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 1 1 17 0Z" />
      </svg>
    ),
    questions: [
      {
        q: "Has this customer reported this issue before?",
        stake: "Churn risk hiding in a ticket history no one reads.",
      },
      {
        q: "What's the real root cause behind this recurring complaint?",
        stake: "Patching the same symptom while the cause compounds.",
      },
      {
        q: "Which promises to this account are we about to miss?",
        stake: "A renewal lost to a deadline nobody was tracking.",
      },
    ],
  },
  {
    id: "leadership",
    team: "Leadership & Strategy",
    tagline: "You're flying blind across your own org",
    pain: "There's no live view of what's at risk, why bets were made, or what depends on a single person, until it's a problem in the room.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
    questions: [
      {
        q: "What's actually at risk across teams right now?",
        stake: "Surprises in the board meeting your org already knew about.",
      },
      {
        q: "Why did we make this bet, and is the thesis still true?",
        stake: "Strategy drift no one can trace back to a decision.",
      },
      {
        q: "What stalls if this key person leaves tomorrow?",
        stake: "One resignation quietly halting three initiatives.",
      },
    ],
  },
  {
    id: "operations",
    team: "People & Operations",
    tagline: "Onboarding runs on interrupting your best people",
    pain: "Process knowledge and the reasoning behind how you work lives in out-of-date docs and senior heads that get pinged all day.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
        <path d="M16 11.5a2.5 2.5 0 1 0 0-5" />
        <path d="M17.5 14.5c2 .3 3.5 1.6 4 4.5" />
      </svg>
    ),
    questions: [
      {
        q: "How does a new hire get productive without interrupting the whole team?",
        stake: "Weeks of ramp time billed to your most senior people.",
      },
      {
        q: "Where's the process for this, and is it the current version?",
        stake: "Critical ops running on a doc that's six months stale.",
      },
      {
        q: "Why do we do it this way?",
        stake: "No one left can explain the rules everyone still follows.",
      },
    ],
  },
];

function QuestionRow({
  q,
  stake,
  index,
  isLast,
}: Question & {
  index: number;
  isLast: boolean;
}) {
  return (
    <div
      className={`group relative grid gap-4 px-5 py-6 transition-colors duration-300 hover:bg-raise/35 sm:grid-cols-[72px_1fr] sm:px-7 ${
        isLast ? "" : "border-b border-line"
      }`}
    >
      <div className="flex items-center gap-3 sm:block">
        <span className="font-mono text-[11px] text-faint">
          Q{String(index + 1).padStart(2, "0")}
        </span>
        <span className="inline-flex rounded-full border border-accent/20 bg-accent/[0.06] px-2.5 py-1 font-mono text-[11px] font-medium text-accent sm:mt-4">
          @Revoca
        </span>
      </div>

      <div>
        <p className="max-w-[620px] text-[18px] font-medium leading-[1.45] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent-soft">
          {q}
        </p>
        <p className="mt-3 max-w-[560px] text-[13.5px] leading-[1.65] text-faint">
          <span className="text-body">If this stays unanswered: </span>
          {stake}
        </p>
      </div>
    </div>
  );
}

export default function UseCases() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[152px] pb-16 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(151,168,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(151,168,184,0.045) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(ellipse 50% 65% at 50% 0%, rgba(34,211,238,0.08), transparent 70%)",
          }}
        />

        <Container className="relative text-center">
          <FadeIn>
            <p className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
              Use cases
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mx-auto max-w-[760px] text-[clamp(30px,8vw,40px)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[52px]">
              The questions your company{" "}
              <em className="font-serif font-normal italic text-accent-soft">
                can&apos;t afford
              </em>{" "}
              to leave unanswered
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-[600px] text-[16px] leading-[1.75] text-body sm:text-[17px]">
              Every team in your company is sitting on questions that already
              have answers, buried in someone&apos;s head, a stale doc, or a
              thread no one will find again. Here&apos;s what Revoca answers,
              with sources, the moment you ask.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Verticals */}
      {verticals.map((v, i) => (
        <section
          key={v.id}
          id={v.id}
          className={`border-t border-line py-16 sm:py-20 ${
            i % 2 === 1 ? "bg-panel/30" : ""
          }`}
        >
          <Container>
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-[0.9fr_1.55fr]">
              {/* Vertical header */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <FadeIn>
                  <span className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-raise text-accent">
                      {v.icon}
                    </span>
                    <span className="font-mono text-[12px] font-medium text-faint">
                      {String(i + 1).padStart(2, "0")} / {String(verticals.length).padStart(2, "0")}
                    </span>
                  </span>
                </FadeIn>
                <FadeIn delay={0.06}>
                  <h2 className="text-[34px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[42px]">
                    {v.team}
                  </h2>
                </FadeIn>
                <FadeIn delay={0.12}>
                  <p className="mt-3 max-w-[360px] text-[15px] leading-[1.6] text-body">
                    {v.tagline}.
                  </p>
                </FadeIn>
                <FadeIn delay={0.18}>
                  <p className="mt-5 max-w-[390px] border-l border-accent/35 pl-4 text-[14px] leading-[1.65] text-faint">
                    {v.pain}
                  </p>
                </FadeIn>
              </div>

              {/* Questions */}
              <div className="overflow-hidden rounded-2xl border border-line bg-panel/70 shadow-[0_24px_70px_-46px_rgba(0,0,0,0.9)]">
                <div className="flex flex-col gap-3 border-b border-line bg-raise/35 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-faint">
                    Questions Revoca answers
                  </p>
                  <p className="text-[13px] text-faint">
                    Sourced from your company&apos;s actual context
                  </p>
                </div>
                {v.questions.map((question, qi) => (
                  <FadeIn key={question.q} delay={0.08 + qi * 0.07}>
                    <QuestionRow
                      {...question}
                      index={qi}
                      isLast={qi === v.questions.length - 1}
                    />
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
