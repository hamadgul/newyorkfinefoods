import type { Metadata } from "next";
import { ORG_REF } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { CTASection } from "@/components/sections/cta-section";
import { DarkSectionGlow } from "@/components/ui/dark-section-glow";
import { FadeIn } from "@/components/ui/fade-in";
import { StickyBookingBar } from "@/components/ui/sticky-booking-bar";
import { RichText } from "@/components/ui/rich-text";
import { CONTACT_PHONE } from "@/lib/constants";
import { darkBlur } from "@/lib/image-utils";
import { getServiceArea, serviceAreas } from "@/data/service-areas";

const BASE = "https://www.newyorkfinefoods.com";

interface Props {
  params: Promise<{ area: string }>;
}

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getServiceArea(slug);
  if (!area) return {};

  const url = `${BASE}/catering/${area.slug}`;
  const title = `${area.metaTitle} | New York Fine Foods`;

  return {
    title: { absolute: title },
    description: area.metaDescription,
    alternates: { canonical: url },
    // NOTE: a page-level openGraph block REPLACES the layout default rather
    // than merging into it, so images/type must be restated here.
    openGraph: {
      title,
      description: area.metaDescription,
      url,
      type: "website",
      images: ["/OGImage.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: area.metaDescription,
      images: ["/OGImage.png"],
    },
  };
}

export default async function ServiceAreaPage({ params }: Props) {
  const { area: slug } = await params;
  const area = getServiceArea(slug);
  if (!area) notFound();

  const url = `${BASE}/catering/${area.slug}`;
  const siblings = area.siblings
    .map((s) => getServiceArea(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: area.metaTitle,
    serviceType: "Catering",
    description: area.metaDescription,
    provider: ORG_REF,
    areaServed: {
      "@type": area.schemaAreaType,
      name: area.schemaAreaName,
    },
    url,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Catering", item: `${BASE}/catering` },
      { "@type": "ListItem", position: 3, name: area.metaTitle, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO ── */}
      <section className="relative min-h-[62vh] overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src={area.heroImage}
            alt={`${area.metaTitle} by New York Fine Foods`}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={darkBlur}
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/75" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />

        <div className="relative z-10 flex min-h-[62vh] flex-col items-center justify-center px-6 pb-16 pt-28 text-center">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory/50">
              <li>
                <Link href="/catering" className="transition-colors hover:text-gold">
                  Catering
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gold">{area.name}</li>
            </ol>
          </nav>
          <h1 className="font-heading text-4xl font-bold leading-[1.1] text-ivory [text-shadow:0_2px_18px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl">
            {area.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory/75 md:text-lg">
            {area.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-gold px-9 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              Get My {area.name === "the Hudson Valley" ? "Hudson Valley" : area.name} Quote
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

      {/* ── THE ANGLE — the part that is only true of this area ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="mb-6 h-px w-16 bg-gold/40" />
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              {area.angle.heading}
            </h2>
            {area.angle.body.map((p) => (
              <p key={p.slice(0, 32)} className="mt-5 text-lg leading-relaxed text-charcoal/70">
                <RichText>{p}</RichText>
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── WHAT WE CATER ── */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              What We Cater
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-4xl">
              {area.name === "the Hudson Valley"
                ? "Events Across the Hudson Valley"
                : `Events Across ${area.name}`}
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {area.cateringFor.map((item) => (
              <FadeIn key={item.title}>
                <div className="h-full rounded-xl border border-charcoal/8 bg-white p-7 shadow-sm">
                  <h3 className="font-heading text-xl font-bold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-charcoal/70">
                    <RichText>{item.body}</RichText>
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-12 rounded-xl border border-charcoal/8 bg-white p-8">
              <h3 className="font-heading text-lg font-bold text-charcoal">
                On the Menu
              </h3>
              <p className="mt-3 leading-relaxed text-charcoal/70">
                Hot trays by the half or full pan, tossed salads, side salads by the
                pound, and party heros by the foot.
              </p>
              <Link
                href="/catering"
                className="mt-5 inline-block text-sm font-bold uppercase tracking-widest text-gold transition-colors hover:text-gold-light"
              >
                See the full catering menu →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PIZZA TRUCK ── */}
      <section className="relative overflow-hidden bg-charcoal py-24">
        <DarkSectionGlow />
        <div className="relative mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Pizza Truck
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ivory md:text-4xl">
              {area.pizzaNote.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ivory/70">
              <RichText>{area.pizzaNote.body}</RichText>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pizza-trucks"
                className="rounded-full bg-gold px-8 py-3.5 text-center text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light"
              >
                See Pizza Truck Catering
              </Link>
              <Link
                href="/mobile-bar"
                className="rounded-full border border-ivory/25 px-8 py-3.5 text-center text-sm font-bold uppercase tracking-widest text-ivory transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                Add the Bar
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── COVERAGE ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              Where We Deliver
            </h2>
            <p className="mt-4 leading-relaxed text-charcoal/70">
              We cater across {area.name === "the Hudson Valley" ? "the Hudson Valley" : area.name} and
              throughout NYC and the tri-state area.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {area.places.map((place) => (
                <li
                  key={place}
                  className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm text-charcoal/75"
                >
                  {place}
                </li>
              ))}
            </ul>
          </FadeIn>

          {siblings.length > 0 && (
            <FadeIn>
              <div className="mt-12 border-t border-charcoal/10 pt-8">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-charcoal/50">
                  Nearby
                </p>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                  {siblings.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/catering/${s.slug}`}
                      className="font-heading text-lg font-bold text-gold transition-colors hover:text-gold-light"
                    >
                      {s.metaTitle} →
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              Questions
            </h2>
          </FadeIn>
          <div className="mt-10 space-y-3">
            {[
              ...area.faqs,
              {
                q: "What areas do you serve beyond here?",
                a: "All five boroughs — Manhattan, Brooklyn, Queens, the Bronx and Staten Island — plus Long Island, Westchester, New Jersey, the Hudson Valley and Connecticut. Travel beyond NYC may include a small fee, quoted upfront.",
              },
              {
                q: "Do you provide bartenders as well?",
                a: "Yes. TIPS-certified bartenders, liquor liability insurance and the Caterer's Alcohol Permit handled by us. Open bar packages start at $26 per person, or [hire bartenders only](/mobile-bar/bartenders) from $22.",
              },
            ].map((faq) => (
              <FadeIn key={faq.q}>
                <details className="group rounded-xl border border-charcoal/10 bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-lg font-bold text-charcoal">
                    {faq.q}
                    <span className="shrink-0 text-gold transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-charcoal/70">
                    <RichText>{faq.a}</RichText>
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Let's Get Your ${area.name === "the Hudson Valley" ? "Hudson Valley" : area.name} Event Booked`}
        subtitle="Tell us the date, the address and roughly how many people. We'll come back with a real number."
        ctaText="Get My Quote"
      />

      <StickyBookingBar label={`Book ${area.name === "the Hudson Valley" ? "Hudson Valley" : area.name} Catering`} href="/contact" />
    </>
  );
}
