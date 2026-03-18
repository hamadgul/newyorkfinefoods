# SEO Optimization Design — New York Fine Foods

**Date:** 2026-03-18
**Site:** https://www.newyorkfinefoods.com
**Framework:** Next.js 15, TypeScript, Tailwind CSS
**Scope:** Option B — Technical SEO + Blog Scaffold (no content authoring)

---

## 1. Context & Goals

New York Fine Foods is an NYC-based premium catering, event planning, and Neapolitan pizza truck rental company. The site has 6 pages (home, about, catering, events, pizza-trucks, contact) and is built with the Next.js App Router.

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

Four work streams, each independent and additive:

1. **Technical SEO Foundations** — robots, sitemap, metadataBase
2. **Metadata Enhancements** — OG tags, Twitter cards, canonicals on all pages
3. **JSON-LD Structured Data** — Organization, LocalBusiness, Service, WebSite schemas
4. **Blog Scaffold** — routes, content pipeline, types, empty content directory

All business data (name, URL, phone, email, social handles) is sourced from `src/lib/constants.ts` to keep a single source of truth.

---

## 3. Section 1: Technical SEO Foundations

### Files

**`app/robots.ts`**
Dynamic Next.js robots route. Allows all crawlers, disallows nothing, points to sitemap.

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.newyorkfinefoods.com/sitemap.xml',
  }
}
```

**`app/sitemap.ts`**
Dynamic sitemap covering all static routes + future blog posts. Reads `getAllPosts()` to append blog slugs automatically.

| Route | Priority | Change Frequency |
|-------|----------|-----------------|
| `/` | 1.0 | weekly |
| `/catering` | 0.8 | monthly |
| `/events` | 0.8 | monthly |
| `/pizza-trucks` | 0.8 | monthly |
| `/about` | 0.6 | monthly |
| `/contact` | 0.6 | monthly |
| `/blog` | 0.6 | weekly |
| `/blog/[slug]` | 0.7 | monthly (per post) |

**`metadataBase` in `app/layout.tsx`**
```ts
metadataBase: new URL('https://www.newyorkfinefoods.com')
```
This single addition unblocks all relative OG image URLs and canonical URL resolution.

---

## 4. Section 2: Metadata Enhancements

### Root Layout (`app/layout.tsx`)

Add to the existing `metadata` export:

```ts
metadataBase: new URL('https://www.newyorkfinefoods.com'),
keywords: ['NYC catering', 'catering company New York', 'event planning NYC',
           'pizza truck rental NYC', 'Neapolitan pizza truck', 'corporate catering New York',
           'wedding catering NYC', 'New York Fine Foods'],
