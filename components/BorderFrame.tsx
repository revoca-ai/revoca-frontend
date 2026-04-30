"use client";

export default function BorderFrame() {
  return (
    <>
      {/* Top/bottom animated gradient lines */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #1a1008 20%, #22d3ee40 50%, #1a1008 80%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "border-slide 6s ease-in-out infinite",
            boxShadow: "0 0 8px rgba(34,211,238,0.04), 0 0 20px rgba(34,211,238,0.02)",
          }}
        />
        {/* Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #1a1008 20%, #22d3ee40 50%, #1a1008 80%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "border-slide 6s ease-in-out infinite reverse",
            boxShadow: "0 0 8px rgba(34,211,238,0.04), 0 0 20px rgba(34,211,238,0.02)",
          }}
        />
      </div>

      {/* Left vertical line with traveling dot */}
      <div className="fixed top-0 left-10 w-px h-screen z-[49] pointer-events-none hidden lg:block">
        <div
          className="absolute top-0 left-0 w-px h-full"
          style={{
            background: "linear-gradient(180deg, transparent 0%, #1a1a1a 20%, #1a1a1a 80%, transparent 100%)",
          }}
        />
        <div
          className="absolute -left-[2px] w-[5px] h-[60px] rounded-sm"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(34,211,238,0.3), transparent)",
            boxShadow: "0 0 6px rgba(34,211,238,0.15), 0 0 15px rgba(34,211,238,0.06)",
            animation: "dot-travel 5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Right vertical line with traveling dot */}
      <div className="fixed top-0 right-10 w-px h-screen z-[49] pointer-events-none hidden lg:block">
        <div
          className="absolute top-0 left-0 w-px h-full"
          style={{
            background: "linear-gradient(180deg, transparent 0%, #1a1a1a 20%, #1a1a1a 80%, transparent 100%)",
          }}
        />
        <div
          className="absolute -left-[2px] w-[5px] h-[60px] rounded-sm"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(34,211,238,0.3), transparent)",
            boxShadow: "0 0 6px rgba(34,211,238,0.15), 0 0 15px rgba(34,211,238,0.06)",
            animation: "dot-travel 5s ease-in-out infinite -2.5s",
          }}
        />
      </div>

      {/* Corner accents */}
      {[
        { pos: "top-0 left-0", transform: "" },
        { pos: "top-0 right-0", transform: "scaleX(-1)" },
        { pos: "bottom-0 left-0", transform: "scaleY(-1)" },
        { pos: "bottom-0 right-0", transform: "scale(-1)" },
      ].map((corner, i) => (
        <div
          key={i}
          className={`fixed ${corner.pos} z-50 pointer-events-none`}
          style={{ transform: corner.transform }}
        >
          <div
            className="absolute top-0 left-0 w-20 h-px"
            style={{ background: "linear-gradient(90deg, #22d3ee33, transparent)" }}
          />
          <div
            className="absolute top-0 left-0 w-px h-20"
            style={{ background: "linear-gradient(180deg, #22d3ee33, transparent)" }}
          />
        </div>
      ))}
    </>
  );
}
