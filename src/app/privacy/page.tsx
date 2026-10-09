import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_PHONE } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";

const URL = "https://www.newyorkfinefoods.com/privacy";
const TITLE = "Privacy Policy | New York Fine Foods";
const DESCRIPTION =
  "What information New York Fine Foods collects through this website, how it is used, and how to reach us about it.";

/** Bump when the policy text changes. */
const LAST_UPDATED = "2026-10-09";

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

/*
 * Every statement here reflects what the code actually does: inquiry forms
 * post to Formspree, and the only analytics are Vercel Analytics and Speed
 * Insights. Update this page if either changes.
 */
const sections = [
  {
    heading: "What we collect",
    body: [
      "When you send an inquiry through a form on this site, we receive what you enter: typically your name, email address, phone number, event date, event type, guest count, location or venue, and any details you add.",
      "We also collect anonymous, aggregated usage and performance data (pages viewed, load times, device type) through Vercel Analytics and Vercel Speed Insights. These tools do not use cookies to track you across sites.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Inquiry details are used to respond to you, prepare a quote, and plan your event. Usage data is used to understand which pages are useful and to keep the site fast.",
    ],
  },
  {
    heading: "Who processes it",
    body: [
      "Form submissions are delivered to us by Formspree, a form-handling service. The site is hosted on Vercel, which also provides the analytics described above. Both act as service providers on our behalf.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      `To ask what inquiry information we hold about you, or to have it corrected or deleted, call us at ${CONTACT_PHONE} or use the contact page.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy" }])} />
      <article className="bg-ivory pb-24 pt-36">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm uppercase tracking-widest text-charcoal/40">
            Last updated{" "}
            <time dateTime={LAST_UPDATED}>
              {new Date(LAST_UPDATED).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </p>
          <div className="mt-10 h-px w-16 bg-gold/50" />
          {sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="font-heading text-2xl font-bold text-charcoal">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-charcoal/75">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-12 leading-relaxed text-charcoal/75">
            Questions about this policy?{" "}
            <Link href="/contact" className="font-medium text-gold underline underline-offset-2 hover:text-gold-light">
              Contact us
            </Link>
            .
          </p>
        </div>
      </article>
    </>
  );
}
