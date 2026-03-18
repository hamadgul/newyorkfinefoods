# SEO Optimization Design — New York Fine Foods

**Date:** 2026-03-18
**Site:** https://www.newyorkfinefoods.com
**Framework:** Next.js 16, TypeScript, Tailwind CSS
**Scope:** Option B — Technical SEO + Blog Scaffold (no content authoring)

---

## 1. Context & Goals

New York Fine Foods is an NYC-based premium catering, event planning, and Neapolitan pizza truck rental company. The site has 6 pages (home, about, catering, events, pizza-trucks, contact) and is built with the Next.js 16 App Router.

**Goals:**
- Rank for local NYC searches (catering, events, pizza trucks)
- Drive more wedding/corporate event leads
- Achieve full technical SEO health
- Scaffold blog infrastructure for future content-driven SEO

**Current gaps:**
- No `robots.txt` or `sitemap.xml`
- No Open Graph or Twitter Card meta tags
- No JSON-LD structured data
- No canonical URLs
- No `metadataBase` configured
- No blog infrastructure

**Google Search Console and Google Analytics are already set up.**

---

## 2. Architecture Overview

Four work streams. **Dependency:** Workstream 1 (sitemap) depends on Workstream 4 (blog scaffold) because `sitemap.ts` calls `getAllPosts()`.

**Implementation order: 4 → 1 → 2 → 3**

All business data sourced from `src/lib/constants.ts`. The following values are confirmed present:
- `CONTACT_PHONE`: `(516) 205-7629`
- `CONTACT_EMAIL`: `info@newyorkfinefoods.com`
- `SITE_DESCRIPTION`: the full business description string (used as `description` in JSON-LD)
- `INSTAGRAM_URL`: `https://www.instagram.com/newyorkfinefoods`
- `SOCIAL_LINKS.facebook`: `https://facebook.com/newyorkfinefoods`
- `SOCIAL_LINKS.twitter`: `https://twitter.com/nyfinefoods` → handle `@nyfinefoods`

---

## 3. Section 1: Technical SEO Foundations

### Files

**`app/robots.ts`**
```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.newyorkfinefoods.com/sitemap.xml',
  }
}
```

**`app/sitemap.ts`**
Calls `getAllPosts()` from `src/lib/blog.ts`. Returns `[]` gracefully when no posts exist (no compile error, no sitemap entries added).

| Route | Priority | Change Frequency | `lastModified` |
|-------|----------|-----------------|----------------|
| `/` | 1.0 | weekly | `new Date()` (build time) |
| `/catering` | 0.8 | monthly | `new Date()` |
| `/events` | 0.8 | monthly | `new Date()` |
| `/pizza-trucks` | 0.8 | monthly | `new Date()` |
| `/about` | 0.6 | monthly | `new Date()` |
| `/contact` | 0.6 | monthly | `new Date()` |
| `/blog` | 0.6 | weekly | `new Date()` |
| `/blog/[slug]` | 0.7 | monthly | Post frontmatter `date` field |

**`metadataBase` in `app/layout.tsx`**
```ts
metadataBase: new URL('https://www.newyorkfinefoods.com')
```

---

## 4. Section 2: Metadata Enhancements

### OG Image

Uses `/public/apple-touch-icon.png` (180×180px). **Known limitation:** standard OG images are 1200×630px. This is an accepted trade-off per client preference. Create `/public/og-image.png` (1200×630) and update metadata when available.

Twitter card type is `summary` — appropriate for a square image.

### Root Layout (`app/layout.tsx`)

```ts
metadataBase: new URL('https://www.newyorkfinefoods.com'),
keywords: [
  'NYC catering', 'catering company New York', 'event planning NYC',
  'pizza truck rental NYC', 'Neapolitan pizza truck', 'corporate catering New York',
  'wedding catering NYC', 'New York Fine Foods'
],
authors: [{ name: 'New York Fine Foods' }],
openGraph: {
  type: 'website',
  locale: 'en_US',
  siteName: 'New York Fine Foods',
  images: [{
    url: '/apple-touch-icon.png',
    width: 180,
    height: 180,
    alt: 'New York Fine Foods Logo',
  }],
},
twitter: {
  card: 'summary',
  site: '@nyfinefoods',
},
// DO NOT add alternates.canonical here.
// A root layout canonical would propagate the homepage URL to every page
// that lacks an explicit per-page override — a significant SEO error.
```

