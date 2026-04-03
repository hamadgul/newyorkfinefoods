import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LazyVideo } from "@/components/ui/lazy-video";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { CONTACT_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "New York Fine Foods catering menu — hot trays, salads, party heros, and more. Call to book.",
  alternates: {
    canonical: "https://www.newyorkfinefoods.com/catering",
  },
  openGraph: {
    title: "Catering Menu | New York Fine Foods",
    description:
      "New York Fine Foods catering menu — hot trays, salads, party heros, and more. Call to book.",
    url: "https://www.newyorkfinefoods.com/catering",
  },
  twitter: {
    title: "Catering Menu | New York Fine Foods",
    description:
      "New York Fine Foods catering menu — hot trays, salads, party heros, and more. Call to book.",
  },
};

const cateringServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "NYC Catering Services",
  description: "New York Fine Foods catering — hot trays, salads, party heros, and more.",
  provider: {
    "@type": "Organization",
    name: "New York Fine Foods",
    url: "https://www.newyorkfinefoods.com",
  },
  areaServed: "New York City",
  url: "https://www.newyorkfinefoods.com/catering",
};

const foodShowcase: { src: string; type: "image" | "video"; caption: string }[] = [
  { src: "/catering/1.jpg", type: "image", caption: "Neopolitan Personal Pizza" },
  { src: "/catering/3.mp4", type: "video", caption: "No One Does Pizza Like Us" },
  { src: "/catering/2.jpg", type: "image", caption: "Did Someone Order Sandwiches?" },
  { src: "/catering/4.mp4", type: "video", caption: "The Best Canoli's period." },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", type: "image", caption: "Restaurant-quality plating" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", type: "image", caption: "Fresh ingredients" },
];

const hotTrays: { name: string; half: string; full: string; note?: string }[] = [
  { name: "Baked Ziti", half: "$50", full: "$90" },
  { name: "Rigatoni Bolognese", half: "$60", full: "$100" },
  { name: "Penne Ala Vodka", half: "$50", full: "$90" },
  { name: "Chicken Parmigiana", half: "$70", full: "$120" },
  { name: "Chicken Francaise", half: "$70", full: "$120" },
  { name: "Chicken Marsala", half: "$70", full: "$120" },
  { name: "Eggplant Parmigiana", half: "$60", full: "$90" },
  { name: "Eggplant Rollatini", half: "$60", full: "$90" },
  { name: "Sausage & Peppers", half: "$60", full: "$100" },
  { name: "Tray of Meatballs", half: "$60", full: "$90", note: "Add Tray of Spaghetti +$30" },
  { name: "Shrimp Francaise", half: "$80", full: "$120" },
  { name: "Fried Shrimp", half: "$75", full: "$130" },
  { name: "Chicken Fingers", half: "$60", full: "$110" },
];

const tossedSalads: { name: string; half: string; full: string; note?: string }[] = [
  { name: "Tossed Salad", half: "$30", full: "$50", note: "Add Grilled Chicken, Chicken Salad, Tuna Salad +$10" },
  { name: "Antipasto Salad", half: "$40", full: "$60" },
  { name: "Chef Salad", half: "$40", full: "$60" },
  { name: "Caesar Salad", half: "$30", full: "$50", note: "Add Grilled Chicken +$10" },
];

const partyHeroSizes = [
  { size: "2 Ft.", serves: "8 people" },
  { size: "3 Ft.", serves: "10 people" },
  { size: "4 Ft.", serves: "14 people" },
  { size: "5 Ft.", serves: "18 people" },
  { size: "6 Ft.", serves: "22 people" },
  { size: "8 Ft.", serves: "30 people" },
];

const sideSalads = ["Potato Salad", "Pasta Salad", "Macaroni Salad", "Coleslaw"];

