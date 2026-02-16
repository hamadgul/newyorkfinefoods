import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MenuSection } from "@/components/sections/menu-section";
import { PizzaBookingForm } from "@/components/forms/pizza-booking-form";
import { pizzaMenu } from "@/data/menus";

export const metadata: Metadata = {
  title: "Pizza Trucks",
  description:
    "Book our wood-fired pizza trucks for your next event. Authentic Neapolitan pizza served fresh, anywhere in NYC.",
};

const truckFeatures = [
  "Custom wood-fired ovens",
  "900°F cooking temp",
  "90-second cook time",
  "Up to 200+ guests",
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
      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-charcoal">
        {/* Background — dramatic pizza close-up with side-by-side action shots */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
          <div className="relative col-span-1 md:col-span-2 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative hidden md:grid md:grid-rows-2">
            <div className="relative overflow-hidden">
              <Image
                src="/trucks/2.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="/trucks/3.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-charcoal/75 backdrop-blur-[1px]" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold sm:text-sm">
            Wood-Fired &middot; Mobile &middot; Unforgettable
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-ivory sm:mt-6 sm:text-5xl md:text-7xl lg:text-8xl">
            Pizza That<br />
            <span className="text-gold">Comes to You</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ivory/70 sm:mt-6 md:text-xl">
            Our wood-fired pizza trucks bring authentic Neapolitan pizza —
            made fresh, served hot — to any event, anywhere in New York City.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="#book"
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 sm:px-10 sm:py-4"
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
              <span className="block font-heading text-2xl font-bold text-ivory/70">200+</span>
              Max Guests
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">9</span>
              Signature Pies
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">Wood-Fired</span>
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
                  src="/trucks/1.jpg"
                  alt="Wood-fired pizza truck"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>
            </div>

            {/* Details */}
            <div className="w-full lg:w-1/2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Wood-Fired &amp; Mobile
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-charcoal md:text-4xl">
                Our Pizza Trucks
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
                Our custom-built, wood-fired pizza trucks bring authentic
                Neapolitan-style pizza straight to your event. Each truck houses
                a handcrafted oven that reaches 900°F, producing perfectly
                charred, restaurant-quality pies in just 90 seconds. Whether
                it&apos;s a wedding, corporate event, or backyard party — we
                show up, set up, and serve unforgettable pizza from start to
                finish.
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
                className="mt-8 inline-block rounded-full bg-gold px-8 py-3 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
              >
                Book a Truck
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUCK GALLERY ── */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-ivory md:text-4xl">
              See Our Trucks in Action
            </h2>
            <p className="mt-4 text-lg text-ivory/50">
              From setup to service — real moments from real events.
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              { src: "/trucks/1.jpg", type: "image" as const },
              { src: "/trucks/4.mp4", type: "video" as const },
              { src: "/trucks/2.jpg", type: "image" as const },
              { src: "/trucks/3.jpg", type: "image" as const },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={`Pizza truck ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pizza Menu */}
      <div id="menu">
        <MenuSection
          title="Our Pizza Menu"
          subtitle="Neapolitan-style, hand-stretched dough, premium ingredients, fired in our wood-burning oven."
          items={pizzaMenu}
          dark
        />
      </div>

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
                className="rounded-full border border-charcoal/10 bg-white px-6 py-3 font-heading text-sm font-semibold text-charcoal shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="book" className="bg-cream py-24">
        <div className="mx-auto max-w-2xl px-6">
          <PizzaBookingForm />
        </div>
      </section>
    </>
  );
}
