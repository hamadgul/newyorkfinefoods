import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PizzaBookingForm } from "@/components/forms/pizza-booking-form";
import { StickyBookingBar } from "@/components/ui/sticky-booking-bar";
import { TruckCarousel } from "@/components/sections/truck-carousel";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { DarkSectionGlow } from "@/components/ui/dark-section-glow";
import { LazyVideo } from "@/components/ui/lazy-video";
import { pizzaMenu } from "@/data/menus";
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'NYC Pizza Truck Rental & Catering',
  description:
    'New York pizza truck catering for weddings, corporate events & parties. Authentic Neapolitan pizza fired fresh on-site, served anywhere in NYC & the Tri-State. Get a quote.',
  alternates: {
    canonical: 'https://www.newyorkfinefoods.com/pizza-trucks',
  },
  openGraph: {
    title: 'NYC Pizza Truck Rental & Catering | New York Fine Foods',
    description:
      'New York pizza truck catering for weddings, corporate events & parties. Authentic Neapolitan pizza fired fresh on-site, served anywhere in NYC & the Tri-State.',
    url: 'https://www.newyorkfinefoods.com/pizza-trucks',
    images: ['/OGImage.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYC Pizza Truck Rental & Catering | New York Fine Foods',
    description:
      'New York pizza truck catering for weddings, corporate events & parties. Authentic Neapolitan pizza fired fresh on-site, served anywhere in NYC & the Tri-State.',
    images: ['/OGImage.png'],
  },
};

const pizzaTruckServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Pizza Truck Catering',
  name: 'NYC Pizza Truck Rental & Catering',
  description:
    'Authentic Neapolitan pizza truck catering for weddings, corporate events, and parties across NYC and the Tri-State Area. Pizza fired fresh on-site in a mobile 900°F oven.',
  provider: {
    '@type': 'Organization',
    '@id': 'https://www.newyorkfinefoods.com/#organization',
    name: 'New York Fine Foods',
    url: 'https://www.newyorkfinefoods.com',
  },
  areaServed: [
    'Manhattan',
    'Brooklyn',
    'Queens',
    'The Bronx',
    'Staten Island',
    'New York City',
    'Tri-State Area',
  ],
  url: 'https://www.newyorkfinefoods.com/pizza-trucks',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Neapolitan Pizza Menu',
    itemListElement: pizzaMenu.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
      },
    })),
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.newyorkfinefoods.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Pizza Trucks',
      item: 'https://www.newyorkfinefoods.com/pizza-trucks',
    },
  ],
}

const pricingIncludes = [
  'Mobile Neapolitan oven, truck & fuel',
  'Professional service staff & on-site pizzaiolo',
  'Full setup, service & cleanup',
  'Fresh hand-stretched dough & premium toppings',
];

const faqs = [
  {
    q: 'How many guests can your pizza truck serve?',
    a: 'Our trucks scale from intimate gatherings of around 25 guests up to large events of 5,000+. We fire 14" full-size and 10" personal Neapolitan pies continuously throughout your event, so there\'s always a hot pizza coming off the oven.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking 4–8 weeks ahead, and earlier for peak wedding and holiday dates (spring, early summer, and December book up fastest). If your event is sooner, reach out anyway — we\'ll do our best to accommodate last-minute requests.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve all five boroughs — Manhattan, Brooklyn, Queens, the Bronx, and Staten Island — plus the greater Tri-State Area including Long Island, Westchester, New Jersey, and Connecticut. Travel beyond NYC may include a small travel fee.',
  },
  {
    q: 'Do you offer vegetarian and dietary options?',
    a: 'Yes. Several of our signature pies are vegetarian (Margherita, Marinara, Bianca, Mushroom Truffle, and Burrata), and we welcome custom requests beyond the standard menu — just tell us what your guests need when you book.',
  },
  {
    q: 'What space and power do you need on-site?',
    a: 'Our pizza truck is fully self-contained — the oven runs on its own fuel, so no external power is required. We just need a level, accessible spot to park the truck (roughly a standard parking-space footprint) with clearance for the crew to serve.',
  },
  {
    q: 'Can the pizza truck operate indoors?',
    a: 'The truck itself serves from outdoors — a driveway, lot, curbside, backyard, or rooftop all work well. For fully indoor venues we can discuss a portable oven setup; reach out with your venue details and we\'ll find the right fit.',
  },
];

const truckFeatures = [
  "Custom Neapolitan-style ovens",
  "900°F cooking temp",
  "90-second cook time",
  "14\" & 10\" (personal) pies",
  "Up to 5,000 guests",
  "Full setup & cleanup",
  "Professional service staff",
];

