"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
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
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-4 w-full max-w-sm rounded-xl border border-line bg-panel p-8 text-center shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
      >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="mb-2 text-[18px] font-semibold text-ink">
          You&apos;re on the list
        </h3>
        <p className="mb-1 text-[14px] leading-[1.7] text-body">
          Your beta access link is on its way to
        </p>
        <p className="mb-7 break-all text-[14px] font-medium text-accent">{email}</p>

        <button
          onClick={onClose}
          className="cursor-pointer rounded-lg border border-line px-7 py-2.5 text-[14px] font-medium text-body transition-colors duration-200 hover:border-line-strong hover:text-ink"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}

export default function TryBetaButton({
  location = "unknown",
}: {
  location?: string;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
  const [pendingBeta, setPendingBeta] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      <button
        type="button"
        onClick={handleClick}
        className="cursor-pointer rounded-lg border border-line bg-panel/60 px-7 py-3 text-[15px] font-medium text-body backdrop-blur-sm transition-colors duration-200 hover:border-line-strong hover:text-ink"
      >
        Try the beta
      </button>

      {showSuccess && (
        <BetaSuccessModal email={email} onClose={() => setShowSuccess(false)} />
      )}
    </>
  );
}
