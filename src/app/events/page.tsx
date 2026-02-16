import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EventInquiryForm } from "@/components/forms/event-inquiry-form";
import { eventTypes } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Full-service event planning and catering for weddings, corporate events, parties, and festivals in NYC.",
};

const eventServices = [
  "Custom Menu Design",
  "Full-Service Staffing",
  "Bar & Beverage Programs",
  "Event Coordination",
  "Décor & Presentation",
  "Venue Recommendations",
  "Day-of Management",
  "Post-Event Cleanup",
];

const eventGallery = [
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
];

export default function EventsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-charcoal">
        {/* Cinematic background — single striking image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />
        </div>

        <div className="relative z-10 flex min-h-screen items-center">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
                Weddings &middot; Corporate &middot; Celebrations
              </p>
              <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.1] text-ivory md:text-7xl lg:text-8xl">
                Events That<br />
                <span className="text-gold">Leave a Mark</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/70 md:text-xl">
                From concept to the last dance — we design, plan, and cater
                extraordinary events that your guests will talk about for years.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#inquiry"
                  className="rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
                >
                  Plan Your Event
                </Link>
                <Link
                  href="#types"
                  className="rounded-full border border-ivory/30 px-10 py-4 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:border-gold hover:text-gold"
                >
                  See Event Types
                </Link>
              </div>

              <div className="mt-16 flex flex-wrap gap-8 text-ivory/40">
                <span className="text-center text-xs uppercase tracking-widest">
                  <span className="block font-heading text-2xl font-bold text-ivory/70">500+</span>
                  Events Produced
                </span>
                <span className="h-8 w-px bg-ivory/20" />
                <span className="text-center text-xs uppercase tracking-widest">
                  <span className="block font-heading text-2xl font-bold text-ivory/70">Full</span>
                  Service
                </span>
                <span className="h-8 w-px bg-ivory/20" />
                <span className="text-center text-xs uppercase tracking-widest">
                  <span className="block font-heading text-2xl font-bold text-ivory/70">NYC</span>
                  Tri-State
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
      </section>

      {/* Event Types */}
      <section id="types" className="bg-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              Events We Specialize In
            </h2>
            <p className="mt-4 text-lg text-charcoal/60">
              No matter the occasion, we bring the food, the flair, and the
              flawless execution.
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {eventTypes.map((event) => (
              <div
                key={event.title}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 font-heading text-xl font-bold text-ivory">
                    {event.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-charcoal/60">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-ivory md:text-4xl">
            What We Provide
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold/50" />
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {eventServices.map((service) => (
              <div
                key={service}
                className="rounded-lg border border-ivory/10 bg-ivory/5 p-5 text-center transition-colors duration-300 hover:border-gold/30"
              >
                <p className="text-sm font-medium text-ivory">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Event Gallery
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold/50" />
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {eventGallery.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={img}
                  alt={`Event gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="bg-ivory py-24">
        <div className="mx-auto max-w-2xl px-6">
          <EventInquiryForm />
        </div>
      </section>
    </>
  );
}
