import type { Metadata } from "next";
import { ORG_REF } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { CTASection } from "@/components/sections/cta-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { DarkSectionGlow } from "@/components/ui/dark-section-glow";
import { FadeIn } from "@/components/ui/fade-in";
import { StickyBookingBar } from "@/components/ui/sticky-booking-bar";
import { RichText } from "@/components/ui/rich-text";
import { CONTACT_PHONE } from "@/lib/constants";
import { darkBlur } from "@/lib/image-utils";
import { getPizzaTruckPage, pizzaTruckPages } from "@/data/pizza-truck-pages";

const BASE = "https://www.newyorkfinefoods.com";

/** Verified inclusions — mirrors the /pizza-trucks hub. */
const included = [
  "Mobile Neapolitan oven, truck & fuel",
  "Professional service staff & on-site pizzaiolo",
  "Full setup, service & cleanup",
  "Fresh hand-stretched dough & premium toppings",
];

interface Props {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return pizzaTruckPages.map((p) => ({ topic: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const page = getPizzaTruckPage(topic);
  if (!page) return {};

  const url = `${BASE}/pizza-trucks/${page.slug}`;
  // metaTitle already carries two segments — appending the brand would push
  // these past the ~60 char SERP truncation point.
  const title = page.metaTitle;

  return {
    title: { absolute: title },
    description: page.metaDescription,
    alternates: { canonical: url },
    // A page-level openGraph block REPLACES the layout default — restate here.
    openGraph: {
      title,
      description: page.metaDescription,
      url,
      type: "website",
      images: ["/OGImage.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.metaDescription,
      images: ["/OGImage.png"],
    },
  };
}

export default async function PizzaTruckTopicPage({ params }: Props) {
  const { topic } = await params;
  const page = getPizzaTruckPage(topic);
  if (!page) notFound();

  const url = `${BASE}/pizza-trucks/${page.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.schemaName,
    serviceType: "Pizza Truck Catering",
    description: page.metaDescription,
    provider: ORG_REF,
    areaServed: page.schemaAreaServed.map((a) => ({
      "@type": a.type,
      name: a.name,
    })),
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: 1500,
        priceCurrency: "USD",
      },
      availability: "https://schema.org/InStock",
    },
    url,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Pizza Trucks", item: `${BASE}/pizza-trucks` },
      { "@type": "ListItem", position: 3, name: page.breadcrumbName, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO ── */}
      <section className="relative min-h-[64vh] overflow-hidden bg-charcoal">
        <div className="absolute inset-0">
          <Image
            src={page.heroImage}
            alt={page.schemaName}
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

        <div className="relative z-10 flex min-h-[64vh] flex-col items-center justify-center px-6 pb-16 pt-28 text-center">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory/50">
              <li>
                <Link href="/pizza-trucks" className="transition-colors hover:text-gold">
                  Pizza Trucks
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gold">{page.breadcrumbName}</li>
            </ol>
          </nav>
          <h1 className="font-heading text-4xl font-bold leading-[1.1] text-ivory [text-shadow:0_2px_18px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl">
            {page.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory/75 md:text-lg">
            {page.heroSubtitle}
          </p>
          <p className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-gold">
            From $1,500
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-gold px-9 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              {page.ctaButton}
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

      {/* ── HOOK ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <div className="mb-6 h-px w-16 bg-gold/40" />
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              {page.hook.heading}
            </h2>
            {page.hook.body.map((p) => (
              <p key={p.slice(0, 32)} className="mt-5 text-lg leading-relaxed text-charcoal/70">
                <RichText>{p}</RichText>
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── BLOCKS ── */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              {page.blocksEyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-4xl">
              {page.blocksHeading}
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.blocks.map((b) => (
              <FadeIn key={b.title}>
                <div className="h-full rounded-xl border border-charcoal/8 bg-white p-7 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-charcoal">
                    {b.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-charcoal/70">
                    <RichText>{b.body}</RichText>
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGISTICS + WHAT'S INCLUDED ── */}
      <section className="relative overflow-hidden bg-charcoal py-24">
        <DarkSectionGlow />
        <div className="relative mx-auto grid max-w-5xl gap-14 px-6 lg:grid-cols-2">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-ivory md:text-4xl">
              {page.logistics.heading}
            </h2>
            {page.logistics.body.map((p) => (
              <p key={p.slice(0, 32)} className="mt-5 leading-relaxed text-ivory/70">
                <RichText>{p}</RichText>
              </p>
            ))}
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gold">
              900°F · 90-second pies · 25–5,000 guests
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-ivory md:text-4xl">
              What&apos;s Included
            </h2>
            <ul className="mt-6 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-ivory/75">
                  <span aria-hidden="true" className="mt-1 text-gold">
                    &#9656;
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg font-bold text-ivory">
              Pizza truck catering starts at $1,500.
            </p>
          </FadeIn>
        </div>
      </section>

      <TestimonialsSection
        service="Pizza Truck"
        eyebrow="Client Reviews"
        heading="What Guests Say About the Truck"
        subtext="Feedback from pizza truck events across New York."
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
            {page.faqs.map((faq) => (
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

          <FadeIn>
            <div className="mt-12 border-t border-charcoal/10 pt-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-charcoal/50">
                Also see
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {page.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="font-heading text-lg font-bold text-gold transition-colors hover:text-gold-light"
                  >
                    {r.label} →
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection
        title={page.ctaTitle}
        subtitle="Tell us the date, the location and roughly how many guests. We'll tell you if the truck is free."
        ctaText={page.ctaButton}
      />

      <StickyBookingBar label={page.ctaButton} href="/contact" />
    </>
  );
}
