# Mobile Bar Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/mobile-bar` page to the New York Fine Foods website covering the client's full mobile bar service, pricing packages, and an inline inquiry form — plus a Mobile Bar option in the existing contact form.

**Architecture:** New Next.js App Router page at `src/app/mobile-bar/page.tsx` containing all sections inline (same pattern as `catering` and `pizza-trucks`). A new `MobileBarInquiryForm` component handles the page's inline form. The existing `ContactForm` is extended with a Mobile Bar service branch. Navigation and sitemap are updated to include the new route.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Formspree (existing endpoint), shadcn/ui components (`Button`, `Input`, `Textarea`, `Label`), Unsplash placeholder images.

**Spec:** `docs/superpowers/specs/2026-04-07-mobile-bar-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/lib/constants.ts` | Modify | Add Mobile Bar to NAV_LINKS |
| `src/app/sitemap.ts` | Modify | Add /mobile-bar URL |
| `src/components/forms/mobile-bar-inquiry-form.tsx` | Create | Inline inquiry form for the Mobile Bar page |
| `src/components/forms/contact-form.tsx` | Modify | Add Mobile Bar service option + specific fields |
| `src/app/mobile-bar/page.tsx` | Create | Full Mobile Bar page with all sections |

---

## Task 1: Add Mobile Bar to Navigation & Sitemap

**Files:**
- Modify: `src/lib/constants.ts`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update NAV_LINKS in constants.ts**

Open `src/lib/constants.ts`. The current `NAV_LINKS` array is:

```ts
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pizza Trucks", href: "/pizza-trucks" },
  { label: "Catering", href: "/catering" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
```

Replace with:

```ts
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pizza Trucks", href: "/pizza-trucks" },
  { label: "Catering", href: "/catering" },
  { label: "Mobile Bar", href: "/mobile-bar" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
```

- [ ] **Step 2: Add /mobile-bar to sitemap.ts**

Open `src/app/sitemap.ts`. Add this entry to `staticRoutes` after the `/pizza-trucks` entry:

```ts
{ url: `${BASE}/mobile-bar`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
```

The array should now read:

