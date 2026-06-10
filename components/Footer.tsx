import Link from "next/link";

const columns: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/#product" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Capabilities", href: "/#capabilities" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Security", href: "/#security" },
      { label: "Roadmap", href: "/#roadmap" },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "Book a demo",
        href: "https://calendly.com/revoca-ai/30min",
        external: true,
      },
      {
        label: "Vision deck",
        href: "https://www.notion.so/Revoca-The-Context-Layer-for-the-Companies-44007ae8743d468bad2a1c7fb7af6efb?source=copy_link",
        external: true,
      },
      { label: "Contact", href: "mailto:revoca.ai@gmail.com" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Beta on Telegram", href: "https://t.me/RevokaBetaBot", external: true },
      { label: "GitHub", href: "https://github.com/revoca-ai", external: true },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel/40">
      <div className="mx-auto w-full max-w-[1120px] px-6 py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
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
            <p className="mt-4 max-w-[260px] text-[14px] leading-[1.7] text-faint">
              The context layer for the enterprise. Every decision, every
              reason — captured and queryable.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://github.com/revoca-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-faint transition-colors duration-200 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://t.me/RevokaBetaBot"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="text-faint transition-colors duration-200 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>
              <a
                href="mailto:revoca.ai@gmail.com"
                aria-label="Email"
                className="text-faint transition-colors duration-200 hover:text-ink"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px] fill-none stroke-current"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-faint">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-[14px] text-body transition-colors duration-200 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-[13px] text-faint">
            &copy; {new Date().getFullYear()} Revoca AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              style={{ animation: "status-pulse 2.4s ease-in-out infinite" }}
            />
            <span className="font-mono text-[12px] text-faint">
              All systems operational
            </span>
          </div>
          <p className="text-[13px] italic text-faint font-serif">
            The enterprise that never forgets.
          </p>
        </div>
      </div>
    </footer>
  );
}
