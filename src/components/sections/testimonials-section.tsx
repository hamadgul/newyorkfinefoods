import { testimonials } from "@/data/testimonials";
import { FadeIn } from "@/components/ui/fade-in";

export function TestimonialsSection() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Client Reviews
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-5xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-charcoal/55">
              Real feedback from corporate clients and private events across NYC.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-px bg-charcoal/10 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 100} className="bg-cream">
              <div className="p-8 md:p-10">
                <div className="select-none font-heading text-7xl font-bold leading-none text-gold/30">
                  &ldquo;
                </div>
                <p className="mt-2 font-heading text-lg italic leading-relaxed text-charcoal/75">
                  {t.quote}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15">
                    <span className="font-heading text-sm font-bold text-gold">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-bold text-charcoal">{t.name}</p>
                    <p className="truncate text-sm text-charcoal/50">{t.role}</p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                    {t.service}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
