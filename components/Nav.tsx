"use client";

import { useState } from "react";
import posthog from "posthog-js";

const links: { label: string; href: string; external?: boolean }[] = [
  { label: "Problem", href: "#about" },
  { label: "Solution", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Integrations", href: "#integrations" },
  { label: "Roadmap", href: "#roadmap" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(5,5,5,0.88)] backdrop-blur-xl border-b border-[#141414]">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-[100px] py-4 sm:py-5">
        <a href="#" className="font-mono text-sm sm:text-base font-bold tracking-tight">
          <span className="text-[#e87a2a]">&gt;</span>{" "}
          <span className="text-[#eee]">revoca</span>
          <span className="text-[#444]">.</span>
          <span className="text-[#e87a2a]">ai</span>
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
            className="border border-[#e87a2a]/30 px-5 py-2 rounded text-[#e87a2a] hover:bg-[#e87a2a]/10 hover:border-[#e87a2a]/50 transition-all duration-200"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => {
            const next = !open;
            setOpen(next);
            posthog.capture("nav_mobile_menu_toggled", { opened: next });
          }}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`w-5 h-px bg-[#555] transition-all duration-300 ${
              open ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`w-5 h-px bg-[#555] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-px bg-[#555] transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
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
            className="border border-[#e87a2a]/30 px-5 py-2 rounded text-[#e87a2a] text-center hover:bg-[#e87a2a]/10 transition-all mt-2"
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}
