import * as React from "react";

import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  /** Kept for API compatibility with prior versions; now a no-op. */
  flat?: boolean;
}

/**
 * Buildroom mark — a top-left corner bracket in near-black with a
 * single live-green dot inside the bracket.
 *
 *     ┏━━━━
 *     ┃  ●
 *     ┃
 *
 * Two strokes (top + left) meeting at a mitred corner — reads as the
 * corner of a frame / room / build site without being literal. The
 * dot anchors it visually and doubles as a "live" signal we can
 * reuse in the product UI later. Two colours: near-black structure,
 * green spark — single-color marks felt unfinished, gradients felt
 * overdesigned. This sits in the middle.
 *
 * Built at viewBox 0–40 so it scales cleanly at 16–200px.
 */
export function Logo({
  size = 32,
  className,
  flat: _flat,
  ...props
}: LogoProps) {
  void _flat; // kept for API compatibility — no longer used

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="Buildroom"
      className={cn("block", className)}
      {...props}
    >
      {/* Top + left stroke meeting at a mitred corner. The path
          starts at the right end of the top stroke, runs left to the
          corner at (8,8), then drops down to the bottom of the left
          stroke. Round end-caps soften the open ends; the corner
          stays mitred for the architectural read. */}
      <path
        d="M24 8 L8 8 L8 24"
        stroke="oklch(0.18 0 0)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeOpacity="0.94"
      />

      {/* Live-green dot inside the corner. Positioned diagonally
          inset from the corner so it reads as "inside the frame"
          rather than touching the strokes. */}
      <circle
        cx="14.6"
        cy="14.6"
        r="2.4"
        fill="oklch(0.62 0.166 152)"
      />
    </svg>
  );
}
