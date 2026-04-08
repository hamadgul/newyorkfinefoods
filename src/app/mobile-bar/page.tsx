import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { MobileBarInquiryForm } from "@/components/forms/mobile-bar-inquiry-form";
import { CONTACT_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mobile Bar",
  description:
    "Full-service mobile bar for NYC events. TIPS-certified bartenders, complete setup & breakdown, liquor liability insurance. Open bar packages from $26/person.",
  alternates: {
    canonical: "https://www.newyorkfinefoods.com/mobile-bar",
  },
  openGraph: {
    title: "Mobile Bar Services NYC | New York Fine Foods",
    description:
      "Full-service mobile bar for NYC events. TIPS-certified bartenders, complete setup & breakdown, liquor liability insurance. Open bar packages from $26/person.",
    url: "https://www.newyorkfinefoods.com/mobile-bar",
  },
  twitter: {
    title: "Mobile Bar Services NYC | New York Fine Foods",
    description:
      "Full-service mobile bar for NYC events. TIPS-certified bartenders, complete setup & breakdown, liquor liability insurance. Open bar packages from $26/person.",
  },
};

const mobileBarServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mobile Full Bar Setup NYC",
  description:
    "Full-service mobile bar for NYC events. TIPS-certified bartenders, complete setup & breakdown, liquor liability insurance.",
  provider: {
    "@type": "Organization",
    name: "New York Fine Foods",
    url: "https://www.newyorkfinefoods.com",
  },
  areaServed: "New York City",
  url: "https://www.newyorkfinefoods.com/mobile-bar",
};

const openBarPackages = [
  {
    name: "Beer & Wine Only",
    price: "$26",
    unit: "per person",
    description: "Domestic & craft beers, house red/white/rosé/Prosecco, soft drinks & water.",
    popular: false,
  },
  {
    name: "Standard Open Bar",
    price: "$34",
    unit: "per person",
    description: "Beer & wine plus well liquors, basic mixers, garnishes, and 1–2 signature cocktails.",
    popular: false,
  },
  {
    name: "Premium Open Bar",
    price: "$45",
    unit: "per person",
    description: "Grey Goose, Bombay Sapphire, Jack Daniel's, Maker's Mark and more — craft beers, better wines, and 2–3 signature cocktails.",
    popular: true,
  },
  {
    name: "Ultra-Premium Open Bar",
    price: "$62",
    unit: "per person",
    description: "Patrón, Johnnie Walker Black/Blue, high-end champagne, specialty cocktails, and premium mocktails.",
    popular: false,
  },
];

const dryHirePackages = [
  {
    name: "Basic Service",
    price: "$22",
    unit: "per person",
    description: "Setup, bartender(s), basic mixers, ice, garnishes & disposables.",
    popular: false,
  },
  {
    name: "Standard Service",
    price: "$28",
    unit: "per person",
    description: "Full portable bar setup, premium mixers/fresh juices/syrups, garnishes, and better serviceware.",
    popular: true,
  },
  {
    name: "Premium Service",
    price: "$35",
    unit: "per person",
    description: "Upgraded bar display, specialty garnishes, real glassware option, and custom mocktail/cocktail recipes.",
    popular: false,
  },
];

const whatsIncluded = [
  "Complete portable bar setup (tables with linens, back-bar display, refrigeration/coolers, glassware or high-end disposables, all bar tools)",
  "Professional, TIPS-certified bartenders for the full duration",
  "All alcohol, ice, fresh mixers/juices/syrups, garnishes, straws, napkins & serviceware",
  "Unlimited drinks for the agreed time",
  "Full setup — we arrive 60–90 min early",
  "Complete breakdown, cleanup & removal of all equipment, trash & recyclables",
  "Liquor liability insurance & all necessary permits (Caterer's Alcohol Permit handled by us)",
  "Travel within the NYC metro/tri-state area",
  "Non-alcoholic beverages & mocktails always available",
];

