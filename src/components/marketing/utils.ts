"use client";

import * as React from "react";

/**
 * Fades a child in from below the first time it enters the viewport.
 * Pair with `data-fade` and a CSS transition. Stays on screen forever
 * after the first reveal — no twitching on re-entry.
 */
export function useFadeIn<T extends Element = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = React.useRef<T | null>(null);
  // Lazy-init: if we're on a client that lacks IntersectionObserver
  // (very rare), skip the fade and render visible immediately.
  const [visible, setVisible] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return typeof IntersectionObserver === "undefined";
  });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}

/** Counts up to `target` over ~1.2s once visible. */
export function useCounter(
  target: number,
  visible: boolean,
  durationMs = 1200,
) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, visible, durationMs]);

  return value;
}

/** Tracks the cursor position normalized to a target element (0..1). */
export function useCursorWithin(ref: React.RefObject<HTMLElement | null>) {
  const [pos, setPos] = React.useState<{ x: number; y: number }>({
    x: 0.5,
    y: 0.5,
  });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [ref]);

  return pos;
}