authors: [{ name: 'New York Fine Foods' }],
openGraph: {
  type: 'website',
  locale: 'en_US',
  siteName: 'New York Fine Foods',
  images: [{ url: '/favicon-48x48.png', width: 48, height: 48, alt: 'New York Fine Foods Logo' }],
},
twitter: {
  card: 'summary',
  site: '@nyfinefoods',
},
alternates: {
  canonical: 'https://www.newyorkfinefoods.com',
},
```

**OG image:** Uses the existing `/public/favicon-48x48.png` (or highest-res logo available). No new image assets required.

### Per-Page Metadata (all 6 pages)

Each page adds `openGraph`, `twitter`, and `alternates.canonical` to its existing metadata export. Example for `/catering`:

```ts
export const metadata: Metadata = {
  title: 'Catering',
  description: "NYC's finest catering — restaurant-quality food crafted for your event. Request a custom quote today.",
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

Same pattern applied to: home, about, events, pizza-trucks, contact.

---

## 5. Section 3: JSON-LD Structured Data

### Component

**`src/components/json-ld.tsx`** — A minimal server component that renders a `<script type="application/ld+json">` tag. Accepts a `data` prop of any Schema.org object.

### Root Layout Schemas (present on every page)

**`Organization`:**
- `@type`: Organization
- `name`: New York Fine Foods
- `url`: https://www.newyorkfinefoods.com
- `logo`: favicon URL
- `telephone`: (516) 205-7629
- `email`: info@newyorkfinefoods.com
- `sameAs`: Instagram, Facebook, Twitter URLs

**`LocalBusiness` (subtype `CateringService`):**
- `@type`: ["LocalBusiness", "CateringService"]
- `name`, `url`, `telephone`, `email`
- `address`: New York City, NY, US
- `areaServed`: New York City
- `priceRange`: $$$

**`WebSite` with SearchAction:**
```json
{
  "@type": "WebSite",
  "url": "https://www.newyorkfinefoods.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.newyorkfinefoods.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Service Page Schemas

| Page | Schema type | Key fields |
|------|-------------|-----------|
| `/catering` | `Service` | name: "NYC Catering Services", areaServed: "New York City" |
| `/events` | `Service` | name: "Event Planning NYC", areaServed: "New York City" |
| `/pizza-trucks` | `Service` | name: "Neapolitan Pizza Truck Rental NYC", areaServed: "New York City" |

### Blog Schema (future-ready)

`app/blog/[slug]/page.tsx` renders an `Article` schema populated from post frontmatter:
- `@type`: Article
- `headline`, `description`, `datePublished`, `author`, `publisher`

---

## 6. Section 4: Blog Scaffold

### New Files

```
app/
  blog/
    page.tsx              # Listing page — "Coming Soon" UI, full metadata
    [slug]/
      page.tsx            # Post page — generateMetadata(), 404 for unknown slugs

src/
  lib/
    blog.ts               # getAllPosts(), getPostBySlug() reading from /content/blog/
  types/
    blog.ts               # BlogPost interface

content/
  blog/
    .gitkeep              # Keeps directory in git
    _example.mdx          # Frontmatter template for future posts
```

### `BlogPost` Interface

```ts
interface BlogPost {
  slug: string
  title: string
  description: string
  date: string           // ISO 8601
  tags: string[]
  content: string        // MDX body
}
```

### MDX Frontmatter Template (`_example.mdx`)

```mdx
---
title: "Post Title Here"
description: "One-sentence description for SEO meta."
date: "2026-01-01"
tags: ["catering", "nyc", "events"]
---

Post content goes here.
```

### Blog Listing UI

Simple "Coming Soon" placeholder with branded styling. No empty state that looks broken — just a clean message: "We're sharing our expertise soon. Check back for catering tips, event planning guides, and more."

### Sitemap Integration

`app/sitemap.ts` calls `getAllPosts()`. If the `/content/blog/` directory is empty, it returns an empty array and blog post entries are omitted from the sitemap gracefully.

---

## 7. File Change Summary

| File | Action | Notes |
|------|--------|-------|
| `app/layout.tsx` | Modify | Add metadataBase, OG, Twitter, keywords, JSON-LD component |
| `app/robots.ts` | Create | New dynamic robots route |
| `app/sitemap.ts` | Create | New dynamic sitemap |
| `app/page.tsx` | Modify | Add OG, Twitter, canonical to metadata |
| `app/about/page.tsx` | Modify | Add OG, Twitter, canonical |
| `app/catering/page.tsx` | Modify | Add OG, Twitter, canonical + Service schema |
| `app/events/page.tsx` | Modify | Add OG, Twitter, canonical + Service schema |
| `app/pizza-trucks/page.tsx` | Modify | Add OG, Twitter, canonical + Service schema |
| `app/contact/page.tsx` | Modify | Add OG, Twitter, canonical |
| `app/blog/page.tsx` | Create | Coming Soon listing page |
| `app/blog/[slug]/page.tsx` | Create | Individual post page |
| `src/components/json-ld.tsx` | Create | JSON-LD script component |
| `src/lib/blog.ts` | Create | Blog utility functions |
| `src/types/blog.ts` | Create | BlogPost type |
| `content/blog/.gitkeep` | Create | Empty blog content directory |
| `content/blog/_example.mdx` | Create | Frontmatter template |

**Total: 6 modified files, 10 new files**

---

## 8. Out of Scope

- Keyword research and copy rewrites (Option C — can be added later)
- Blog content / actual posts
- Google Search Console verification tag (already set up)
- Analytics integration (already set up)
- Performance optimization (separate concern)
