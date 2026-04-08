# Mobile Bar Page — Design Spec
**Date:** 2026-04-07
**Status:** Approved

---

## Overview

Add a new `/mobile-bar` page to the New York Fine Foods website for their Mobile Full Bar Setup & Open Bar service (NYC & surrounding areas). The page follows the existing site design system (charcoal/ivory/gold, Tailwind CSS, Next.js App Router) and mirrors the structural pattern of the `/pizza-trucks` page, with a conversion-focused layout.

---

## Page Structure — `/mobile-bar`

Sections in order:

### 1. Hero
- Full-screen dark background with Unsplash bar/cocktail placeholder images (grid layout matching other pages)
- Eyebrow: `Mobile Bar · NYC & Surrounding Areas · Full-Service`
- Headline: "The Bar Comes to You"
- Subheading: Brief description of full-service mobile bar for NYC & tri-state events
- Stats bar: `30 Guest Min · 4-Hour Min · NYC & Tri-State Area`
- Two CTAs: "Get a Quote" (anchors to `#book`) and "View Packages" (anchors to `#packages`)
- Gradient fade at bottom to ivory (matches existing pages)

### 2. Bar Showcase
- `bg-ivory`, split layout: image left / text right on desktop, stacked on mobile
- Unsplash placeholder: professional bar setup image
- Subheading label: "Full-Service Mobile Bar"
- Heading: "We Bring the Bar to Your Event"
- Body copy: Describes portable bar setup, TIPS-certified bartenders, full setup/breakdown, permits, insurance
- Feature chips (pill tags): `TIPS-Certified Bartenders`, `Liquor Liability Insurance`, `Full Setup & Breakdown`, `Caterer's Alcohol Permit`, `Premium Glassware`, `Unlimited Drinks`
- CTA button: "Get a Quote" → `#book`

### 3. Pricing (`id="packages"`)
- `bg-white`
- Logo + "Mobile Bar Pricing" heading (matches catering/pizza menu header style)
- Note: "4-hour minimum · 30-guest minimum · 20–22% service charge applies"
- Two labeled groups side by side on desktop, stacked on mobile:

#### Group A: Full Open Bar (We Supply All Alcohol)
| Package | Price | Inclusions | Badge |
|---|---|---|---|
| Beer & Wine Only | $26/person | Domestic & craft beers, house red/white/rosé/Prosecco, soft drinks & water | — |
| Standard Open Bar | $34/person | Beer & wine plus well liquors, basic mixers, garnishes, 1–2 signature cocktails | — |
| Premium Open Bar | $45/person | Grey Goose, Bombay Sapphire, Jack Daniel's, Maker's Mark etc., craft beers, better wines, 2–3 signature cocktails | Most Popular |
| Ultra-Premium Open Bar | $62/person | Patrón, Johnnie Walker Black/Blue, high-end champagne, specialty cocktails, premium mocktails | — |

#### Group B: Service Only / Dry Hire (Client Supplies All Alcohol)
| Package | Price | Inclusions | Badge |
|---|---|---|---|
| Basic Service | $22/person | Setup, bartender(s), basic mixers, ice, garnishes & disposables | — |
| Standard Service | $28/person | Full portable bar setup, premium mixers/fresh juices/syrups, garnishes, better serviceware | Most Popular |
| Premium Service | $35/person | Upgraded bar display, specialty garnishes, real glassware option, custom mocktail/cocktail recipes | — |

Each package rendered as a card. "Most Popular" card gets a gold border. Gold "Get a Quote" CTA under each group anchoring to `#book`.

### 4. What's Included
- `bg-charcoal`
- Heading: "Everything Taken Care Of"
- Icon/text grid of inclusions (from client data):
  - Complete portable bar setup (tables with linens, back-bar display, refrigeration/coolers, glassware or high-end disposables, all bar tools)
  - Professional, TIPS-certified bartenders for the full duration
  - All alcohol, ice, fresh mixers/juices/syrups, garnishes, straws, napkins, serviceware
  - Unlimited drinks for the agreed time
  - Full setup (arrive 60–90 min early)
  - Complete breakdown, cleanup, and removal of all equipment, trash, recyclables
  - Liquor liability insurance and all necessary permits
  - Travel within NYC metro/tri-state area
  - Non-alcoholic beverages and mocktails always available

### 5. Add-Ons
- `bg-ivory`
- Heading: "Easy Add-Ons"
- Clean grid layout:
  - Each additional hour: +$7–$10/person
  - Champagne toast: +$7–$9/person
  - Real glassware upgrade: +$5–$7/person
  - Specialty cocktail station or signature menu customization: +$5/person
  - Late-night espresso martini or shot station: +$9/person

