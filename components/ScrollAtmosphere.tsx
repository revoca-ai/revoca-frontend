"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function ScrollAtmosphere() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const auroraOne = useTransform(
    scrollYProgress,
    [0, 0.34, 0.68, 1],
    [
      "rgba(34, 211, 238, 0.18)",
      "rgba(45, 212, 191, 0.14)",
      "rgba(125, 211, 252, 0.16)",
      "rgba(52, 211, 153, 0.12)",
    ],
  );
  const auroraTwo = useTransform(
    scrollYProgress,
    [0, 0.42, 0.76, 1],
    [
      "rgba(14, 116, 144, 0.28)",
      "rgba(15, 23, 42, 0.18)",
      "rgba(8, 145, 178, 0.22)",
      "rgba(20, 184, 166, 0.18)",
    ],
  );
  const ember = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgba(99, 102, 241, 0.1)",
      "rgba(245, 158, 11, 0.08)",
      "rgba(34, 197, 94, 0.08)",
    ],
  );
  const mesh = useMotionTemplate`
    radial-gradient(circle at 16% 14%, ${auroraOne} 0%, transparent 30%),
    radial-gradient(circle at 82% 22%, ${auroraTwo} 0%, transparent 34%),
    radial-gradient(circle at 50% 86%, ${ember} 0%, transparent 38%),
    linear-gradient(180deg, rgba(10, 13, 16, 0.72) 0%, rgba(10, 13, 16, 0.94) 48%, rgba(10, 13, 16, 0.82) 100%)
  `;

  const driftX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const driftY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const counterDriftX = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const counterDriftY = useTransform(scrollYProgress, [0, 1], ["5%", "-8%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0px", "-180px"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], [0.72, 0.5, 0.64, 0.42]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-canvas"
    >
      <motion.div
        className="absolute inset-[-18%] blur-3xl"
        style={{
          background: reduceMotion
            ? "radial-gradient(circle at 18% 18%, rgba(34,211,238,0.14), transparent 30%), radial-gradient(circle at 82% 28%, rgba(14,116,144,0.2), transparent 34%), linear-gradient(180deg, rgba(10,13,16,0.78), rgba(10,13,16,0.94))"
            : mesh,
          opacity: reduceMotion ? 0.58 : glowOpacity,
        }}
      />

      <motion.div
        className="absolute left-[-10%] top-[8%] h-[44rem] w-[44rem] rounded-full border border-accent/10 bg-accent/10 blur-[90px]"
        style={{
          x: reduceMotion ? 0 : driftX,
          y: reduceMotion ? 0 : driftY,
        }}
      />
      <motion.div
        className="absolute bottom-[-22%] right-[-14%] h-[52rem] w-[52rem] rounded-full border border-emerald-300/10 bg-cyan-500/10 blur-[110px]"
        style={{
          x: reduceMotion ? 0 : counterDriftX,
          y: reduceMotion ? 0 : counterDriftY,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          y: reduceMotion ? 0 : gridY,
          backgroundImage:
            "linear-gradient(rgba(151, 168, 184, 0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(151, 168, 184, 0.11) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(ellipse 78% 65% at 50% 18%, black 20%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 65% at 50% 18%, black 20%, transparent 72%)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(10,13,16,0.18)_48%,rgba(10,13,16,0.82)_100%)]" />
      <div className="atmosphere-grain absolute inset-0 opacity-[0.16] mix-blend-soft-light" />
    </div>
  );
}
