import FadeIn from "./FadeIn";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-6 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={`mb-12 sm:mb-16 ${centered ? "text-center" : ""}`}>
      <FadeIn>
        <p className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      </FadeIn>
      <FadeIn delay={0.08}>
        <h2 className="text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[40px]">
          {title}
        </h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.16}>
          <p
            className={`mt-4 max-w-[560px] text-[16px] leading-[1.7] text-body ${
              centered ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