const addOns = [
  { label: "Each additional hour", price: "+$7–$10/person" },
  { label: "Champagne toast", price: "+$7–$9/person" },
  { label: "Real glassware upgrade", price: "+$5–$7/person" },
  { label: "Specialty cocktail station or signature menu", price: "+$5/person" },
  { label: "Late-night espresso martini or shot station", price: "+$9/person" },
];

const barFeatures = [
  "TIPS-Certified Bartenders",
  "Liquor Liability Insurance",
  "Full Setup & Breakdown",
  "Caterer's Alcohol Permit",
  "Premium Glassware Available",
  "Unlimited Drinks",
  "Mocktails Always Available",
  "NYC Metro Coverage",
];

const steps = [
  {
    step: "01",
    title: "Tell Us About Your Event",
    description: "Share your date, location, guest count, and package preference.",
  },
  {
    step: "02",
    title: "We Confirm the Details",
    description: "We finalize everything, lock in your date, and send a custom quote.",
  },
  {
    step: "03",
    title: "We Show Up Ready",
    description: "Our team arrives 60–90 minutes early, full bar set up before your first guest walks in.",
  },
  {
    step: "04",
    title: "You Enjoy the Party",
    description: "TIPS-certified bartenders serve your guests from the first drink to last call.",
  },
];

const idealFor = [
  "Weddings",
  "Corporate Events",
  "Birthday Parties",
  "Cocktail Hours",
  "Holiday Parties",
  "Graduation Parties",
  "Fundraisers",
  "Private Parties",
];