### 6. Fees & Travel
- Separate subsection within the same `bg-ivory` section as add-ons, separated by a divider
- Setup, breakdown, cleanup: **included** (no hidden fees)
- Travel ≤30 miles (NYC boroughs/suburbs): **included**
- Travel >30 miles (further LI, Hudson Valley, NJ/CT): $150 flat or $2/mile round-trip (whichever is greater)
- Small event (<30 guests): $1,250 flat for 5 hours (1 bartender + full setup/breakdown)
- Additional bartender: $45–$55/hr (determined by guest count)
- 20–22% service charge on total (standard NYC — covers staffing, insurance, permits, equipment wear, fuel)

### 7. Example Quote
- `bg-charcoal`
- Callout card: "75 Guests · 5-Hour Premium Open Bar in Brooklyn"
  - Bar package: $45 × 75 = $3,375
  - Travel/setup/breakdown: $0 (within range)
  - 22% service charge: $743
  - **Grand total ≈ $4,118 (~$55/person all-in)**
- Purpose: transparency, trust, helps users self-qualify

### 8. How It Works
- `bg-charcoal`
- Same 4-step zigzag timeline pattern as `/pizza-trucks`
- Steps:
  1. Tell Us About Your Event — share date, location, guest count, package preference
  2. We Confirm the Details — finalize everything and lock in your date
  3. We Show Up Ready — arrive 60–90 min early, full setup before guests arrive
  4. You Enjoy the Party — TIPS-certified bartenders serve your guests all night

### 9. Ideal For
- `bg-ivory`
- Pill tag grid (same layout as pizza trucks):
  Weddings, Corporate Events, Birthday Parties, Cocktail Hours, Holiday Parties, Graduation Parties, Fundraisers, Private Parties

### 10. Inline Inquiry Form (`id="book"`)
- `bg-cream` (matches pizza trucks booking section)
- Component: `src/components/forms/mobile-bar-inquiry-form.tsx`
- Fields:
  - Name (required)
  - Email (required)
  - Phone
  - Event date (required)
  - Number of guests (required) — with helper text "30 guest minimum"
  - Event location / venue
  - Package interest (dropdown): Full Open Bar – Beer & Wine / Standard / Premium / Ultra-Premium, or Service Only – Basic / Standard / Premium
  - Additional notes (textarea)
- Submit button: "Request a Quote" (gold, full width)
- Submits to Formspree endpoint with `_form_type: "Mobile Bar Inquiry"`

### 11. CTA Section
- Reuse existing `<CTASection>` component
- Title: "Ready to Book Your Mobile Bar?"
- Subtitle: "Call us or submit an inquiry and we'll get back to you within 24 hours."
- CTA: "Get in Touch" → `/contact`

---

## Navigation Changes

**File:** `src/lib/constants.ts`

Add to `NAV_LINKS`:
```ts
{ label: "Mobile Bar", href: "/mobile-bar" }
```
Position: after "Catering", before "About". Footer updates automatically since it renders `NAV_LINKS`.

---

## Contact Form Changes

**File:** `src/components/forms/contact-form.tsx`

1. Extend `ServiceType` union: add `"Mobile Bar"`
2. Add card to `serviceOptions`:
   - label: "Mobile Bar"
   - description: "Professional bartenders & full bar setup for your event"
3. Add Mobile Bar-specific fields (shown when `serviceType === "Mobile Bar"`):
   - Package interest (select): Full Open Bar (Beer & Wine / Standard / Premium / Ultra-Premium) or Service Only (Basic / Standard / Premium)
   - Event location (text input)
4. Update form title: "Book a Mobile Bar"
5. Update subtitle: "Tell us about your event and we'll build a custom quote."
6. Update submit button label: "Request a Bar Quote"

---

## SEO / Metadata

**File:** `src/app/mobile-bar/page.tsx`

```ts
title: "Mobile Bar"
description: "Full-service mobile bar for NYC events. TIPS-certified bartenders, complete setup & breakdown, liquor liability insurance. Open bar packages from $26/person."
canonical: "https://www.newyorkfinefoods.com/mobile-bar"
```

JSON-LD: `@type: "Service"`, name: "Mobile Full Bar Setup NYC", areaServed: "New York City"

**File:** `src/app/sitemap.ts` — add `/mobile-bar` entry.

---

## File List

| File | Action |
|---|---|
| `src/lib/constants.ts` | Add Mobile Bar to `NAV_LINKS` |
| `src/app/mobile-bar/page.tsx` | Create new page |
| `src/components/forms/mobile-bar-inquiry-form.tsx` | Create inline inquiry form component |
| `src/components/forms/contact-form.tsx` | Add Mobile Bar service type + fields |
| `src/app/sitemap.ts` | Add `/mobile-bar` URL |

---

## Design Constraints

- All colors from existing design system: `bg-charcoal`, `bg-ivory`, `bg-white`, `text-gold`, `bg-gold`
- Placeholder images from Unsplash (bar/cocktail themed) — to be swapped with real photos later
- No new dependencies — reuse existing UI components (`Button`, `Input`, `Textarea`, `Label`, `Badge`)
- Keep page file under 500 lines
- Pricing data must match client-supplied data exactly
