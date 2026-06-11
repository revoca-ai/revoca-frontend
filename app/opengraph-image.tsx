import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const alt =
  "Revoca — The context layer your company runs on. Every decision, every reason, captured and queryable.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 60% 70% at 50% 0%, rgba(34,211,238,0.14), #0a0d10 70%), #0a0d10",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "#22d3ee",
            }}
          />
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: "#f2f6f8",
              letterSpacing: -0.5,
            }}
          >
            Revoca
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#f2f6f8",
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            The context layer
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            <span style={{ color: "#f2f6f8" }}>your company&nbsp;</span>
            <span style={{ color: "#67e8f9", fontStyle: "italic" }}>
              runs on.
            </span>
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 30,
              color: "#9aa7b2",
              lineHeight: 1.5,
              maxWidth: 880,
            }}
          >
            Every decision, every reason, every context — captured, preserved,
            and always one question away.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(151,168,184,0.25)",
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 24, color: "#5d6b77" }}>
            {new URL(SITE_URL).hostname}
          </div>
          <div style={{ fontSize: 24, color: "#5d6b77", fontStyle: "italic" }}>
            The enterprise that never forgets.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
