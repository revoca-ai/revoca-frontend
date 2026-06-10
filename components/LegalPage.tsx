import Nav from "./Nav";
import Footer from "./Footer";

export type LegalSection = {
  heading: string;
  body: string[];
};

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
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
        <p className="mt-8 text-[15.5px] leading-[1.8] text-body">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-3 text-[19px] font-semibold text-ink">
                {s.heading}
              </h2>
              {s.body.map((p, i) => (
                <p
                  key={i}
                  className="mb-3 text-[15px] leading-[1.8] text-body last:mb-0"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-line bg-panel p-6">
          <p className="text-[14.5px] leading-[1.75] text-body">
            Questions about this policy? Reach us any time at{" "}
            <a
              href="mailto:revoca.ai@gmail.com"
              className="font-medium text-accent transition-colors hover:text-accent-soft"
            >
              revoca.ai@gmail.com
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
