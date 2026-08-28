import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { CTASection } from "@/components/sections/cta-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { DarkSectionGlow } from "@/components/ui/dark-section-glow";
import { FadeIn } from "@/components/ui/fade-in";
import { StickyBookingBar } from "@/components/ui/sticky-booking-bar";
import { CONTACT_PHONE } from "@/lib/constants";

const BASE = "https://www.newyorkfinefoods.com";
const URL = `${BASE}/corporate-catering`;
const TITLE = "Corporate Catering NYC | New York Fine Foods";
const DESCRIPTION =
  "Office lunches, client dinners, launches and holiday parties across NYC. COI on file, invoicing, on-time delivery. Call (516) 205-7629.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
    images: ["/OGImage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/OGImage.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${URL}#service`,
  name: "Corporate Catering NYC",
  serviceType: "Corporate Catering",
  description: DESCRIPTION,
  provider: {
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: "New York Fine Foods",
    url: BASE,
    telephone: CONTACT_PHONE,
  },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "AdministrativeArea", name: "Long Island" },
    { "@type": "AdministrativeArea", name: "Westchester County" },
    { "@type": "AdministrativeArea", name: "New Jersey" },
    { "@type": "AdministrativeArea", name: "Fairfield County" },
  ],
  url: URL,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Corporate Catering", item: URL },
  ],
};

const services = [
  {
    title: "Recurring office lunches",
    body: "Weekly or monthly, with a rotating menu so the team isn't eating the same trays every Thursday. Set delivery window.",
  },
  {
    title: "Client and board dinners",
    body: "Full service with staff when the room needs to feel considered.",
  },
  {
    title: "Product launches and press events",
    body: "Passed food, stations and a bar. We've run these at 200 guests.",
  },
  {
    title: "Holiday parties",
    body: "December books out first — reserve by October if you want a date that suits you.",
  },
  {
    title: "All-hands and team offsites",
    body: "Including the pizza truck, which does more for an offsite than a tray line does.",
  },
  {
    title: "Office happy hours",
    body: "TIPS-certified bartenders, liquor liability insurance, permits handled. From $26 per person.",
  },
];

const steps = [
  {
    n: "01",
    title: "Send us the brief",
    body: "Headcount, date, delivery window, building requirements, dietary needs.",
  },
  {
    n: "02",
    title: "We send COI and a quote",
    body: "The insurance certificate goes to building management directly if you give us the contact.",
  },
  {
    n: "03",
    title: "We confirm 48 hours out",
    body: "In writing, with the delivery time.",
  },
  {
    n: "04",
    title: "We deliver, set up and clear",
    body: "Or stay and staff it, if that's what you booked.",
  },
  {
    n: "05",
    title: "You get an invoice",
    body: "With your PO number on it.",
  },
];

const faqs = [
  {
    q: "Do you provide a certificate of insurance?",
    a: "Yes. Most Manhattan and Brooklyn buildings require one from any vendor, and we send it to building management ahead of the date. Give us the management contact when you book.",
  },
  {
    q: "Can you invoice us instead of taking a card?",
    a: "Yes. We invoice with a PO number.",
  },
  {
    q: "Do you handle dietary restrictions?",
    a: "Yes — vegetarian, vegan, gluten-free, halal and kosher-style requests. Tell us the counts when you book and we label the trays so nobody has to ask.",
  },
  {
    q: "Can you do recurring weekly office lunches?",
    a: "Yes, that's a large part of what we do. We'll rotate the menu so it doesn't get stale.",
  },
  {
    q: "What's the lead time for a corporate event?",
    a: "For drop-off lunches, a few days. For staffed events and holiday parties, four to eight weeks — and December fills by October.",
  },
  {
    q: "Do you serve offices outside Manhattan?",
    a: "Yes. All five boroughs plus Long Island, Westchester, New Jersey, the Hudson Valley and Connecticut.",
  },
];

export default function CorporateCateringPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-charcoal pb-24 pt-36">
        <DarkSectionGlow />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            For Companies
          </p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.1] text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
            Corporate Catering NYC
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory/75 md:text-lg">
            Office lunches, client dinners, product launches and holiday parties
            across all five boroughs. Certificate of insurance on file before we
            arrive, invoicing your finance team will accept, and food that shows
            up when we said it would.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-gold px-9 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              Get a Corporate Quote
            </Link>
            <a
              href={`tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`}
              className="rounded-full border border-ivory/25 px-9 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Call {CONTACT_PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ── THE REAL OBJECTION ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="mb-6 h-px w-16 bg-gold/40" />
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              Corporate Catering That Shows Up On Time
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
              Whoever books the catering gets blamed if it&apos;s late. That&apos;s
              the actual job.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
              So we run corporate the way corporate needs it: a certificate of
              insurance sent to building management before the date, a confirmed
              delivery window instead of &ldquo;sometime that morning,&rdquo; a named
              contact who picks up the phone, and an invoice with a PO number on it.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-charcoal/70">
              The food is the easy part. The reason offices re-book is that nothing
              went wrong.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── WHAT WE CATER ── */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Services
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-4xl">
              What We Cater
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <FadeIn key={s.title}>
                <div className="h-full rounded-xl border border-charcoal/8 bg-white p-7 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-charcoal">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-charcoal/70">{s.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIZZA TRUCK ── */}
      <section className="relative overflow-hidden bg-charcoal py-24">
        <DarkSectionGlow />
        <div className="relative mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Team Events
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ivory md:text-4xl">
              Bring the Pizza Truck to the Office
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ivory/70">
              For team events, client appreciation days and summer outings, the
              truck parks outside and fires Neapolitan pies at 900°F — ninety
              seconds each, continuously, for as long as the event runs. It scales
              from 25 to 5,000 guests.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ivory/70">
              It&apos;s also the rare corporate catering choice people take photos
              of. Pizza truck catering starts at $1,500.
            </p>
            <Link
              href="/pizza-trucks"
              className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light"
            >
              See Pizza Truck Catering
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              How We Work With Companies
            </h2>
          </FadeIn>
          <ol className="mt-12 space-y-8">
            {steps.map((s) => (
              <FadeIn key={s.n}>
                <li className="flex gap-6">
                  <span className="font-heading text-2xl font-bold text-gold/60 tabular-nums">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-charcoal">
                      {s.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-charcoal/70">{s.body}</p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <TestimonialsSection
        service="Corporate Catering"
        eyebrow="Corporate Clients"
        heading="What Companies Say"
        subtext="Feedback from corporate events we've catered across New York."
      />

      {/* ── FAQ ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              Questions
            </h2>
          </FadeIn>
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <FadeIn key={faq.q}>
                <details className="group rounded-xl border border-charcoal/10 bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-lg font-bold text-charcoal">
                    {faq.q}
                    <span className="shrink-0 text-gold transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-charcoal/70">{faq.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Get a Corporate Quote"
        subtitle="Send us the date, the headcount and the building requirements. We'll come back with a quote and a COI."
        ctaText="Get a Corporate Quote"
      />

      <StickyBookingBar label="Get a Corporate Quote" href="/contact" />
    </>
  );
}
