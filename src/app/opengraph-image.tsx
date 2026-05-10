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
            <path
              d="M24 8 L8 8 L8 24"
              stroke="#121212"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="miter"
              strokeOpacity="0.94"
            />
            <circle cx="14.6" cy="14.6" r="2.4" fill="#16A34A" />
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
