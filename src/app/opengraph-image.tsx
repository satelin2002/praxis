import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Workflow Crew — AI workflow automation for modern teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            "radial-gradient(900px circle at 25% 20%, rgba(22,163,74,0.10), transparent 55%), #FFFFFF",
          color: "#111111",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 40 40" fill="none">
            <defs>
              <radialGradient
                id="og-sphere-body"
                cx="0.32"
                cy="0.28"
                r="0.85"
                fx="0.32"
                fy="0.28"
              >
                <stop offset="0%" stopColor="#5BD97C" />
                <stop offset="55%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#15803D" />
              </radialGradient>
              <radialGradient id="og-sphere-gloss" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="20" cy="20" r="18" fill="url(#og-sphere-body)" />
            <ellipse
              cx="14.5"
              cy="12"
              rx="8"
              ry="3.4"
              fill="url(#og-sphere-gloss)"
              transform="rotate(-28 14.5 12)"
            />
            <circle
              cx="20"
              cy="20"
              r="17.6"
              fill="none"
              stroke="#121212"
              strokeOpacity="0.06"
              strokeWidth="0.8"
            />
          </svg>
          <span
            style={{
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: -0.8,
            }}
          >
            Workflow Crew
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 980,
          }}
        >
          <span
            style={{
              fontSize: 16,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#16A34A",
              fontWeight: 600,
            }}
          >
            AI workflow automation
          </span>
          <h1
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              fontWeight: 700,
              margin: 0,
              color: "#111111",
            }}
          >
            Automate the work eating your team&rsquo;s time.
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#525252",
            fontSize: 22,
            borderTop: "1px solid #E0DCD0",
            paddingTop: 28,
          }}
        >
          <span>AI agents and workflow automations, deployed in weeks.</span>
          <span
            style={{
              fontFamily: "monospace",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontSize: 16,
            }}
          >
            tryworkflowcrew.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
