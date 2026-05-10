import * as React from "react";

import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  /** Kept for API compatibility with prior versions; now a no-op. */
  flat?: boolean;
}

/**
 * Workflow Crew mark — a polished gradient orb in the brand greens.
 *
 *           ╭───────╮
 *         ╱           ╲
 *        │  ✺ (gloss)  │
 *        │   ↘ shaded  │     ← radial gradient: light highlight at
 *         ╲           ╱         upper-left → primary green mid →
 *           ╰───────╯           deep ring green at lower-right
 *
 * Three layers, all circular:
 *   1. Outer body: a 3-stop radial gradient that simulates depth.
 *      The light source sits at upper-left; the shadow falls toward
 *      the lower-right. Feels like a single object, not a 2-D fill.
 *   2. Gloss highlight: a soft elongated white-tinted ellipse near
 *      the upper-left, rotated to follow the curvature. Adds gloss.
 *   3. Hairline rim: a near-imperceptible inner stroke at low opacity
 *      that defines the silhouette against light backgrounds without
 *      reading as a separate ring.
 *
 * Built at viewBox 0–40 so it scales cleanly at 16–200px.
 * Gradient IDs are scoped via React.useId so multiple Logo instances
 * never clash on shared <defs> entries.
 */
export function Logo({
  size = 32,
  className,
  flat: _flat,
  ...props
}: LogoProps) {
  void _flat; // kept for API compatibility — no longer used
  const reactId = React.useId();
  const safeId = reactId.replace(/[^A-Za-z0-9_-]/g, "");
  const bodyGradId = `logo-body-${safeId}`;
  const glossGradId = `logo-gloss-${safeId}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="Workflow Crew"
      className={cn("block", className)}
      {...props}
    >
      <defs>
        {/* Sphere body — 3-stop radial gradient with the highlight
            origin offset to upper-left, fading through primary green
            into the deeper ring green near the lower-right edge. */}
        <radialGradient
          id={bodyGradId}
          cx="0.32"
          cy="0.28"
          r="0.85"
          fx="0.32"
          fy="0.28"
        >
          <stop offset="0%" stopColor="oklch(0.78 0.144 152)" />
          <stop offset="55%" stopColor="oklch(0.62 0.166 152)" />
          <stop offset="100%" stopColor="oklch(0.42 0.158 154)" />
        </radialGradient>

        {/* Gloss highlight — soft white-tinted radial that fades to
            transparent. Rendered into a rotated ellipse so it reads
            as a curved highlight following the sphere's surface. */}
        <radialGradient id={glossGradId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.55" />
          <stop offset="60%" stopColor="oklch(1 0 0)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sphere body */}
      <circle cx="20" cy="20" r="18" fill={`url(#${bodyGradId})`} />

      {/* Gloss highlight — elongated, rotated to follow the curvature */}
      <ellipse
        cx="14.5"
        cy="12"
        rx="8"
        ry="3.4"
        fill={`url(#${glossGradId})`}
        transform="rotate(-28 14.5 12)"
      />

      {/* Hairline rim — defines the silhouette on light backgrounds */}
      <circle
        cx="20"
        cy="20"
        r="17.6"
        fill="none"
        stroke="oklch(0.18 0 0)"
        strokeOpacity="0.06"
        strokeWidth="0.8"
      />
    </svg>
  );
}
