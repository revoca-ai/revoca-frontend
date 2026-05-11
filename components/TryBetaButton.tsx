"use client";

import { useEffect, useRef, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { motion, useMotionValue, useSpring } from "framer-motion";
import posthog from "posthog-js";

function BetaSuccessModal({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#080808] border border-[#1a1a1a] rounded-xl p-8 max-w-sm w-full mx-4 text-center shadow-[0_0_80px_rgba(34,211,238,0.08)]"
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-[#22d3ee]/10" />

        <div className="w-14 h-14 rounded-full border border-[#22d3ee]/30 flex items-center justify-center mx-auto mb-5 bg-[#22d3ee]/5">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#22d3ee]"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="font-mono text-lg font-bold text-[#f6feff] mb-2">
          You&apos;re on the list!
        </h3>
        <p className="font-mono text-[13px] text-[#555] leading-[1.75] mb-1">
          Beta access link has been mailed to
        </p>
        <p className="font-mono text-[13px] text-[#22d3ee] mb-6 break-all">
          {email}
        </p>

        <button
          onClick={onClose}
          className="border border-[#22d3ee]/30 px-7 py-2.5 font-mono text-[12px] text-[#22d3ee] rounded hover:bg-[#22d3ee]/8 hover:border-[#22d3ee]/50 transition-all duration-200"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}

export default function TryBetaButton({
  magnetic = false,
  location = "unknown",
}: {
  magnetic?: boolean;
  location?: string;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
  const [pendingBeta, setPendingBeta] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.12);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.18);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const callBetaApi = () => {
    const name =
      user?.fullName ||
      [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
      "";
    const email = user?.emailAddresses?.[0]?.emailAddress || "";

    posthog.capture("try_beta_clicked", { location, email });

    fetch("/api/beta-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    }).catch(() => {});

    setShowSuccess(true);
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && pendingBeta) {
      setPendingBeta(false);
      callBetaApi();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn, pendingBeta]);

  const handleClick = () => {
    if (!isLoaded) return;
    if (isSignedIn) {
      callBetaApi();
    } else {
      setPendingBeta(true);
      openSignIn({ fallbackRedirectUrl: window.location.href });
    }
  };

  const email = user?.emailAddresses?.[0]?.emailAddress || "";

  return (
    <>
      <motion.button
        ref={ref}
        type="button"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={handleClick}
        style={magnetic ? { x: sx, y: sy } : {}}
        className="inline-block border border-[#1e1e1e] bg-[#050505]/40 backdrop-blur-sm px-10 py-3.5 font-mono text-[13px] text-[#aaa] rounded hover:border-[#22d3ee]/30 hover:text-[#fff] transition-colors duration-300 cursor-pointer"
      >
        Try the Beta →
      </motion.button>

      {showSuccess && (
        <BetaSuccessModal email={email} onClose={() => setShowSuccess(false)} />
      )}
    </>
  );
}
