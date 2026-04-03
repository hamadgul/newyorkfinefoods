import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-charcoal/60">
            Hear from clients who&apos;ve experienced our catering and pizza truck services.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <p className="text-charcoal/80 leading-relaxed italic">
                <span className="font-heading text-2xl leading-none text-gold/40">&ldquo;</span>
                {t.quote}
                <span className="font-heading text-2xl leading-none text-gold/40">&rdquo;</span>
              </p>
              <div className="mt-6 flex items-center gap-4 border-t border-charcoal/10 pt-5">
                <div className="h-10 w-10 rounded-full bg-gold/15 flex items-center justify-center">
                  <span className="font-heading text-sm font-bold text-gold">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-charcoal">
                    {t.name}
                  </p>
                  <p className="text-sm text-charcoal/50">
                    {t.role} — {t.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
