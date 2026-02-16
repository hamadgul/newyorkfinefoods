import Link from "next/link";

interface HeroProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  compact?: boolean;
}

export function Hero({
  backgroundImage,
  title,
  subtitle,
  ctaText,
  ctaHref = "/contact",
  compact = false,
}: HeroProps) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${
        compact ? "min-h-[50vh]" : "min-h-[90vh]"
      }`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-12 text-center">
        <div className="mx-auto mb-6 h-px w-20 bg-gold/60 sm:mb-8" />
        <h1
          className={`font-heading font-bold leading-tight text-ivory ${
            compact ? "text-2xl sm:text-3xl md:text-5xl" : "text-3xl sm:text-4xl md:text-6xl lg:text-7xl"
          }`}
        >
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ivory/80 sm:mt-6 md:text-xl">
          {subtitle}
        </p>
        {ctaText && (
          <Link
            href={ctaHref}
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 sm:mt-10 sm:px-10 sm:py-3.5"
          >
            {ctaText}
          </Link>
        )}
        <div className="mx-auto mt-10 h-px w-20 bg-gold/60" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