export default function CateringPage() {
  return (
    <>
      <JsonLd data={cateringServiceSchema} />

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

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold sm:text-sm">
            Hot Trays &middot; Party Heros &middot; Custom Menus
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-ivory sm:mt-6 sm:text-5xl md:text-7xl lg:text-8xl">
            Food Worth<br />
            <span className="text-gold">Celebrating</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ivory/70 sm:mt-6 md:text-xl">
            Hot trays, salads, party heros, and more — brought to your event anywhere in NYC &amp; the Tri-State Area.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 sm:px-10 sm:py-4"
            >
              Book Catering
            </Link>
            <Link
              href="#menu"
              className="rounded-full border border-ivory/30 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:border-gold hover:text-gold sm:px-10 sm:py-4"
            >
              View Menu
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-ivory/40 sm:mt-16 sm:gap-8">
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
              <span className="block font-heading text-2xl font-bold text-ivory/70">NYC</span>
              &amp; Tri-State Area
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
      </section>

      {/* ── FOOD SHOWCASE ── */}
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
                {item.type === "video" ? (
                  <LazyVideo
                    src={item.src}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-4 left-4 text-sm font-medium text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATERING MENU ── */}
      <section id="menu" className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">

          {/* Header block */}
          <div className="border-b border-charcoal/15 pb-10 text-center">
            <p className="font-heading text-2xl font-bold tracking-wide text-charcoal">
              — NEW YORK FINE FOODS —
            </p>
            <p className="mt-1 text-charcoal/60">www.newyorkfinefoods.com</p>
            <a href={`tel:${CONTACT_PHONE}`} className="text-charcoal/60 hover:text-gold transition-colors">
              {CONTACT_PHONE}
            </a>
            <h2 className="mt-8 font-heading text-5xl font-bold text-charcoal/80 md:text-6xl">
              Catering Menu
            </h2>
          </div>

          {/* Hot Trays */}
          <div className="mt-10">
            <div className="grid grid-cols-[1fr_3.5rem_3.5rem] items-baseline gap-x-4 border-b-2 border-charcoal pb-2">
              <h3 className="font-heading text-2xl font-bold text-charcoal">Hot Trays</h3>
              <span className="text-right font-heading text-lg font-bold text-charcoal">½</span>
              <span className="text-right font-heading text-lg font-bold text-charcoal">Full</span>
            </div>
            <div className="mt-2 divide-y divide-charcoal/8">
              {hotTrays.map((item) => (
                <div key={item.name} className="grid grid-cols-[1fr_3.5rem_3.5rem] items-baseline gap-x-4 py-2.5">
                  <div>
                    <span className="font-heading text-lg text-charcoal">{item.name}</span>
                    {item.note && (
                      <p className="mt-0.5 text-sm italic text-charcoal/55">{item.note}</p>
                    )}
                  </div>
                  <span className="text-right text-charcoal/80">{item.half}</span>
                  <span className="text-right font-semibold text-charcoal">{item.full}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tossed Salad */}
          <div className="mt-10">
            <div className="grid grid-cols-[1fr_3.5rem_3.5rem] items-baseline gap-x-4 border-b-2 border-charcoal pb-2">
              <h3 className="font-heading text-2xl font-bold text-charcoal">Tossed Salad</h3>
              <span className="text-right font-heading text-lg font-bold text-charcoal">½</span>
              <span className="text-right font-heading text-lg font-bold text-charcoal">Full</span>
            </div>
            <div className="mt-2 divide-y divide-charcoal/8">
              {tossedSalads.map((item) => (
                <div key={item.name} className="grid grid-cols-[1fr_3.5rem_3.5rem] items-baseline gap-x-4 py-2.5">
                  <div>
                    <span className="font-heading text-lg text-charcoal">{item.name}</span>
                    {item.note && (
                      <p className="mt-0.5 text-sm italic text-charcoal/55">({item.note})</p>
                    )}
                  </div>
                  <span className="text-right text-charcoal/80">{item.half}</span>
                  <span className="text-right font-semibold text-charcoal">{item.full}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Catering for All Occasions header */}
          <div className="mt-16 border-t border-charcoal/15 pt-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              Catering for All Occasions
            </h2>
          </div>

          {/* Party Heros */}
          <div className="mt-10 text-center">
            <h3 className="font-heading text-2xl font-bold underline underline-offset-4 text-charcoal">
              Party Heros
            </h3>
            <p className="mt-3 text-charcoal/70">Prices Starting at $20/ft</p>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 text-charcoal">
              {partyHeroSizes.map((h) => (
                <p key={h.size} className="font-heading text-lg">
                  {h.size} <span className="font-normal text-charcoal/70">(serves {h.serves})</span>
                </p>
              ))}
            </div>
            <p className="mt-5 text-sm italic text-charcoal/60">
              (Shapes, Numbers, &amp; Letters Available by Special Request)
            </p>
          </div>

          {/* Side Salads By The Pound */}
          <div className="mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-charcoal pb-2">
              <h3 className="font-heading text-2xl font-bold text-charcoal">Side Salads By The Pound</h3>
              <span className="font-heading text-lg italic text-charcoal/70">$6 per lb</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-center">
              {sideSalads.map((s) => (
                <p key={s} className="font-heading text-lg text-charcoal">{s}</p>
              ))}
            </div>
          </div>

          {/* Assorted Sandwich & Wrap Platters */}
          <div className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-charcoal pb-2">
              <h3 className="font-heading text-2xl font-bold text-charcoal">
                Assorted Sandwich &amp; Wrap Platters
              </h3>
              <span className="font-heading text-lg italic text-charcoal/70">$12 per person</span>
            </div>
          </div>

          {/* Notices */}
          <div className="mt-12 space-y-4 pt-4 text-center">
            <p className="font-semibold text-charcoal">
              Please Call In Advance for All Catering Orders
            </p>
            <p className="font-semibold text-charcoal">
              Special Request for Items Not Listed May be Accepted on a Case By Case Basis
            </p>
            <p className="mt-4 text-sm text-charcoal/50 italic">Prices are subject to change</p>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Ready to Book?"
        subtitle="Call us or submit an inquiry and we'll get back to you within 24 hours."
        ctaText="Get in Touch"
        ctaHref="/contact"
      />
    </>
  );
}
