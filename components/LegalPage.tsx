import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { DPO_EMAIL, DPO_NAME } from "@/lib/compliance";

export type LegalSection = {
  heading: string;
  body: ReactNode[];
};

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
  contactLabel = "Questions about this policy?",
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
  contactLabel?: string;
}) {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-[760px] px-6 pb-28 pt-[152px]">
        <p className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
          Legal
        </p>
        <h1 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[44px]">
          {title}
        </h1>
        <p className="mt-3 text-[14px] text-faint">Last updated: {updated}</p>
        <div className="mt-8 text-[15.5px] leading-[1.8] text-body">{intro}</div>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-3 text-[19px] font-semibold text-ink">
                {s.heading}
              </h2>
              {s.body.map((block, i) => (
                <div
                  key={i}
                  className="mb-3 text-[15px] leading-[1.8] text-body last:mb-0 [&_a]:font-medium [&_a]:text-accent [&_a]:transition-colors [&_a]:hover:text-accent-soft [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2"
                >
                  {block}
                </div>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-14 space-y-4 rounded-xl border border-line bg-panel p-6">
          <p className="text-[14.5px] leading-[1.75] text-body">
            {contactLabel} Contact our{" "}
            <strong className="font-medium text-ink">Data Protection Officer</strong> (
            {DPO_NAME}) at{" "}
            <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a>.
          </p>
          <p className="text-[14px] leading-[1.7] text-faint">
            To withdraw cookie consent or change your preferences, use{" "}
            <strong className="font-medium text-body">Manage consent</strong> in
            the site footer.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