```ts
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE}/`,             priority: 1.0, changeFrequency: 'weekly',  lastModified: new Date() },
  { url: `${BASE}/catering`,     priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${BASE}/events`,       priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${BASE}/pizza-trucks`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${BASE}/mobile-bar`,   priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${BASE}/about`,        priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
  { url: `${BASE}/contact`,      priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
]
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors. (The new `/mobile-bar` route does not exist yet so Next.js will not error on it — the nav link simply won't resolve until Task 5.)

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants.ts src/app/sitemap.ts
git commit -m "feat(nav): add Mobile Bar to navigation and sitemap"
```

---

## Task 2: Create the Mobile Bar Inquiry Form Component

**Files:**
- Create: `src/components/forms/mobile-bar-inquiry-form.tsx`

This is a client component. It follows the exact same pattern as `src/components/forms/pizza-booking-form.tsx` — a single self-contained form that POSTs to the Formspree endpoint.

- [ ] **Step 1: Create the file**

Create `src/components/forms/mobile-bar-inquiry-form.tsx` with the following content:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FORMSPREE_ENDPOINT } from "@/lib/constants";

export function MobileBarInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <h3 className="font-heading text-2xl font-bold text-charcoal">
          Quote Request Received!
        </h3>
        <p className="mt-2 text-charcoal/70">
          Our bar team will review your details and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-6 rounded-lg bg-white p-8 shadow-sm"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const data = new FormData(e.currentTarget);
        data.append("_form_type", "Mobile Bar Inquiry");
        try {
          const res = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
          if (res.ok) {
            setSubmitted(true);
          } else {
            setError("Something went wrong. Please try again.");
          }
        } catch {
          setError("Something went wrong. Please try again.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <div>
        <h3 className="font-heading text-2xl font-bold text-charcoal">
          Request a Bar Quote
        </h3>
        <p className="mt-1 text-sm text-charcoal/50">
          Tell us about your event and we&apos;ll build a custom quote.
        </p>
      </div>

      {/* Name + Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mb-name">Name</Label>
          <Input id="mb-name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mb-email">Email</Label>
          <Input id="mb-email" name="email" type="email" placeholder="you@email.com" required />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="mb-phone">Phone</Label>
        <Input id="mb-phone" name="phone" type="tel" placeholder="(555) 000-0000" />
      </div>

      {/* Date + Guests */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mb-date">Event Date</Label>
          <Input id="mb-date" name="event_date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mb-guests">Number of Guests</Label>
          <Input
            id="mb-guests"
            name="guests"
            type="number"
            placeholder="75"
            min={1}
            required
          />
          <p className="text-xs text-charcoal/40">30 guest minimum</p>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="mb-location">Event Location / Venue</Label>
        <Input id="mb-location" name="location" placeholder="Address or venue name" required />
      </div>

      {/* Package interest */}
      <div className="space-y-2">
        <Label htmlFor="mb-package">Package Interest</Label>
        <select
          id="mb-package"
          name="package_interest"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Select a package...</option>
          <optgroup label="Full Open Bar (We Supply All Alcohol)">
            <option value="Full Open Bar – Beer &amp; Wine Only ($26/person)">Beer &amp; Wine Only — $26/person</option>
            <option value="Full Open Bar – Standard ($34/person)">Standard Open Bar — $34/person</option>
            <option value="Full Open Bar – Premium ($45/person)">Premium Open Bar — $45/person (Most Popular)</option>
            <option value="Full Open Bar – Ultra-Premium ($62/person)">Ultra-Premium Open Bar — $62/person</option>
          </optgroup>
          <optgroup label="Service Only / Dry Hire (You Supply Alcohol)">
            <option value="Service Only – Basic ($22/person)">Basic Service — $22/person</option>
            <option value="Service Only – Standard ($28/person)">Standard Service — $28/person (Most Popular)</option>
            <option value="Service Only – Premium ($35/person)">Premium Service — $35/person</option>
          </optgroup>
          <option value="Not sure yet">Not sure yet — help me choose</option>
        </select>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="mb-notes">Additional Details</Label>
        <Textarea
          id="mb-notes"
          name="details"
          placeholder="Event type, add-ons you're interested in, any questions..."
          rows={4}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
      >
        {loading ? "Sending..." : "Request a Quote"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: Build succeeds. The component is not yet imported anywhere so it won't render, but it must compile cleanly.

- [ ] **Step 3: Commit**

```bash
git add src/components/forms/mobile-bar-inquiry-form.tsx
git commit -m "feat(forms): add MobileBarInquiryForm component"
```

---

## Task 3: Add Mobile Bar to the Contact Form

**Files:**
- Modify: `src/components/forms/contact-form.tsx`

The contact form is a two-step flow: (1) service selection cards, (2) service-specific form. We extend both steps.

- [ ] **Step 1: Extend the ServiceType union and serviceOptions array**

Open `src/components/forms/contact-form.tsx`.

Replace the top of the file (lines 10–15) — the type definition and serviceOptions array:

```tsx
type ServiceType = "" | "Catering" | "Pizza Truck" | "Mobile Bar";

const serviceOptions: { value: ServiceType; label: string; description: string }[] = [
  { value: "Catering", label: "Catering", description: "Chef-crafted menus for your event" },
  { value: "Pizza Truck", label: "Pizza Truck", description: "Neopolitan-fired pizza at your doorstep" },
  { value: "Mobile Bar", label: "Mobile Bar", description: "Professional bartenders & full bar setup for your event" },
];
```

- [ ] **Step 2: Add Mobile Bar form title, subtitle, and submit button label**

In the service-specific form section (the `<form>` block), find the `<h3>` and `<p>` that conditionally render based on `serviceType`. Add the Mobile Bar cases:

```tsx
<h3 className="font-heading text-2xl font-bold text-charcoal">
  {serviceType === "Catering" && "Request a Catering Quote"}
  {serviceType === "Pizza Truck" && "Book a Pizza Truck"}
  {serviceType === "Mobile Bar" && "Book a Mobile Bar"}
</h3>
<p className="text-sm text-charcoal/50">
  {serviceType === "Catering" && "Tell us about your event and we'll prepare a custom proposal."}
  {serviceType === "Pizza Truck" && "Give us the details and we'll roll up to your event."}
  {serviceType === "Mobile Bar" && "Tell us about your event and we'll build a custom bar quote."}
</p>
```

- [ ] **Step 3: Add Mobile Bar-specific fields**

After the existing Catering-specific block and the Pizza Truck-specific block, add a Mobile Bar block. Insert it directly after the Pizza Truck block (around line 160 in the original file):

```tsx
{/* Mobile Bar-specific fields */}
{serviceType === "Mobile Bar" && (
  <>
    <div className="space-y-2">
      <Label htmlFor="c-mb-location">Event Location / Venue</Label>
      <Input id="c-mb-location" name="location" placeholder="Address or venue name" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="c-mb-package">Package Interest</Label>
      <select
        id="c-mb-package"
        name="package_interest"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <option value="">Select a package...</option>
        <optgroup label="Full Open Bar (We Supply All Alcohol)">
          <option value="Full Open Bar – Beer &amp; Wine Only ($26/person)">Beer &amp; Wine Only — $26/person</option>
          <option value="Full Open Bar – Standard ($34/person)">Standard Open Bar — $34/person</option>
          <option value="Full Open Bar – Premium ($45/person)">Premium Open Bar — $45/person (Most Popular)</option>
          <option value="Full Open Bar – Ultra-Premium ($62/person)">Ultra-Premium Open Bar — $62/person</option>
        </optgroup>
        <optgroup label="Service Only / Dry Hire (You Supply Alcohol)">
          <option value="Service Only – Basic ($22/person)">Basic Service — $22/person</option>
          <option value="Service Only – Standard ($28/person)">Standard Service — $28/person (Most Popular)</option>
          <option value="Service Only – Premium ($35/person)">Premium Service — $35/person</option>
        </optgroup>
        <option value="Not sure yet">Not sure yet — help me choose</option>
      </select>
    </div>
  </>
)}
```

- [ ] **Step 4: Update the submit button label**

Find the `<Button>` submit block at the bottom of the form. Add the Mobile Bar case:

```tsx
<Button
  type="submit"
  disabled={loading}
  className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
>
  {loading
    ? "Sending..."
    : serviceType === "Catering"
      ? "Request Quote"
      : serviceType === "Mobile Bar"
        ? "Request a Bar Quote"
        : "Book Pizza Truck"
  }
</Button>
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npm run build
```

Expected: Build succeeds with no type errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/forms/contact-form.tsx
git commit -m "feat(forms): add Mobile Bar service option to contact form"
```

---

## Task 4: Manual smoke test — Contact Form

Before building the full page, verify the contact form changes work correctly in the browser.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Navigate to `http://localhost:3000/contact`.

- [ ] **Step 2: Verify service selection**

The service selection screen should now show three cards: Catering, Pizza Truck, Mobile Bar. Click "Mobile Bar".

Expected: The form advances to step 2 with title "Book a Mobile Bar", subtitle "Tell us about your event and we'll build a custom bar quote.", and the Mobile Bar-specific fields (Event Location + Package Interest dropdown) visible.

- [ ] **Step 3: Verify package dropdown**

The Package Interest dropdown should show two `<optgroup>` sections: "Full Open Bar (We Supply All Alcohol)" with 4 options, and "Service Only / Dry Hire (You Supply Alcohol)" with 3 options, plus "Not sure yet".

- [ ] **Step 4: Stop dev server (Ctrl+C)**

---

## Task 5: Create the Mobile Bar Page

**Files:**
- Create: `src/app/mobile-bar/page.tsx`

This is the largest task. The page follows the exact structural pattern of `src/app/pizza-trucks/page.tsx` — a server component with inline data arrays and section-by-section JSX. All Unsplash images are bar/cocktail-themed.

- [ ] **Step 1: Create the page file**

Create `src/app/mobile-bar/page.tsx` with the following content:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/json-ld";
import { MobileBarInquiryForm } from "@/components/forms/mobile-bar-inquiry-form";
import { CONTACT_PHONE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mobile Bar",
  description:
    "Full-service mobile bar for NYC events. TIPS-certified bartenders, complete setup & breakdown, liquor liability insurance. Open bar packages from $26/person.",
  alternates: {
    canonical: "https://www.newyorkfinefoods.com/mobile-bar",
  },
  openGraph: {
    title: "Mobile Bar Services NYC | New York Fine Foods",
    description:
      "Full-service mobile bar for NYC events. TIPS-certified bartenders, complete setup & breakdown, liquor liability insurance. Open bar packages from $26/person.",
    url: "https://www.newyorkfinefoods.com/mobile-bar",
  },
  twitter: {
    title: "Mobile Bar Services NYC | New York Fine Foods",
    description:
      "Full-service mobile bar for NYC events. TIPS-certified bartenders, complete setup & breakdown, liquor liability insurance. Open bar packages from $26/person.",
  },
};

const mobileBarServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mobile Full Bar Setup NYC",
  description:
    "Full-service mobile bar for NYC events. TIPS-certified bartenders, complete setup & breakdown, liquor liability insurance.",
  provider: {
    "@type": "Organization",
    name: "New York Fine Foods",
    url: "https://www.newyorkfinefoods.com",
  },
  areaServed: "New York City",
  url: "https://www.newyorkfinefoods.com/mobile-bar",
};

// ── DATA ────────────────────────────────────────────────────────────────────

const openBarPackages = [
  {
    name: "Beer & Wine Only",
    price: "$26",
    unit: "per person",
    description: "Domestic & craft beers, house red/white/rosé/Prosecco, soft drinks & water.",
    popular: false,
  },
  {
    name: "Standard Open Bar",
    price: "$34",
    unit: "per person",
    description: "Beer & wine plus well liquors, basic mixers, garnishes, and 1–2 signature cocktails.",
    popular: false,
  },
  {
    name: "Premium Open Bar",
    price: "$45",
    unit: "per person",
    description: "Grey Goose, Bombay Sapphire, Jack Daniel's, Maker's Mark and more — craft beers, better wines, and 2–3 signature cocktails.",
    popular: true,
  },
  {
    name: "Ultra-Premium Open Bar",
    price: "$62",
    unit: "per person",
    description: "Patrón, Johnnie Walker Black/Blue, high-end champagne, specialty cocktails, and premium mocktails.",
    popular: false,
  },
];

const dryHirePackages = [
  {
    name: "Basic Service",
    price: "$22",
    unit: "per person",
    description: "Setup, bartender(s), basic mixers, ice, garnishes & disposables.",
    popular: false,
  },
  {
    name: "Standard Service",
    price: "$28",
    unit: "per person",
    description: "Full portable bar setup, premium mixers/fresh juices/syrups, garnishes, and better serviceware.",
    popular: true,
  },
  {
    name: "Premium Service",
    price: "$35",
    unit: "per person",
    description: "Upgraded bar display, specialty garnishes, real glassware option, and custom mocktail/cocktail recipes.",
    popular: false,
  },
];

const whatsIncluded = [
  "Complete portable bar setup (tables with linens, back-bar display, refrigeration/coolers, glassware or high-end disposables, all bar tools)",
  "Professional, TIPS-certified bartenders for the full duration",
  "All alcohol, ice, fresh mixers/juices/syrups, garnishes, straws, napkins & serviceware",
  "Unlimited drinks for the agreed time",
  "Full setup — we arrive 60–90 min early",
  "Complete breakdown, cleanup & removal of all equipment, trash & recyclables",
  "Liquor liability insurance & all necessary permits (Caterer's Alcohol Permit handled by us)",
  "Travel within the NYC metro/tri-state area",
  "Non-alcoholic beverages & mocktails always available",
];

const addOns = [
  { label: "Each additional hour", price: "+$7–$10/person" },
  { label: "Champagne toast", price: "+$7–$9/person" },
  { label: "Real glassware upgrade", price: "+$5–$7/person" },
  { label: "Specialty cocktail station or signature menu", price: "+$5/person" },
  { label: "Late-night espresso martini or shot station", price: "+$9/person" },
];

const barFeatures = [
  "TIPS-Certified Bartenders",
  "Liquor Liability Insurance",
  "Full Setup & Breakdown",
  "Caterer's Alcohol Permit",
  "Premium Glassware Available",
  "Unlimited Drinks",
  "Mocktails Always Available",
  "NYC Metro Coverage",
];

const steps = [
  {
    step: "01",
    title: "Tell Us About Your Event",
    description: "Share your date, location, guest count, and package preference.",
  },
  {
    step: "02",
    title: "We Confirm the Details",
    description: "We finalize everything, lock in your date, and send a custom quote.",
  },
  {
    step: "03",
    title: "We Show Up Ready",
    description: "Our team arrives 60–90 minutes early, full bar set up before your first guest walks in.",
  },
  {
    step: "04",
    title: "You Enjoy the Party",
    description: "TIPS-certified bartenders serve your guests from the first drink to last call.",
  },
];

const idealFor = [
  "Weddings",
  "Corporate Events",
  "Birthday Parties",
  "Cocktail Hours",
  "Holiday Parties",
  "Graduation Parties",
  "Fundraisers",
  "Private Parties",
];

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function MobileBarPage() {
  return (
    <>
      <JsonLd data={mobileBarServiceSchema} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-charcoal">
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800&q=80",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
            "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
            "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
          ].map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={img} alt="" fill className="object-cover" priority />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-[2px]" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-24 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold sm:text-sm">
            Mobile Bar &middot; NYC &amp; Surrounding Areas &middot; Full-Service
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-ivory sm:mt-6 sm:text-5xl md:text-7xl lg:text-8xl">
            The Bar<br />
            <span className="text-gold">Comes to You</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ivory/70 sm:mt-6 md:text-xl">
            TIPS-certified bartenders, premium spirits, and a complete portable bar — delivered and set up at your event anywhere in NYC &amp; the Tri-State Area.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="#book"
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 sm:px-10 sm:py-4"
            >
              Get a Quote
            </Link>
            <Link
              href="#packages"
              className="rounded-full border border-ivory/30 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:border-gold hover:text-gold sm:px-10 sm:py-4"
            >
              View Packages
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-ivory/40 sm:mt-16 sm:gap-8">
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">30+</span>
              Guest Minimum
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">4 Hr</span>
              Minimum Service
            </span>
            <span className="hidden h-8 w-px bg-ivory/20 sm:block" />
            <span className="text-center text-xs uppercase tracking-widest">
              <span className="block font-heading text-2xl font-bold text-ivory/70">NYC</span>
              &amp; Tri-State Area
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
      </section>

      {/* ── BAR SHOWCASE ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="relative w-full overflow-hidden rounded-2xl lg:w-1/2">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&q=80"
                  alt="Mobile bar setup at an event"
                  fill
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Full-Service Mobile Bar
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-charcoal md:text-4xl">
                We Bring the Bar to Your Event
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
                Our mobile bar service delivers a complete, professional bar experience right to your venue. We handle everything — from the portable bar setup and premium spirits to the permits, insurance, and cleanup. Our TIPS-certified bartenders serve your guests from start to finish, so you can enjoy every moment of your event.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {barFeatures.map((f) => (
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
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="packages" className="bg-white py-10">
        <div className="mx-auto max-w-5xl px-6">

          {/* Header */}
          <div className="pb-6 text-center">
            <Image
              src="/OGImage.png"
              alt="New York Fine Foods"
              width={600}
              height={150}
              className="mx-auto w-auto max-h-[120px] opacity-80"
            />
            <h2 className="mt-2 font-heading text-5xl font-bold text-charcoal/80 md:text-6xl">
              Mobile Bar Pricing
            </h2>
            <p className="mt-3 text-charcoal/60">www.newyorkfinefoods.com</p>
            <a href={`tel:${CONTACT_PHONE}`} className="block text-charcoal/60 transition-colors hover:text-gold">
              {CONTACT_PHONE}
            </a>
            <p className="mt-3 text-sm font-medium text-charcoal/50">
              4-hour minimum &middot; 30-guest minimum &middot; 20–22% service charge applies
            </p>
            <div className="mt-4 h-px w-full bg-charcoal/15" />
          </div>

          {/* Two package groups */}
          <div className="mt-8 grid gap-10 lg:grid-cols-2">

            {/* Group A: Full Open Bar */}
            <div>
              <h3 className="font-heading text-xl font-bold text-charcoal border-b-2 border-charcoal pb-2">
                Full Open Bar
                <span className="ml-2 text-sm font-normal text-charcoal/50">(We Supply All Alcohol)</span>
              </h3>
              <div className="mt-4 space-y-4">
                {openBarPackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`relative rounded-xl border p-5 transition-shadow ${
                      pkg.popular
                        ? "border-gold bg-gold/5 shadow-md"
                        : "border-charcoal/10 bg-ivory/40"
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 left-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-charcoal">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-heading text-lg font-bold text-charcoal">{pkg.name}</span>
                      <span className="font-heading text-xl font-bold text-charcoal">{pkg.price}<span className="text-sm font-normal text-charcoal/50">/{pkg.unit.replace("per ", "")}</span></span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{pkg.description}</p>
                  </div>
                ))}
              </div>
              <Link
                href="#book"
                className="mt-6 inline-block w-full rounded-full bg-gold px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
              >
                Get a Quote
              </Link>
            </div>

            {/* Group B: Service Only */}
            <div>
              <h3 className="font-heading text-xl font-bold text-charcoal border-b-2 border-charcoal pb-2">
                Service Only / Dry Hire
                <span className="ml-2 text-sm font-normal text-charcoal/50">(You Supply All Alcohol)</span>
              </h3>
              <div className="mt-4 space-y-4">
                {dryHirePackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`relative rounded-xl border p-5 transition-shadow ${
                      pkg.popular
                        ? "border-gold bg-gold/5 shadow-md"
                        : "border-charcoal/10 bg-ivory/40"
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 left-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-charcoal">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-heading text-lg font-bold text-charcoal">{pkg.name}</span>
                      <span className="font-heading text-xl font-bold text-charcoal">{pkg.price}<span className="text-sm font-normal text-charcoal/50">/{pkg.unit.replace("per ", "")}</span></span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{pkg.description}</p>
                  </div>
                ))}
              </div>
              <Link
                href="#book"
                className="mt-6 inline-block w-full rounded-full bg-gold px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
              >
                Get a Quote
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Every Package Includes
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ivory md:text-4xl">
              Everything Taken Care Of
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whatsIncluded.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-ivory/10 bg-ivory/5 p-5"
              >
                <span className="mt-0.5 flex-shrink-0 text-gold">✓</span>
                <p className="text-sm leading-relaxed text-ivory/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADD-ONS & FEES ── */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-4xl px-6">

          {/* Add-Ons */}
          <div>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
                Customize Your Bar
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal md:text-4xl">
                Easy Add-Ons
              </h2>
              <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {addOns.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-charcoal/10 bg-white px-6 py-4 shadow-sm"
                >
                  <span className="text-sm font-medium text-charcoal">{item.label}</span>
                  <span className="flex-shrink-0 font-heading text-base font-bold text-gold">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fees & Travel */}
          <div className="mt-16 border-t border-charcoal/15 pt-14">
            <div className="text-center">
              <h2 className="font-heading text-2xl font-bold text-charcoal md:text-3xl">
                Fees &amp; Travel
              </h2>
              <p className="mt-2 text-charcoal/60">No hidden fees — setup, breakdown, and cleanup are always included.</p>
              <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
            </div>
            <div className="mt-10 space-y-3 text-sm text-charcoal/80">
              <div className="flex items-start justify-between gap-4 rounded-xl border border-charcoal/10 bg-white px-6 py-4">
                <span>Setup, breakdown, cleanup &amp; equipment transport</span>
                <span className="flex-shrink-0 font-semibold text-charcoal">Included</span>
              </div>
              <div className="flex items-start justify-between gap-4 rounded-xl border border-charcoal/10 bg-white px-6 py-4">
                <span>Travel within NYC boroughs or suburbs (≤30 miles)</span>
                <span className="flex-shrink-0 font-semibold text-charcoal">Included</span>
              </div>
              <div className="flex items-start justify-between gap-4 rounded-xl border border-charcoal/10 bg-white px-6 py-4">
                <span>Travel beyond 30 miles (further LI, Hudson Valley, NJ/CT)</span>
                <span className="flex-shrink-0 font-semibold text-charcoal">$150 flat or $2/mile round-trip</span>
              </div>
              <div className="flex items-start justify-between gap-4 rounded-xl border border-charcoal/10 bg-white px-6 py-4">
                <span>Small event (&lt;30 guests) — 5 hours, 1 bartender + full setup/breakdown</span>
                <span className="flex-shrink-0 font-semibold text-charcoal">$1,250 flat</span>
              </div>
              <div className="flex items-start justify-between gap-4 rounded-xl border border-charcoal/10 bg-white px-6 py-4">
                <span>Additional bartender (determined by guest count)</span>
                <span className="flex-shrink-0 font-semibold text-charcoal">$45–$55/hr</span>
              </div>
              <div className="flex items-start justify-between gap-4 rounded-xl border border-gold/30 bg-gold/5 px-6 py-4">
                <span className="font-medium text-charcoal">Service charge on total (covers staffing, insurance, permits, equipment, fuel)</span>
                <span className="flex-shrink-0 font-semibold text-charcoal">20–22%</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── EXAMPLE QUOTE ── */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Real Pricing, No Surprises
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ivory md:text-4xl">
              Example Quote
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>

          <div className="mt-12 rounded-2xl border border-ivory/10 bg-ivory/5 p-8 backdrop-blur-sm">
            <p className="font-heading text-xl font-bold text-gold">
              75 Guests · 5-Hour Premium Open Bar in Brooklyn
            </p>
            <div className="mt-6 space-y-3 text-ivory/80">
              <div className="flex justify-between border-b border-ivory/10 pb-3">
                <span>Bar package — $45 × 75 guests</span>
                <span className="font-semibold text-ivory">$3,375</span>
              </div>
              <div className="flex justify-between border-b border-ivory/10 pb-3">
                <span>Travel / setup / breakdown</span>
                <span className="font-semibold text-ivory">$0 <span className="text-ivory/40 text-sm">(within range)</span></span>
              </div>
              <div className="flex justify-between border-b border-ivory/10 pb-3">
                <span>22% service charge</span>
                <span className="font-semibold text-ivory">$743</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-heading text-lg font-bold text-ivory">Grand Total</span>
                <span className="font-heading text-lg font-bold text-gold">≈ $4,118</span>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-ivory/40">~$55 per person all-in</p>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="#book"
              className="inline-block rounded-full bg-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
            >
              Get Your Custom Quote
            </Link>
          </div>
        </div>
      </section>

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
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gold/20 md:left-1/2 md:block" />
            <div className="space-y-12 md:space-y-16">
              {steps.map((s, i) => (
                <div
                  key={s.step}
                  className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-charcoal font-heading text-lg font-bold text-gold md:left-1/2 md:-translate-x-1/2">
                    {s.step}
                  </div>
                  <div
                    className={`ml-16 rounded-xl border border-ivory/10 bg-ivory/5 p-6 backdrop-blur-sm md:ml-0 md:w-[calc(50%-3rem)] ${
                      i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <h3 className="font-heading text-xl font-bold text-ivory">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ivory/60">{s.description}</p>
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

      {/* ── INQUIRY FORM ── */}
      <section id="book" className="bg-cream py-24">
        <div className="mx-auto max-w-2xl px-6">
          <MobileBarInquiryForm />
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Ready to Book Your Mobile Bar?"
        subtitle="Call us or submit an inquiry and we'll get back to you within 24 hours."
        ctaText="Get in Touch"
        ctaHref="/contact"
      />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: Build succeeds. If you see a TypeScript error about `bg-cream` not being a valid class, check `tailwind.config.ts` — it should already be defined since the pizza-trucks page uses `bg-cream` for its booking section. If it's missing, add `cream: '#f5f0e8'` (or the existing value) to the `colors` extend block.

- [ ] **Step 3: Commit**

```bash
git add src/app/mobile-bar/page.tsx
git commit -m "feat(mobile-bar): add Mobile Bar page with all sections and pricing"
```

---

## Task 6: Full Visual Review

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check the navbar**

Navigate to `http://localhost:3000`. The navbar should show: Home · Pizza Trucks · Catering · **Mobile Bar** · About · Contact. Click "Mobile Bar" — it should route to `/mobile-bar`.

- [ ] **Step 3: Review the Mobile Bar page top-to-bottom**

Visit `http://localhost:3000/mobile-bar` and verify each section:

| Section | What to check |
|---|---|
| Hero | 4-image grid, headline "The Bar Comes to You", two CTAs, stats bar |
| Bar Showcase | Split image/text layout, feature chips, "Get a Quote" CTA |
| Pricing (`#packages`) | Two groups (Full Open Bar / Service Only), Most Popular gold border on correct cards, prices match client data exactly |
| What's Included | 9 checklist items on charcoal background |
| Add-Ons | 5 add-ons with correct price ranges |
| Fees & Travel | 6 fee rows, last row with gold border for service charge |
| Example Quote | Brooklyn quote with correct numbers ($3,375 + $743 = $4,118) |
| How It Works | 4 steps in zigzag timeline |
| Ideal For | 8 pill tags |
| Inquiry Form (`#book`) | All fields present, 30-guest minimum note, package dropdown with both optgroups |
| CTA | "Ready to Book Your Mobile Bar?" title |

- [ ] **Step 4: Check "Get a Quote" / "View Packages" anchor links**

Click "Get a Quote" from the hero — should scroll to the inquiry form. Click "View Packages" — should scroll to the pricing section.

- [ ] **Step 5: Check the footer**

The footer should also list "Mobile Bar" in its nav links (it renders from `NAV_LINKS` automatically).

- [ ] **Step 6: Check the contact form Mobile Bar option**

Navigate to `http://localhost:3000/contact`. The service selection should now show three cards. Click "Mobile Bar" and verify the form shows the correct title, subtitle, location field, package dropdown, and submit button label.

- [ ] **Step 7: Stop dev server (Ctrl+C)**

- [ ] **Step 8: Final build check**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 9: Final commit**

```bash
git add -A
git commit -m "feat: complete Mobile Bar page implementation"
```

---

## Pricing Reference (for verification)

Use this to cross-check the page content against the client's data:

**Full Open Bar (We Supply All Alcohol) — 4hr min, 30-guest min:**
- Beer & Wine Only: $26/person
- Standard Open Bar: $34/person
- Premium Open Bar *(Most Popular)*: $45/person
- Ultra-Premium Open Bar: $62/person

**Service Only / Dry Hire (Client Supplies Alcohol) — 4hr min, 30-guest min:**
- Basic Service: $22/person
- Standard Service *(Most Popular)*: $28/person
- Premium Service: $35/person

**Add-Ons:** +$7–$10/hr · +$7–$9 champagne · +$5–$7 glassware · +$5 cocktail station · +$9 espresso station

**Fees:** ≤30 mi included · >30 mi $150 or $2/mi · <30 guests $1,250 flat/5hr · extra bartender $45–$55/hr · 20–22% service charge
