import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  eyebrow?: string;
  ctaText?: string;
  ctaHref?: string;
  compact?: boolean;
}

export function Hero({
  backgroundImage,
  title,
  subtitle,
  eyebrow,
  ctaText,
  ctaHref = "/contact",
  compact = false,
}: HeroProps) {
  const isExternal = backgroundImage.startsWith("http");

  return (
    <section
      className={`relative overflow-hidden bg-charcoal ${
        compact ? "min-h-[55vh]" : "min-h-[70vh] md:min-h-screen"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {isExternal ? (
          <div
            className="absolute inset-0 scale-105 bg-contain bg-center bg-no-repeat md:bg-cover"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-contain md:object-cover"
            priority
          />
        )}
      </div>
      <div className="absolute inset-0 bg-charcoal/75 backdrop-blur-[1px]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center px-6 text-center ${
          compact ? "min-h-[55vh] justify-center pt-24 pb-12" : "min-h-[70vh] md:min-h-screen justify-start pt-32 md:pt-64 pb-12"
        }`}
      >
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold sm:text-sm">
            {eyebrow}
          </p>
        )}
        <h1
          className={`font-heading font-bold leading-[1.1] text-ivory ${
            eyebrow ? "mt-4 sm:mt-6" : ""
          } ${
            compact
              ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              : "text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
          }`}
        >
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ivory/70 sm:mt-6 md:text-xl">
          {subtitle}
        </p>
        {ctaText && (
          <Link
            href={ctaHref}
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 sm:mt-10 sm:px-10 sm:py-4"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
