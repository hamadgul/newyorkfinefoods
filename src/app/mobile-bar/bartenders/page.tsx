import type { Metadata } from "next";
import { ORG_REF, REGION_AREA_SERVED } from "@/lib/schema";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { CTASection } from "@/components/sections/cta-section";
import { DarkSectionGlow } from "@/components/ui/dark-section-glow";
import { FadeIn } from "@/components/ui/fade-in";
import { StickyBookingBar } from "@/components/ui/sticky-booking-bar";
import { CONTACT_PHONE } from "@/lib/constants";

const BASE = "https://www.newyorkfinefoods.com";
const URL = `${BASE}/mobile-bar/bartenders`;
const TITLE = "Bartender for Hire NYC | TIPS-Certified Bartenders";
const DESCRIPTION =
  "Hire professional bartenders in NYC. TIPS-certified, insured, setup and breakdown included. Dry hire from $22/person. Call (516) 205-7629.";

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
  name: "Bartender Hire NYC",
  serviceType: "Bartending Service",
  description: DESCRIPTION,
  provider: ORG_REF,
  areaServed: REGION_AREA_SERVED,
  url: URL,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Mobile Bar", item: `${BASE}/mobile-bar` },
    { "@type": "ListItem", position: 3, name: "Bartenders", item: URL },
  ],
};

const dryHire = [
  {
    name: "Basic Service",
    price: "$22",
    body: "Setup, bartender(s), basic mixers, ice, garnishes and disposables.",
  },
  {
    name: "Standard Service",
    price: "$28",
    body: "Full portable bar setup, premium mixers, fresh juices and syrups, garnishes, and better serviceware.",
    popular: true,
  },
  {
    name: "Premium Service",
    price: "$35",
    body: "Upgraded bar display, specialty garnishes, real glassware option, and custom cocktail and mocktail recipes.",
  },
];

const included = [
  "Complete portable bar setup — tables with linens, back-bar display, refrigeration, glassware or high-end disposables, all bar tools",
  "Professional, TIPS-certified bartenders for the full duration",
  "Ice, fresh mixers, juices, syrups, garnishes, straws, napkins and serviceware",
  "Full setup — we arrive 60–90 minutes early",
  "Complete breakdown, cleanup and removal of all equipment, trash and recyclables",
  "Liquor liability insurance and all necessary permits — the Caterer's Alcohol Permit is handled by us",
  "Travel within the NYC metro and tri-state area",
  "Non-alcoholic beverages and mocktails always available",
];

const faqs = [
  {
    q: "What's the difference between dry hire and an open bar package?",
    a: "With dry hire you buy the alcohol and we bring everything else — bartenders, setup, mixers, ice, garnishes and glassware, from $22 per person. With an open bar package we supply the alcohol too, from $26 per person. Most people searching for a bartender already have the liquor, which makes dry hire the usual answer.",
  },
  {
    q: "How many bartenders do I need?",
    a: "It depends on guest count, service length and whether you want cocktails or just beer and wine. Tell us those three things and we'll tell you the number rather than upsell you one.",
  },
  {
    q: "Are your bartenders certified and insured?",
    a: "Yes. All of our bartenders are TIPS-certified, we carry liquor liability insurance, and we handle the Caterer's Alcohol Permit.",
  },
  {
    q: "How early do you arrive?",
    a: "60 to 90 minutes before service starts. Setup and breakdown are both included — we take the equipment, trash and recyclables with us.",
  },
  {
    q: "Can you serve in my apartment building or office?",
    a: "Yes. Most Manhattan and Brooklyn buildings want a certificate of insurance from any vendor, and we send it to building management ahead of the date.",
  },
  {
    q: "Do you cover events outside the city?",
    a: "Yes — Long Island, Westchester, New Jersey, the Hudson Valley and Connecticut, as well as all five boroughs. Travel is included within the metro area.",
  },
];

export default function BartendersPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-charcoal pb-24 pt-36">
        <DarkSectionGlow />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory/50">
              <li>
                <Link href="/mobile-bar" className="transition-colors hover:text-gold">
                  Mobile Bar
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gold">Bartenders</li>
            </ol>
          </nav>
          <h1 className="font-heading text-4xl font-bold leading-[1.1] text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
            Bartender for Hire in NYC
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory/75 md:text-lg">
            TIPS-certified, insured, and there 60 to 90 minutes early. Bring your
            own alcohol and we&apos;ll run the bar from $22 per person — or let us
            supply everything from $26.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-gold px-9 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              Get a Bar Quote
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

      {/* ── DRY HIRE ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Dry Hire
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-4xl">
              You Buy the Alcohol, We Do Everything Else
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/70">
              Most people looking for a bartender already have the liquor sorted.
              This is that booking — professional staff, a full bar setup, and all
              the parts nobody remembers until the night itself.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {dryHire.map((p) => (
              <FadeIn key={p.name}>
                <div
                  className={`h-full rounded-xl border bg-white p-7 shadow-sm ${
                    p.popular ? "border-gold" : "border-charcoal/8"
                  }`}
                >
                  {p.popular && (
                    <span className="mb-4 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold">
                      Most booked
                    </span>
                  )}
                  <h3 className="font-heading text-xl font-bold text-charcoal">
                    {p.name}
                  </h3>
                  <p className="mt-2 font-heading text-3xl font-bold text-gold">
                    {p.price}
                    <span className="ml-1 text-sm font-medium text-charcoal/50">
                      per person
                    </span>
                  </p>
                  <p className="mt-4 leading-relaxed text-charcoal/70">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-10 rounded-xl border border-charcoal/8 bg-cream p-8">
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Or Let Us Handle the Whole Bar
              </h3>
              <p className="mt-3 leading-relaxed text-charcoal/70">
                Open bar packages include the alcohol as well — beer and wine from
                $26 per person, up to ultra-premium at $62.
              </p>
              <Link
                href="/mobile-bar"
                className="mt-5 inline-block text-sm font-bold uppercase tracking-widest text-gold transition-colors hover:text-gold-light"
              >
                See open bar packages →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── THE PAPERWORK ── */}
      <section className="relative overflow-hidden bg-charcoal py-24">
        <DarkSectionGlow />
        <div className="relative mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-ivory md:text-4xl">
              The Paperwork Nobody Wants to Think About
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ivory/70">
              Serving alcohol at a private event in New York involves a permit and
              insurance, and getting it wrong is the venue&apos;s problem before
              it&apos;s yours. Plenty of people find that out late.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ivory/70">
              We carry liquor liability insurance and handle the Caterer&apos;s
              Alcohol Permit ourselves. If your building or venue needs a
              certificate of insurance naming them, send us the contact and it goes
              out ahead of the date.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── INCLUDED ── */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              What&apos;s Included
            </h2>
            <ul className="mt-8 space-y-4">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-1.5 text-gold">
                    &#9656;
                  </span>
                  <span className="leading-relaxed text-charcoal/75">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

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
        title="Get a Bar Quote"
        subtitle="Tell us the date, the headcount and how long you need service. We'll tell you how many bartenders and what it costs."
        ctaText="Get a Bar Quote"
      />

      <StickyBookingBar label="Get a Bar Quote" href="/contact" />
    </>
  );
}
