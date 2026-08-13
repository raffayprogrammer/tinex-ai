import { ImageResponse } from "next/og";
import { roster } from "@/content/site";

/**
 * The 1200x630 card that appears whenever the link is pasted into WhatsApp,
 * LinkedIn, iMessage or Slack. Generated at build time from the same content
 * and palette as the site, so it can never drift out of sync with the roster.
 *
 * Note: this renders through Satori, which supports flexbox but NOT CSS grid,
 * and needs explicit `display: flex` on any element with multiple children.
 */
export const alt =
  "Tinex.AI — AI employees for landscaping and hardscaping crews";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0E0D",
          backgroundImage:
            "radial-gradient(900px circle at 30% 0%, rgba(217,164,65,0.20), transparent 55%), radial-gradient(700px circle at 90% 90%, rgba(78,158,127,0.12), transparent 55%)",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="34" height="38" viewBox="0 0 120 132" fill="none">
            <path
              d="M16 10 H104 V30 H74 V44 H46 V30 H16 Z"
              stroke="#D9A441"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d="M46 44 H74 L104 122 H76 L60 82 L44 122 H16 Z"
              stroke="#D9A441"
              strokeWidth="6"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              color: "#F2F0EA",
              fontWeight: 700,
            }}
          >
            TINEX
            <span style={{ color: "#D9A441", letterSpacing: 0 }}>.AI</span>
          </div>
        </div>

        {/* the pitch */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: -3,
              color: "#F2F0EA",
              fontWeight: 700,
              maxWidth: 940,
            }}
          >
            Hire the function. Skip the person.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#B6BCB5",
              maxWidth: 820,
            }}
          >
            Named AI employees for landscaping and hardscaping crews — from
            $497/mo against a $4,000–$6,500 office hire.
          </div>
        </div>

        {/* the roster, as name badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(242,240,234,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {roster.map((agent) => (
              <div
                key={agent.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 92,
                  height: 44,
                  borderRadius: 999,
                  border: "1px solid rgba(242,240,234,0.14)",
                  background: "rgba(242,240,234,0.05)",
                  color: "#B6BCB5",
                  fontSize: 21,
                }}
              >
                {agent.name}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#5B645D", letterSpacing: 2 }}>
            TINEX.AI
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
