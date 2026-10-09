import { testimonials, type Testimonial } from "@/data/testimonials";
import { FadeIn } from "@/components/ui/fade-in";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-charcoal/8 bg-white p-7 shadow-sm">
      {/* Watermark quote mark */}
      <span className="pointer-events-none absolute -top-3 -left-1 select-none font-heading text-[96px] font-bold leading-none text-gold/[0.08]">
        &ldquo;
      </span>
      {/* Quote — no star rating: there is no rating data behind these quotes */}
      <p className="relative break-words text-base italic leading-relaxed text-charcoal/75">
        {t.quote}
      </p>
      {/* Author */}
      <div className="mt-6 flex min-w-0 items-center gap-3 border-t border-charcoal/8 pt-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15">
          <span className="font-heading text-sm font-bold text-gold">
            {t.name.charAt(0)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading font-bold text-charcoal">{t.name}</p>
          <p className="truncate text-sm text-charcoal/50">{t.role}</p>
        </div>
        <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold">
          {t.service}
        </span>
      </div>
    </div>
  );
}

interface TestimonialsSectionProps {
  /** Filter to a single service (e.g. "Pizza Truck"). Omit to show all. */
  service?: string;
  eyebrow?: string;
  heading?: string;
  subtext?: string;
}

export function TestimonialsSection({
  service,
  eyebrow = "Client Reviews",
  heading = "What Our Clients Say",
  subtext = "Real feedback from corporate clients and private events across NYC.",
}: TestimonialsSectionProps = {}) {
  const items = service
    ? testimonials.filter((t) => t.service === service)
    : testimonials;

  return (
    <section className="overflow-hidden bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-5xl">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-charcoal/60">
              {subtext}
            </p>
          </div>
        </FadeIn>

        {/* Mobile: horizontal scroll-snap carousel */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((t) => (
            <div key={t.name} className="w-[82vw] shrink-0 snap-start sm:w-[55vw]">
              <TestimonialCard t={t} />
            </div>
          ))}
          {/* Trailing spacer so last card doesn't flush right */}
          <div className="w-2 shrink-0" aria-hidden />
        </div>

        {/* Desktop: true two-column masonry stagger */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 md:items-start">
          {/* Left column */}
          <div className="space-y-6">
            {items.filter((_, i) => i % 2 === 0).map((t, i) => (
              <FadeIn key={t.name} delay={i * 150}>
                <TestimonialCard t={t} />
              </FadeIn>
            ))}
          </div>
          {/* Right column — offset down for stagger */}
          <div className="mt-10 space-y-6">
            {items.filter((_, i) => i % 2 === 1).map((t, i) => (
              <FadeIn key={t.name} delay={i * 150 + 100}>
                <TestimonialCard t={t} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
