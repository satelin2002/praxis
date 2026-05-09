/**
 * Soft green halo behind the hero. On the white surface, full radial
 * blooms wash out the page — so this is a single faint wash,
 * deliberately understated. Restraint is the brief.
 */
export function BackgroundOrbs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
    >
      <div
        className="absolute -top-32 left-1/2 size-144 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.62 0.166 152 / 0.12), transparent)",
        }}
      />
    </div>
  );
}
