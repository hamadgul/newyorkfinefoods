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

const trucks = [
  {
    name: "The Original",
    description:
      "Our flagship truck — a beautifully restored vintage vehicle with a custom-built wood-fired oven.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    capacity: "Up to 150 guests",
  },
  {
    name: "Brooklyn",
    description:
      "Sleek and modern, Brooklyn brings artisan pizza to corporate events and upscale gatherings.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    capacity: "Up to 200 guests",
  },
];

const idealFor = [
  { title: "Weddings", icon: "💒" },
  { title: "Corporate Events", icon: "🏢" },
  { title: "Block Parties", icon: "🎉" },
  { title: "Festivals", icon: "🎪" },
  { title: "Birthday Parties", icon: "🎂" },
  { title: "Team Building", icon: "🤝" },
];

const steps = [
  {
    step: "01",
    title: "Choose Your Truck",
    description: "Select the truck and menu that fits your event style.",
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
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-charcoal/75 backdrop-blur-[1px]" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
            Wood-Fired &middot; Mobile &middot; Unforgettable
          </p>
          <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.1] text-ivory md:text-7xl lg:text-8xl">
            Pizza That<br />
            <span className="text-gold">Comes to You</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/70 md:text-xl">
            Our wood-fired pizza trucks bring authentic Neapolitan pizza —
            made fresh, served hot — to any event, anywhere in New York City.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#book"
              className="rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              Book a Truck
            </Link>
            <Link
              href="#menu"
              className="rounded-full border border-ivory/30 px-10 py-4 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:border-gold hover:text-gold"
            >
              See the Menu
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-ivory/40">
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">2</span>
              Trucks
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">200+</span>
              Max Guests
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">8</span>
              Signature Pies
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
      </section>

      {/* Truck Showcase */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Meet Our Fleet
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold/50" />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {trucks.map((truck) => (
              <div
                key={truck.name}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={truck.image}
                    alt={truck.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-charcoal">
                    {truck.name}
                  </h3>
                  <p className="mt-2 text-charcoal/60">{truck.description}</p>
                  <p className="mt-3 text-sm font-semibold text-gold">
                    {truck.capacity}
                  </p>
                </div>
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

      {/* How It Works */}
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

      {/* Ideal For */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Ideal For
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold/50" />
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3">
            {idealFor.map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="mt-3 font-heading text-lg font-semibold text-charcoal">
                  {item.title}
                </p>
              </div>
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
