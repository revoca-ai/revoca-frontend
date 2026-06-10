"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import posthog from "posthog-js";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

const links: { label: string; href: string }[] = [
  { label: "Product", href: "/#product" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Integrations", href: "/#integrations" },
  { label: "Security", href: "/#security" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "FAQ", href: "/#faq" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Revoca%20logo.svg"
            alt="Revoca"
            className="h-[26px] w-[26px] rounded-full"
          />
          <span className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
            Revoca
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-body transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button
                onClick={() => posthog.capture("nav_sign_in_clicked")}
                className="cursor-pointer px-3 py-2 text-[14px] font-medium text-body transition-colors duration-200 hover:text-ink"
              >
                Log in
              </button>
            </SignInButton>
          ) : (
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          )}
          <a
            href="https://calendly.com/revoca-ai/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("nav_book_call_clicked", { location: "nav_desktop" })}
            className="rounded-lg bg-accent px-4 py-2 text-[14px] font-semibold text-[#04181d] transition-colors duration-200 hover:bg-accent-soft"
          >
            Book a demo
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          {isSignedIn && (
            <UserButton appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
          )}
          <button
            onClick={() => {
              const next = !open;
              setOpen(next);
              posthog.capture("nav_mobile_menu_toggled", { opened: next });
            }}
            className="flex flex-col gap-[5px] p-2"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span
              className={`h-px w-5 bg-ink transition-all duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-ink transition-all duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-body transition-colors hover:bg-raise hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 flex items-center gap-3 border-t border-line pt-4">
                {!isSignedIn && (
                  <SignInButton mode="modal">
                    <button className="flex-1 cursor-pointer rounded-lg border border-line py-2.5 text-[14px] font-medium text-body transition-colors hover:border-line-strong hover:text-ink">
                      Log in
                    </button>
                  </SignInButton>
                )}
                <a
                  href="https://calendly.com/revoca-ai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    posthog.capture("nav_mobile_book_call_clicked", { location: "nav_mobile" })
                  }
                  className="flex-1 rounded-lg bg-accent py-2.5 text-center text-[14px] font-semibold text-[#04181d] transition-colors hover:bg-accent-soft"
                >
                  Book a demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
