import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ContactForm } from "@/components/forms/contact-form";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with New York Fine Foods. Reach out for event inquiries, catering quotes, and pizza truck bookings.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
        title="Get in Touch"
        subtitle="We'd love to hear about your event. Reach out and let's start planning."
        compact
      />

      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <ContactForm />

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold text-charcoal">
                  Contact Information
                </h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <p className="text-sm font-medium text-charcoal/40">Address</p>
                    <p className="mt-1 text-charcoal">{CONTACT_ADDRESS}</p>
                  </li>
                  <li>
                    <p className="text-sm font-medium text-charcoal/40">Phone</p>
                    <a
                      href={`tel:${CONTACT_PHONE}`}
                      className="mt-1 block text-charcoal transition-colors hover:text-gold"
                    >
                      {CONTACT_PHONE}
                    </a>
                  </li>
                  <li>
                    <p className="text-sm font-medium text-charcoal/40">Email</p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="mt-1 block text-charcoal transition-colors hover:text-gold"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                  <li>
                    <p className="text-sm font-medium text-charcoal/40">Hours</p>
                    <p className="mt-1 text-charcoal">
                      Mon – Fri: 9:00 AM – 7:00 PM
                    </p>
                    <p className="text-charcoal">Sat – Sun: 10:00 AM – 5:00 PM</p>
                  </li>
                </ul>
              </div>

              {/* Map Placeholder */}
              <div className="overflow-hidden rounded-lg bg-charcoal/5">
                <div className="flex h-64 items-center justify-center">
                  <div className="text-center">
                    <p className="font-heading text-lg font-semibold text-charcoal/40">
                      Map
                    </p>
                    <p className="mt-1 text-sm text-charcoal/30">
                      245 West 29th Street, New York, NY
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