export default function MobileBarPage() {
  return (
    <>
      <JsonLd data={mobileBarServiceSchema} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-charcoal">
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800&q=80",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
            "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
            "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
          ].map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={img} alt="" fill className="object-cover" priority />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-[2px]" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold sm:text-sm">
            Mobile Bar &middot; NYC &amp; Surrounding Areas &middot; Full-Service
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-ivory sm:mt-6 sm:text-5xl md:text-7xl lg:text-8xl">
            The Bar<br />
            <span className="text-gold">Comes to You</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ivory/70 sm:mt-6 md:text-xl">
            TIPS-certified bartenders, premium spirits, and a complete portable bar — delivered and set up at your event anywhere in NYC &amp; the Tri-State Area.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="#book"
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 sm:px-10 sm:py-4"
            >
              Get a Quote
            </Link>
            <Link
              href="#packages"
              className="rounded-full border border-ivory/30 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:border-gold hover:text-gold sm:px-10 sm:py-4"
            >
              View Packages
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-ivory/40 sm:mt-16 sm:gap-8">
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">30+</span>
              Guest Minimum
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">4 Hr</span>
              Minimum Service
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">NYC</span>
              &amp; Tri-State Area
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
      </section>

      {/* ── BAR SHOWCASE ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="relative w-full overflow-hidden rounded-2xl lg:w-1/2">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&q=80"
                  alt="Mobile bar setup at an event"
                  fill
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Full-Service Mobile Bar
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-charcoal md:text-4xl">
                We Bring the Bar to Your Event
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
                Our mobile bar service delivers a complete, professional bar experience right to your venue. We handle everything — from the portable bar setup and premium spirits to the permits, insurance, and cleanup. Our TIPS-certified bartenders serve your guests from start to finish, so you can enjoy every moment of your event.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {barFeatures.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-charcoal/10 bg-charcoal/5 px-4 py-2 text-sm font-medium text-charcoal/80"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <Link
                href="#book"
                className="mt-8 inline-block rounded-full bg-gold px-8 py-3 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="packages" className="bg-white py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="pb-6 text-center">
            <Image
              src="/OGImage.png"
              alt="New York Fine Foods"
              width={600}
              height={150}
              className="mx-auto w-auto max-h-[120px] opacity-80"
            />
            <h2 className="mt-2 font-heading text-5xl font-bold text-charcoal/80 md:text-6xl">
              Mobile Bar Pricing
            </h2>
            <p className="mt-3 text-charcoal/60">www.newyorkfinefoods.com</p>
            <a href={`tel:${CONTACT_PHONE}`} className="block text-charcoal/60 transition-colors hover:text-gold">
              {CONTACT_PHONE}
            </a>
            <p className="mt-3 text-sm font-medium text-charcoal/50">
              4-hour minimum &middot; 30-guest minimum &middot; 20–22% service charge applies
            </p>
            <div className="mt-4 h-px w-full bg-charcoal/15" />
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="font-heading text-xl font-bold text-charcoal border-b-2 border-charcoal pb-2">
                Full Open Bar
                <span className="ml-2 text-sm font-normal text-charcoal/50">(We Supply All Alcohol)</span>
              </h3>
              <div className="mt-4 space-y-4">
                {openBarPackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`relative rounded-xl border p-5 transition-shadow ${
                      pkg.popular
                        ? "border-gold bg-gold/5 shadow-md"
                        : "border-charcoal/10 bg-ivory/40"
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 left-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-charcoal">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-heading text-lg font-bold text-charcoal">{pkg.name}</span>
                      <span className="font-heading text-xl font-bold text-charcoal">{pkg.price}<span className="text-sm font-normal text-charcoal/50">/{pkg.unit.replace("per ", "")}</span></span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{pkg.description}</p>
                  </div>
                ))}
              </div>
              <Link
                href="#book"
                className="mt-6 inline-block w-full rounded-full bg-gold px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
              >
                Get a Quote
              </Link>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-charcoal border-b-2 border-charcoal pb-2">
                Service Only / Dry Hire
                <span className="ml-2 text-sm font-normal text-charcoal/50">(You Supply All Alcohol)</span>
              </h3>
              <div className="mt-4 space-y-4">
                {dryHirePackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`relative rounded-xl border p-5 transition-shadow ${
                      pkg.popular
                        ? "border-gold bg-gold/5 shadow-md"
                        : "border-charcoal/10 bg-ivory/40"
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 left-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-charcoal">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-heading text-lg font-bold text-charcoal">{pkg.name}</span>
                      <span className="font-heading text-xl font-bold text-charcoal">{pkg.price}<span className="text-sm font-normal text-charcoal/50">/{pkg.unit.replace("per ", "")}</span></span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{pkg.description}</p>
                  </div>
                ))}
              </div>
              <Link
                href="#book"
                className="mt-6 inline-block w-full rounded-full bg-gold px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Every Package Includes
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ivory md:text-4xl">
              Everything Taken Care Of
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whatsIncluded.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-ivory/10 bg-ivory/5 p-5"
              >
                <span className="mt-0.5 flex-shrink-0 text-gold">✓</span>
                <p className="text-sm leading-relaxed text-ivory/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADD-ONS & FEES ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
                Customize Your Bar
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-4xl">
                Easy Add-Ons
              </h2>
              <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {addOns.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-charcoal/10 bg-white px-6 py-4 shadow-sm"
                >
                  <span className="text-sm font-medium text-charcoal">{item.label}</span>
                  <span className="flex-shrink-0 font-heading text-base font-bold text-gold">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-charcoal/15 pt-14">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold text-charcoal md:text-3xl">
                Fees &amp; Travel
              </h2>
              <p className="mt-2 text-charcoal/60">No hidden fees — setup, breakdown, and cleanup are always included.</p>
              <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
            </div>
            <div className="mt-10 space-y-3 text-sm text-charcoal/80">
              <div className="flex flex-col gap-1 rounded-xl border border-charcoal/10 bg-white px-6 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span>Setup, breakdown, cleanup &amp; equipment transport</span>
                <span className="font-semibold text-charcoal sm:flex-shrink-0">Included</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-charcoal/10 bg-white px-6 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span>Travel within NYC boroughs or suburbs (≤30 miles)</span>
                <span className="font-semibold text-charcoal sm:flex-shrink-0">Included</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-charcoal/10 bg-white px-6 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span>Travel beyond 30 miles (Long Island, Hudson Valley, NJ/CT)</span>
                <span className="font-semibold text-charcoal sm:flex-shrink-0">$150 flat or $2/mile round-trip</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-charcoal/10 bg-white px-6 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span>Small event (&lt;30 guests) — 5 hours, 1 bartender + full setup/breakdown</span>
                <span className="font-semibold text-charcoal sm:flex-shrink-0">$1,250 flat</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-charcoal/10 bg-white px-6 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span>Additional bartender (determined by guest count)</span>
                <span className="font-semibold text-charcoal sm:flex-shrink-0">$45–$55/hr</span>
              </div>
              <div className="flex flex-col gap-1 rounded-xl border border-gold/30 bg-gold/5 px-6 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <span className="font-medium text-charcoal">Service charge on total (covers staffing, insurance, permits, equipment, fuel)</span>
                <span className="font-semibold text-charcoal sm:flex-shrink-0">20–22%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXAMPLE QUOTE ── */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Real Pricing, No Surprises
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ivory md:text-4xl">
              Example Quote
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>

          <div className="mt-12 rounded-2xl border border-ivory/10 bg-ivory/5 p-8 backdrop-blur-sm">
            <p className="font-heading text-xl font-bold text-gold">
              75 Guests · 5-Hour Premium Open Bar in Brooklyn
            </p>
            <div className="mt-6 space-y-3 text-ivory/80">
              <div className="flex justify-between border-b border-ivory/10 pb-3">
                <span>Bar package — $45 × 75 guests</span>
                <span className="font-semibold text-ivory">$3,375</span>
              </div>
              <div className="flex justify-between border-b border-ivory/10 pb-3">
                <span>Travel / setup / breakdown</span>
                <span className="font-semibold text-ivory">$0 <span className="text-ivory/40 text-sm">(within range)</span></span>
              </div>
              <div className="flex justify-between border-b border-ivory/10 pb-3">
                <span>22% service charge</span>
                <span className="font-semibold text-ivory">$743</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-heading text-lg font-bold text-ivory">Grand Total</span>
                <span className="font-heading text-lg font-bold text-gold">≈ $4,118</span>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-ivory/40">~$55 per person all-in</p>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="#book"
              className="inline-block rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              Get Your Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Simple &amp; Seamless
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ivory md:text-4xl">
              How It Works
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>

          <div className="relative mt-16">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gold/20 md:left-1/2 md:block" />
            <div className="space-y-12 md:space-y-16">
              {steps.map((s, i) => (
                <div
                  key={s.step}
                  className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-charcoal font-heading text-lg font-bold text-gold md:left-1/2 md:-translate-x-1/2">
                    {s.step}
                  </div>
                  <div
                    className={`ml-16 rounded-xl border border-ivory/10 bg-ivory/5 p-6 backdrop-blur-sm md:ml-0 md:w-[calc(50%-3rem)] ${
                      i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <h3 className="font-heading text-xl font-bold text-ivory">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ivory/60">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IDEAL FOR ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Perfect for Any Occasion
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-4xl">
              Ideal For
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>
          <div className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-4">
            {idealFor.map((item) => (
              <span
                key={item}
                className="rounded-full border border-charcoal/10 bg-white px-6 py-3 font-heading text-sm font-semibold text-charcoal shadow-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:shadow-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="book" className="bg-cream py-24">
        <div className="mx-auto max-w-2xl px-6">
          <MobileBarInquiryForm />
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Ready to Book Your Mobile Bar?"
        subtitle="Call us or submit an inquiry and we'll get back to you within 24 hours."
        ctaText="Get in Touch"
        ctaHref="/contact"
      />
    </>
  );
}
