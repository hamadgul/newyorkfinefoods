import Link from "next/link";
import { DarkSectionGlow } from "@/components/ui/dark-section-glow";

interface CTASectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref?: string;
  dark?: boolean;
}

export function CTASection({
  title,
  subtitle,
  ctaText,
  ctaHref = "/contact",
  dark = true,
}: CTASectionProps) {
  return (
    <section
      className={`relative overflow-hidden py-28 ${dark ? "bg-charcoal text-ivory" : "bg-cream text-charcoal"}`}
    >
      {dark && <DarkSectionGlow />}
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto mb-6 h-px w-16 bg-gold/40" />
        <h2 className="font-heading text-3xl font-bold md:text-5xl">{title}</h2>
        <p
          className={`mt-5 text-lg leading-relaxed ${dark ? "text-ivory/70" : "text-charcoal/70"}`}
        >
          {subtitle}
        </p>
        <Link
          href={ctaHref}
          className="mt-10 inline-block rounded-full bg-gold px-10 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}
