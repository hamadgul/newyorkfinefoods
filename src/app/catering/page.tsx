import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MenuSection } from "@/components/sections/menu-section";
import { CTASection } from "@/components/sections/cta-section";
import { QuoteForm } from "@/components/forms/quote-form";
import { cateringMenus } from "@/data/menus";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "NYC's finest catering — restaurant-quality food crafted for your event. Request a custom quote today.",
};

const foodShowcase = [
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    caption: "Plated fine dining",
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    caption: "Seasonal dishes",
  },
  {
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    caption: "Artful presentation",
  },
  {
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
    caption: "Fresh ingredients",
  },
  {
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    caption: "Wood-fired specialties",
  },
  {
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80",
    caption: "Dessert artistry",
  },
];

const steps = [
  {
    step: "01",
    title: "Consultation",
    description: "Tell us about your event, vision, and preferences. We listen.",
  },
  {
    step: "02",
    title: "Custom Proposal",
    description: "We design a food experience tailored to your event and budget.",
  },
  {
    step: "03",
    title: "Tasting",
    description: "Experience your dishes firsthand at a private tasting session.",
  },
  {
    step: "04",
    title: "The Event",
    description: "Sit back and enjoy. We handle every detail, start to finish.",
  },
];

export default function CateringPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-charcoal">
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
            "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
          ].map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={img} alt="" fill className="object-cover" priority />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-[2px]" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
            NYC&apos;s Finest Catering
          </p>
          <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.1] text-ivory md:text-7xl lg:text-8xl">
            Food Worth<br />
            <span className="text-gold">Celebrating</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/70 md:text-xl">
            Restaurant-quality cuisine, crafted by our chefs and delivered
            flawlessly to your event — every plate, every detail, every time.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#quote"
              className="rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              Get a Quote
            </Link>
            <Link
              href="#food"
              className="rounded-full border border-ivory/30 px-10 py-4 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:border-gold hover:text-gold"
            >
              See Our Food
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-ivory/40">
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">2,500+</span>
              Events Catered
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">20–1,000</span>
              Guests
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">15+</span>
              Years
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
      </section>

      {/* ── FOOD SHOWCASE — The star of the page ── */}
      <section id="food" className="bg-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              The Food Speaks for Itself
            </h2>
            <p className="mt-4 text-lg text-charcoal/60">
              Every dish is prepared fresh, plated with care, and served at its peak.
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {foodShowcase.map((item, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-4 left-4 text-sm font-medium text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY OUR FOOD — Story-driven, not menu-driven ── */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Chef at work"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
                Our Approach
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold text-ivory md:text-4xl">
                Crafted by Chefs,<br />Not a Catering Line
              </h2>
              <p className="mt-6 leading-relaxed text-ivory/70">
                Most caterers reheat. We cook. Every dish is prepared fresh on-site
                or in our kitchen hours before service — the same way a top restaurant
                would plate it. That&apos;s the difference your guests taste.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Seasonal, locally-sourced ingredients",
                  "Executive chef on-site at every event",
                  "Restaurant-quality plating and presentation",
                  "Dietary accommodations handled with care",
                  "From 20-person dinners to 1,000-guest galas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ivory/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="#quote"
                className="mt-10 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
              >
                Start Planning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-charcoal md:text-4xl">
            How It Works
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold/50" />
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-gold/20 md:block" />
                )}
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 font-heading text-2xl font-bold text-gold">
                  {s.step}
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-charcoal">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal/60">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE MENUS — Further down, as reference ── */}
      <div id="menus">
        <MenuSection
          title="Sample Menus"
          subtitle="A starting point — every menu is fully customized to your event."
          categories={cateringMenus}
          dark
        />
      </div>

      {/* ── CTA ── */}
      <CTASection
        title="Let's Talk About Your Event"
        subtitle="Tell us what you're envisioning. We'll handle the rest."
        ctaText="Get a Quote"
        ctaHref="#quote"
      />

      {/* ── QUOTE FORM ── */}
      <section id="quote" className="bg-ivory py-24">
        <div className="mx-auto max-w-2xl px-6">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
