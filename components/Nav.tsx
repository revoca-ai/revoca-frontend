"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const links: { label: string; href: string; external?: boolean }[] = [
  { label: "Problem", href: "#about" },
  { label: "Solution", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Integrations", href: "#integrations" },
  { label: "Roadmap", href: "#roadmap" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(5,5,5,0.88)] backdrop-blur-xl border-b border-[#141414]">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-[100px] py-4 sm:py-5">
        <a
          href="#"
          className="font-mono text-sm sm:text-base font-bold tracking-tight flex items-center gap-2 group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Revoca%20logo.svg"
            alt="Revoca"
            className="w-[22px] h-[22px] rounded-full"
          />
          <span className="text-[#eee]">revoca</span>
          <span className="text-[#444]">.</span>
          <span className="text-[#22d3ee]">ai</span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7 font-mono text-xs">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[#555] hover:text-[#ccc] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.notion.so/Revoca-The-Context-Layer-for-the-Companies-44007ae8743d468bad2a1c7fb7af6efb?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("nav_full_vision_clicked", { location: "nav_desktop" })}
            className="text-[#333] hover:text-[#666] transition-colors duration-200"
          >
            Full Vision ↗
          </a>
          <a
            href="https://calendly.com/revoca-ai/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("nav_book_call_clicked", { location: "nav_desktop" })}
            className="border border-[#22d3ee]/30 px-5 py-2 rounded text-[#22d3ee] hover:bg-[#22d3ee]/10 hover:border-[#22d3ee]/50 transition-all duration-200"
          >
            Book a Call
          </a>

          {/* Auth */}
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button
                  onClick={() => posthog.capture("nav_sign_in_clicked")}
                  className="font-mono text-xs text-[#666] hover:text-[#ccc] transition-colors duration-200 cursor-pointer"
                >
                  Log in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  onClick={() => posthog.capture("nav_sign_up_clicked")}
                  className="font-mono text-xs border border-[#222] px-4 py-2 rounded text-[#888] hover:border-[#22d3ee]/30 hover:text-[#ccc] transition-all duration-200 cursor-pointer"
                >
                  Sign up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          {isSignedIn && (
            <UserButton appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
          )}
          <button
            onClick={() => {
              const next = !open;
              setOpen(next);
              posthog.capture("nav_mobile_menu_toggled", { opened: next });
            }}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`w-5 h-px bg-[#555] transition-all duration-300 ${open ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`w-5 h-px bg-[#555] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`w-5 h-px bg-[#555] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[#111] px-6 py-6 flex flex-col gap-4 font-mono text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[#555] hover:text-[#ccc] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.notion.so/Revoca-The-Context-Layer-for-the-Companies-44007ae8743d468bad2a1c7fb7af6efb?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#444] hover:text-[#777] transition-colors"
          >
            Full Vision ↗
          </a>
          <a
            href="https://calendly.com/revoca-ai/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("nav_mobile_book_call_clicked", { location: "nav_mobile" })}
            className="border border-[#22d3ee]/30 px-5 py-2 rounded text-[#22d3ee] text-center hover:bg-[#22d3ee]/10 transition-all mt-2"
          >
            Book a Call
          </a>
          {!isSignedIn && (
            <div className="flex gap-3 pt-1">
              <SignInButton mode="modal">
                <button className="flex-1 border border-[#222] py-2 rounded font-mono text-xs text-[#777] hover:border-[#444] hover:text-[#ccc] transition-all cursor-pointer">
                  Log in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="flex-1 border border-[#22d3ee]/25 py-2 rounded font-mono text-xs text-[#22d3ee] hover:bg-[#22d3ee]/10 transition-all cursor-pointer">
                  Sign up
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