### Per-Page Metadata (all 6 existing pages)

Every page must have an explicit `alternates.canonical`. There is no canonical fallback from the layout. Example for `/catering`:

```ts
export const metadata: Metadata = {
  title: 'Catering',
  description: "NYC's finest catering — restaurant-quality food crafted for your event.",
  alternates: { canonical: 'https://www.newyorkfinefoods.com/catering' },
  openGraph: {
    title: 'NYC Catering Services | New York Fine Foods',
    description: "NYC's finest catering — restaurant-quality food crafted for your event.",
    url: 'https://www.newyorkfinefoods.com/catering',
  },
  twitter: {
    title: 'NYC Catering Services | New York Fine Foods',
    description: "NYC's finest catering — restaurant-quality food crafted for your event.",
  },
}
```

Same pattern for: home (`/`), about (`/about`), events (`/events`), pizza-trucks (`/pizza-trucks`), contact (`/contact`).

### `/blog` Page Metadata

The blog listing page shows "Coming Soon" content. It should **not** be indexed until real posts exist:

```ts
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Catering tips, event planning guides, and more from New York Fine Foods.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.newyorkfinefoods.com/blog' },
  openGraph: { ... },
  twitter: { ... },
}
```

When the first post is published, remove `robots: { index: false, follow: true }` to allow indexing.

---

## 5. Section 3: JSON-LD Structured Data

### Component

**`src/components/json-ld.tsx`** — Server component rendering `<script type="application/ld+json">`. Accepts `data: Record<string, unknown>`.

### Root Layout Schemas

**`Organization`:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "New York Fine Foods",
  "url": "https://www.newyorkfinefoods.com",
  "logo": "https://www.newyorkfinefoods.com/apple-touch-icon.png",
  "telephone": "(516) 205-7629",
  "email": "info@newyorkfinefoods.com",
  "sameAs": [
    "https://www.instagram.com/newyorkfinefoods",
    "https://facebook.com/newyorkfinefoods",
    "https://twitter.com/nyfinefoods"
  ]
}
```

**`LocalBusiness`:**
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "CateringService"],
  "name": "New York Fine Foods",
  "url": "https://www.newyorkfinefoods.com",
  "description": "<SITE_DESCRIPTION from constants.ts>",
  "telephone": "(516) 205-7629",
  "email": "info@newyorkfinefoods.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "New York",
    "addressRegion": "NY",
    "addressCountry": "US"
  },
  "areaServed": "New York City",
  "priceRange": "$$-$$$"
}
```

**PostalAddress note:** `streetAddress` is intentionally omitted — no confirmed street address is present in `src/lib/constants.ts`. If the client confirms a street address, add a `CONTACT_ADDRESS` export to `constants.ts` and include `streetAddress` in the schema.

**`priceRange` TODO:** Confirm `"$$-$$$"` with client before deploying. This value appears in Google's local knowledge panel. If the client prefers a different value, add `PRICE_RANGE` to `constants.ts` and reference it from the schema.

**`WebSite`:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "New York Fine Foods",
  "url": "https://www.newyorkfinefoods.com"
}
```
`SearchAction` is intentionally omitted — the site has no search functionality.

### Service Page Schemas

| Page | `name` | `areaServed` |
|------|--------|-------------|
| `/catering` | "NYC Catering Services" | "New York City" |
| `/events` | "Event Planning NYC" | "New York City" |
| `/pizza-trucks` | "Neapolitan Pizza Truck Rental NYC" | "New York City" |

Each includes `@type: "Service"` and `provider` referencing the Organization.

### Blog Post Schema

`app/blog/[slug]/page.tsx` renders an `Article` schema only when a valid post is found (not on the Coming Soon page):

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "<post title>",
  "description": "<post description>",
  "datePublished": "<post date>",
  "author": { "@type": "Organization", "name": "New York Fine Foods" },
  "publisher": { "@type": "Organization", "name": "New York Fine Foods" }
}
```

---

## 6. Section 4: Blog Scaffold

### Prerequisites

Install `gray-matter` before implementing the blog scaffold:
```bash
npm install gray-matter
npm install --save-dev @types/gray-matter
```

### New Files

