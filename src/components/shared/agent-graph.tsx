import { cn } from "@/lib/utils";

const NODES = [
  { id: "ticket", x: 12, y: 24, r: 2.2, label: "Triage" },
  { id: "lead", x: 13, y: 52, r: 2.2, label: "Leads" },
  { id: "doc", x: 15, y: 79, r: 2.2, label: "Docs" },
  { id: "classify", x: 34, y: 31, r: 2.4, label: "Classify" },
  { id: "retrieve", x: 35, y: 66, r: 2.4, label: "Retrieve" },
  { id: "policy", x: 56, y: 22, r: 2.2, label: "Policy" },
  { id: "agent", x: 55, y: 50, r: 4.4, label: "Agent" },
  { id: "eval", x: 58, y: 78, r: 2.2, label: "Eval" },
  { id: "reply", x: 82, y: 27, r: 2.4, label: "Reply" },
  { id: "crm", x: 84, y: 55, r: 2.4, label: "CRM" },
  { id: "handoff", x: 81, y: 80, r: 2.4, label: "Human" },
] as const;

const EDGES = [
  ["ticket", "classify"],
  ["lead", "classify"],
  ["doc", "retrieve"],
  ["classify", "agent"],
  ["retrieve", "agent"],
  ["policy", "agent"],
  ["agent", "reply"],
  ["agent", "crm"],
  ["agent", "handoff"],
  ["eval", "agent"],
  ["reply", "eval"],
  ["crm", "eval"],
] as const;

const ACTIVE_EDGES = [0, 3, 6, 7, 10] as const;

export function AgentGraph({ className }: { className?: string }) {
  const nodeMap = Object.fromEntries(NODES.map((node) => [node.id, node]));

  return (
    <div aria-hidden className={cn("agent-graph relative", className)}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full overflow-visible"
      >
        <defs>
          <filter id="graph-soft-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="1.6" floodColor="oklch(0.18 0 0)" floodOpacity="0.10" />
          </filter>
          <radialGradient id="graph-core" cx="45%" cy="35%" r="70%">
            <stop offset="0%" stopColor="oklch(1 0 0)" />
            <stop offset="70%" stopColor="oklch(0.91 0.045 152)" />
            <stop offset="100%" stopColor="oklch(0.72 0.10 152)" />
          </radialGradient>
        </defs>

        <g className="graph-grid">
          <path d="M18 18v64M38 18v64M58 18v64M78 18v64" />
          <path d="M11 28h78M11 50h78M11 72h78" />
        </g>

        <g>
          {EDGES.map(([from, to], index) => {
            const a = nodeMap[from]!;
            const b = nodeMap[to]!;
            const active = ACTIVE_EDGES.includes(index as (typeof ACTIVE_EDGES)[number]);
            return (
              <path
                key={`${from}-${to}`}
                id={`graph-edge-${index}`}
                d={curvePath(a.x, a.y, b.x, b.y)}
                fill="none"
                stroke={active ? "oklch(0.62 0.166 152 / 0.42)" : "oklch(0.18 0 0 / 0.13)"}
                strokeWidth={active ? "0.72" : "0.56"}
                strokeLinecap="round"
                className={active ? "graph-edge-active" : "graph-edge"}
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            );
          })}
        </g>

        <g>
          {ACTIVE_EDGES.map((edgeIndex, packetIndex) => (
            <circle
              key={edgeIndex}
              r="0.85"
              fill="oklch(0.62 0.166 152 / 0.75)"
              className="graph-packet"
            >
              <animateMotion
                dur={`${5.5 + packetIndex * 0.45}s`}
                begin={`${packetIndex * 0.9}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#graph-edge-${edgeIndex}`} />
              </animateMotion>
            </circle>
          ))}
        </g>

        <g filter="url(#graph-soft-shadow)">
          {NODES.map((node, index) => {
            const isCore = node.id === "agent";
            return (
              <g
                key={node.id}
                className={isCore ? "graph-node-core" : "graph-node"}
                style={{ animationDelay: `${index * 0.18}s` }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isCore ? 9.2 : node.r + 3.4}
                  fill={isCore ? "oklch(0.62 0.166 152 / 0.10)" : "oklch(1 0 0 / 0.82)"}
                  stroke={isCore ? "oklch(0.62 0.166 152 / 0.22)" : "oklch(0.892 0.008 85 / 0.9)"}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={isCore ? "url(#graph-core)" : "oklch(0.62 0.166 152 / 0.72)"}
                  stroke="oklch(1 0 0 / 0.9)"
                  strokeWidth="0.8"
                />
                {isCore ? (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="13.4"
                    fill="none"
                    stroke="oklch(0.62 0.166 152 / 0.14)"
                    strokeWidth="0.8"
                    className="graph-core-ring"
                  />
                ) : null}
              </g>
            );
          })}
        </g>

        <g className="graph-labels">
          {NODES.map((node) => (
            <text
              key={`${node.id}-label`}
              x={node.x}
              y={node.y + (node.id === "agent" ? 15.2 : 8.2)}
              textAnchor="middle"
            >
              {node.label}
            </text>
          ))}
        </g>
      </svg>

      <style>{`
        .agent-graph {
          filter: drop-shadow(0 18px 34px oklch(0.18 0 0 / 0.06));
        }

        .graph-grid path {
          fill: none;
          stroke: oklch(0.18 0 0 / 0.045);
          stroke-width: 0.45;
        }

        .graph-edge-active {
          stroke-dasharray: 3 7;
          animation: graph-flow 8s linear infinite;
        }

        .graph-packet {
          filter: drop-shadow(0 0 3px oklch(0.62 0.166 152 / 0.45));
          animation: graph-packet-fade 6s ease-in-out infinite;
        }

        .graph-node {
          animation: graph-node-breathe 7s ease-in-out infinite;
        }

        .graph-node-core {
          animation: graph-core-breathe 6.5s ease-in-out infinite;
          transform-origin: 55px 50px;
        }

        .graph-core-ring {
          animation: graph-ring 6.5s ease-in-out infinite;
        }

        .graph-labels text {
          fill: oklch(0.412 0 0 / 0.72);
          font: 500 3.1px var(--font-mono-face), ui-monospace, monospace;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        @keyframes graph-flow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -20; }
        }

        @keyframes graph-packet-fade {
          0%, 100% { opacity: 0.24; }
          45%, 65% { opacity: 0.85; }
        }

        @keyframes graph-node-breathe {
          0%, 100% { opacity: 0.78; }
          50% { opacity: 1; }
        }

        @keyframes graph-core-breathe {
          0%, 100% { opacity: 0.88; transform: scale(0.995); }
          50% { opacity: 1; transform: scale(1.018); }
        }

        @keyframes graph-ring {
          0%, 100% { opacity: 0.28; }
          50% { opacity: 0.72; }
        }

        @media (prefers-reduced-motion: reduce) {
          .graph-edge-active,
          .graph-packet,
          .graph-node,
          .graph-node-core,
          .graph-core-ring {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const midX = x1 + dx * 0.5;
  return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}
