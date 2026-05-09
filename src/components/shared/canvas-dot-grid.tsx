"use client";

import * as React from "react";

/**
 * Subtle animated dot field rendered to a canvas. Sits behind the hero
 * surface to give the dark background depth without leaning on
 * Three.js or large imports.
 *
 * - Static grid of 1px dots at base low opacity.
 * - Pointer proximity highlights nearby dots in the primary blue.
 * - Honors prefers-reduced-motion: skips the highlight loop, draws once.
 * - DPR-aware so the dots stay 1px crisp on retina.
 */
export function CanvasDotGrid({
  className,
  spacing = 28,
  proximity = 140,
  baseAlpha = 0.10,
  peakAlpha = 0.55,
}: {
  className?: string;
  spacing?: number;
  proximity?: number;
  baseAlpha?: number;
  peakAlpha?: number;
}) {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mouseX = -9999;
    let mouseY = -9999;
    let raf = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const proxSq = proximity * proximity;

      for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
          let alpha = baseAlpha;

          if (!reducedMotion) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dSq = dx * dx + dy * dy;
            if (dSq < proxSq) {
              const t = 1 - dSq / proxSq;
              alpha = baseAlpha + t * (peakAlpha - baseAlpha);
            }
          }

          // Brand green (#16A34A ≈ rgb(22, 163, 74)) rendered as rgb
          // so we can vary alpha cheaply per dot. On a true-white bg
          // we need higher alpha — light fights light.
          ctx.fillStyle = `rgba(22, 163, 74, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [spacing, proximity, baseAlpha, peakAlpha]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={
        className ??
        "pointer-events-none absolute inset-0 -z-10 h-full w-full"
      }
    />
  );
}