```
app/
  blog/
    page.tsx                # Coming Soon listing — robots: noindex until posts exist
    [slug]/
      page.tsx              # Post page — generateMetadata(), 404, Article schema

src/
  lib/
    blog.ts                 # getAllPosts(), getPostBySlug()
  types/
    blog.ts                 # BlogPost interface

content/
  blog/
    .gitkeep                # Keeps directory in git
    _example.md             # Frontmatter template (skipped by getAllPosts)
```

### `BlogPost` Interface

```ts
interface BlogPost {
  slug: string
  title: string
  description: string
  date: string       // ISO 8601 e.g. "2026-01-01"
  tags: string[]
  content: string    // Raw Markdown body
}
```

### Content Pipeline

- **File format:** `.md` (plain Markdown — no MDX runtime required)
- **Directory:** `content/blog/` (repo root)
- **Parsing:** `gray-matter` (frontmatter) + Node.js `fs` (file reading)
- `getAllPosts()`: reads all `.md` files from `content/blog/`, skips `_`-prefixed files, parses frontmatter, returns `BlogPost[]` sorted by `date` descending
- `getPostBySlug(slug)`: returns `BlogPost | null`

**Server boundary:** `src/lib/blog.ts` uses `fs` (Node.js-only). Add `import 'server-only'` at the top of the file to prevent accidental import into Client Components, which would cause a runtime error.

### `_example.md` Frontmatter Template

```md
---
title: "Post Title Here"
description: "One-sentence description for SEO meta."
date: "2026-01-01"
tags: ["catering", "nyc", "events"]
---

Post content goes here.
```

### Blog Listing UI

Clean branded page with copy:
> "We're sharing our expertise soon. Check back for catering tips, event planning guides, and more."

Noindexed until posts exist (see metadata in Section 4).

### Sitemap Integration

`getAllPosts()` returns `[]` when `content/blog/` has no real posts. Sitemap generates without error; no `/blog/[slug]` entries appear until posts are added.

---

## 7. File Change Summary

| File | Action | Notes |
|------|--------|-------|
| `app/layout.tsx` | Modify | metadataBase, OG, Twitter, keywords, 3 JSON-LD schemas |
| `app/robots.ts` | Create | Dynamic robots route |
| `app/sitemap.ts` | Create | Dynamic sitemap (implement after blog scaffold) |
| `app/page.tsx` | Modify | OG, Twitter, canonical |
| `app/about/page.tsx` | Modify | OG, Twitter, canonical |
| `app/catering/page.tsx` | Modify | OG, Twitter, canonical + Service schema |
| `app/events/page.tsx` | Modify | OG, Twitter, canonical + Service schema |
| `app/pizza-trucks/page.tsx` | Modify | OG, Twitter, canonical + Service schema |
| `app/contact/page.tsx` | Modify | OG, Twitter, canonical |
| `app/blog/page.tsx` | Create | Coming Soon page (noindex) |
| `app/blog/[slug]/page.tsx` | Create | Post page with generateMetadata + Article schema |
| `src/components/json-ld.tsx` | Create | JSON-LD script component |
| `src/lib/blog.ts` | Create | getAllPosts(), getPostBySlug(), `import 'server-only'` |
| `src/types/blog.ts` | Create | BlogPost interface |
| `content/blog/.gitkeep` | Create | Empty content directory |
| `content/blog/_example.md` | Create | Frontmatter template |

**Total: 6 modified files, 10 new files**
**Implementation order: 4 (Blog Scaffold) → 1 (Robots + Sitemap) → 2 (Metadata) → 3 (JSON-LD)**

---

## 8. Known Limitations & TODOs

| Item | Status | Notes |
|------|--------|-------|
| OG image size | Accepted trade-off | 180×180 used now; create `/public/og-image.png` (1200×630) and update metadata when available |
| `priceRange` | TODO | Confirm `"$$-$$$"` with client; move to `constants.ts` as `PRICE_RANGE` |
| `streetAddress` in schema | Omitted | Add `CONTACT_ADDRESS` to `constants.ts` if client confirms address |
| Blog noindex | Intentional | Remove `robots: { index: false }` from `/blog` metadata once first post is published |
| Twitter handle | TODO | Confirm `@nyfinefoods` account is active before deploying Twitter metadata |
| `gray-matter` package | Prerequisite | Run `npm install gray-matter` before implementing blog scaffold |

---

## 9. Out of Scope

- Keyword research and copy rewrites
- Blog content / actual posts
- Google Search Console verification tag (already set up)
- Analytics integration (already set up)
- Performance optimization
- Site search functionality
