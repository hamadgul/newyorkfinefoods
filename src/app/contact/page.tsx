import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ContactForm } from "@/components/forms/contact-form";
import { CONTACT_PHONE } from "@/lib/constants";
import { ProtectedEmail } from "@/components/ui/protected-email";
import { JsonLd } from "@/components/json-ld";
import { ORG_REF, WEBSITE_ID, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with New York Fine Foods. Book a pizza truck or catering for your next event in NYC & the Tri-State Area.',
  alternates: {
    canonical: 'https://www.newyorkfinefoods.com/contact',
  },
  openGraph: {
    title: 'Contact | New York Fine Foods',
    description:
      'Get in touch with New York Fine Foods. Book a pizza truck or catering for your next event in NYC & the Tri-State Area.',
    url: 'https://www.newyorkfinefoods.com/contact',
    images: ['/OGImage.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | New York Fine Foods',
    description:
      'Get in touch with New York Fine Foods. Book a pizza truck or catering for your next event in NYC & the Tri-State Area.',
    images: ['/OGImage.png'],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.newyorkfinefoods.com/contact#webpage",
  url: "https://www.newyorkfinefoods.com/contact",
  name: "Contact New York Fine Foods",
  isPartOf: { "@id": WEBSITE_ID },
  about: ORG_REF,
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <Hero
        backgroundImage="https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&q=80"
        title="Get in Touch"
        subtitle="We'd love to hear about your event. Reach out and let's start planning."
        compact
      />

      {/* Form — centered and prominent */}
      <section className="relative z-10 -mt-12 bg-transparent pb-0 sm:-mt-16">
        <div className="mx-auto max-w-2xl px-6">
          <ContactForm />
        </div>
      </section>

      {/* Contact info bar */}
      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-8 text-center sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal/40">
                Phone
              </p>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="mt-2 block font-heading text-lg font-semibold text-charcoal transition-colors hover:text-gold"
              >
                {CONTACT_PHONE}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal/40">
                Email
              </p>
              <ProtectedEmail className="mt-2 block font-heading text-lg font-semibold text-charcoal transition-colors hover:text-gold" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
