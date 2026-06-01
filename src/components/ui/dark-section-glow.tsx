/**
 * Decorative red-on-black glow treatment for dark (bg-charcoal) sections.
 * Renders glowing brand-red orbs, a subtle diagonal texture, and an oversized
 * brand "×" watermark. Purely presentational — drop it as the first child of a
 * `relative overflow-hidden` section and keep content in a `relative` wrapper.
 */
export function DarkSectionGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Glowing orbs */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      {/* Diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #C8102E 0px, #C8102E 1px, transparent 0px, transparent 50%)",
          backgroundSize: "10px 10px",
        }}
      />
      {/* Brand X watermark */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 select-none font-heading text-[220px] font-bold leading-none text-gold/[0.04]">
        ×
      </div>
    </div>
  );
}