const idealFor = [
  "Weddings",
  "Corporate Events",
  "Block Parties",
  "Festivals",
  "Birthday Parties",
  "Team Building",
  "Graduations",
  "Holiday Parties",
];

const steps = [
  {
    step: "01",
    title: "Tell Us About Your Event",
    description: "Share your date, location, guest count, and any special requests.",
  },
  {
    step: "02",
    title: "Confirm Details",
    description: "We finalize the date, location, guest count, and menu.",
  },
  {
    step: "03",
    title: "We Show Up",
    description: "Our team arrives, sets up, and starts firing pizzas fresh.",
  },
  {
    step: "04",
    title: "Enjoy!",
    description: "Hot, handmade pizza served to your guests from start to finish.",
  },
];

export default function PizzaTrucksPage() {
  return (
    <>
      <JsonLd data={pizzaTruckServiceSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-charcoal">
        {/* Background — dramatic pizza close-up with side-by-side action shots */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
          <div className="relative col-span-1 md:col-span-2 overflow-hidden">
            {/* Poster is the eager LCP element; the 1.4MB video lazy-loads over it */}
            <Image
              src="/gallery/pizza-truck-catering-nyc-poster.jpg"
              alt="NYC Neapolitan pizza truck firing fresh pizza at an event"
              fill
              priority
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover"
            />
            <LazyVideo
              src="/gallery/pizza-truck-catering-nyc.mp4"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative hidden md:grid md:grid-rows-2">
            <div className="relative overflow-hidden">
              <Image
                src="/trucks/pizza-truck-catering-nyc.jpg"
                alt="Neapolitan pizza truck catering setup in New York City"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="/trucks/mobile-pizza-truck-nyc.jpg"
                alt="Mobile pizza truck serving guests at an NYC event"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-[2px]" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#F02A3C] [text-shadow:0_1px_10px_rgba(0,0,0,0.75)] sm:text-sm">
            Authentic Neapolitan Style Pizza &middot; Mobile &middot; Unforgettable
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-ivory [text-shadow:0_2px_18px_rgba(0,0,0,0.6)] sm:mt-6 sm:text-5xl md:text-7xl lg:text-8xl">
            NYC Pizza Truck<br />
            <span className="text-ivory">Catering</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ivory/70 sm:mt-6 md:text-xl">
            Pizza that comes to you — our Authentic Neapolitan Style Pizza trucks bring fresh,
            handcrafted pizza, made to order and served hot, to any event anywhere in New York City
            or the Tri-State Area.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="#book"
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 sm:px-10 sm:py-4"
            >
              Book a Truck
            </Link>
            <Link
              href="#menu"
              className="rounded-full border border-ivory/30 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:border-gold hover:text-gold sm:px-10 sm:py-4"
            >
              See the Menu
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-ivory/40 sm:mt-16 sm:gap-8">
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">5,000</span>
              Max Guests
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">9</span>
              Signature Pies
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">Authentic</span>
              Neapolitan Style
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
      </section>

      {/* ── PIZZA TRUCK SHOWCASE ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            {/* Image */}
            <div className="relative w-full overflow-hidden rounded-2xl lg:w-1/2">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/trucks/nyc-neapolitan-pizza-truck.jpg"
                  alt="Authentic Neapolitan Style Pizza truck catering an event in NYC"
                  fill
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>
            </div>

            {/* Details */}
            <div className="w-full lg:w-1/2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Eco-Friendly &amp; Mobile
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-charcoal md:text-4xl">
                Our NYC Pizza Trucks
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
                Our custom-built Authentic Neapolitan Style Pizza trucks bring
                handcrafted New York pizza straight to your event across Manhattan,
                Brooklyn, Queens, and the wider Tri-State Area. Each truck houses
                a specially designed oven that reaches 900°F, producing perfectly
                charred, restaurant-quality pies in just 90 seconds. We offer
                both 14&quot; full-size and 10&quot; personal Neapolitan pizzas, and
                can accommodate a wide range of custom requests beyond what&apos;s
                listed on our menu. Whether it&apos;s a wedding, corporate event,
                or backyard party — we show up, set up, and serve unforgettable
                pizza from start to finish.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {truckFeatures.map((f) => (
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
                className="mt-8 inline-block rounded-full bg-gold px-8 py-3 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
              >
                Book a Truck
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUCK GALLERY ── */}
      <section className="relative overflow-hidden bg-charcoal py-24">
        <DarkSectionGlow />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-ivory md:text-4xl">
              See Our Trucks in Action
            </h2>
            <p className="mt-4 text-lg text-ivory/50">
              From setup to service — real moments from real events.
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>
          <div className="mt-14">
            <TruckCarousel />
          </div>
        </div>
      </section>

      {/* ── PIZZA MENU ── */}
      <section id="menu" className="bg-white py-10">
        <div className="mx-auto max-w-3xl px-6">

          {/* Header block */}
          <div className="pb-2 text-center">
            <Image
              src="/OGImage.png"
              alt="New York Fine Foods"
              width={600}
              height={150}
              className="mx-auto w-auto max-h-[120px] opacity-80"
            />
            <h2 className="mt-2 font-heading text-5xl font-bold text-charcoal/80 md:text-6xl">
              Pizza Menu
            </h2>
            <p className="mt-2 text-charcoal/60">
              Neapolitan-style, hand-stretched dough, premium ingredients, fired in our custom oven.
              Available in 14&quot; and 10&quot; (personal) sizes.
            </p>
            <div className="mt-4 h-px w-full bg-charcoal/15" />
          </div>

          {/* Pizza items */}
          <div className="mt-2 divide-y divide-charcoal/8">
            {pizzaMenu.map((item) => (
              <div key={item.name} className="flex items-baseline justify-between gap-6 py-4">
                <div>
                  <span className="font-heading text-lg text-charcoal">{item.name}</span>
                  {item.vegetarian && (
                    <span className="ml-2 rounded-full border border-green-600/40 px-2 py-0.5 text-xs font-medium text-green-700">
                      V
                    </span>
                  )}
                  <p className="mt-0.5 text-sm text-charcoal/55">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer notice */}
          <div className="mt-10 space-y-3 pt-4 text-center">
            <p className="font-semibold text-charcoal">
              Custom Requests Welcome
            </p>
            <p className="text-sm italic text-charcoal/50">Prices are subject to change</p>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="#book"
              className="inline-block rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              Book a Pizza Truck
            </Link>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative overflow-hidden bg-charcoal py-24">
        <DarkSectionGlow />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Simple &amp; Seamless
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ivory md:text-4xl">
              How Our Pizza Truck Catering Works
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>

          <div className="relative mt-16">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gold/20 md:left-1/2 md:block" />

            <div className="space-y-12 md:space-y-16">
              {steps.map((s, i) => (
                <div
                  key={s.step}
                  className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step number — centered on the line */}
                  <div className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-charcoal font-heading text-lg font-bold text-gold md:left-1/2 md:-translate-x-1/2">
                    {s.step}
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-16 rounded-xl border border-ivory/10 bg-ivory/5 p-6 backdrop-blur-sm md:ml-0 md:w-[calc(50%-3rem)] ${
                      i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <h3 className="font-heading text-xl font-bold text-ivory">
                      {s.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ivory/60">
                      {s.description}
                    </p>
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
                className="rounded-full border border-charcoal/10 bg-white px-6 py-3 font-heading text-sm font-semibold text-charcoal shadow-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ivory hover:shadow-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (pizza-specific) ── */}
      <TestimonialsSection
        service="Pizza Truck"
        eyebrow="Pizza Truck Reviews"
        heading="What Pizza Truck Clients Say"
        subtext="Real feedback from weddings, block parties, and corporate events across NYC."
      />

      {/* ── PRICING ── */}
      <section className="relative overflow-hidden bg-charcoal py-24">
        <DarkSectionGlow />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Transparent Pricing
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-ivory md:text-4xl">
            Pizza Truck Pricing
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ivory/60">
            Every event is unique, so we build a custom quote around your date, guest count, and
            menu. Full NYC pizza truck catering packages start at:
          </p>
          <p className="mt-6 font-heading text-5xl font-bold text-gold md:text-6xl">
            $1,500<span className="align-super text-2xl">+</span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-ivory/40">
            Packages starting at
          </p>

          <ul className="mx-auto mt-10 grid max-w-xl gap-3 text-left sm:grid-cols-2">
            {pricingIncludes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-ivory/10 bg-ivory/5 p-4"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.79 6.8-6.79a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-ivory/80">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="#book"
            className="mt-10 inline-block rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
          >
            Get a Custom Quote
          </Link>
          <p className="mt-4 text-sm italic text-ivory/40">
            Final pricing depends on guest count, menu, and location.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Good to Know
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-4xl">
              Pizza Truck Catering FAQs
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>
          <div className="mt-12 divide-y divide-charcoal/10 overflow-hidden rounded-2xl border border-charcoal/10 bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group px-6 [&_summary]:list-none">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-heading text-lg font-semibold text-charcoal [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg
                    className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 8l5 5 5-5" />
                  </svg>
                </summary>
                <p className="pb-5 leading-relaxed text-charcoal/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <StickyBookingBar label="Book a Pizza Truck" showAfter="menu" />

      {/* Booking Form */}
      <section id="book" className="bg-cream py-24">
        <div className="mx-auto max-w-2xl px-6">
          <PizzaBookingForm />
        </div>
      </section>
    </>
  );
}
