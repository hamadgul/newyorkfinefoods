# SEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full technical SEO coverage to newyorkfinefoods.com — robots.txt, sitemap, Open Graph/Twitter metadata, JSON-LD structured data, and a blog scaffold ready for future content.

**Architecture:** Blog scaffold is built first because `sitemap.ts` imports `getAllPosts()`. Then robots + sitemap, then metadata enhancements on all pages, then JSON-LD schemas. Each task ends with a build verification and a commit.

**Tech Stack:** Next.js 16 App Router, TypeScript, gray-matter (new dependency), Node.js `fs`, Schema.org JSON-LD

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/types/blog.ts` | Create | `BlogPost` TypeScript interface |
| `src/lib/blog.ts` | Create | `getAllPosts()`, `getPostBySlug()` — reads `content/blog/*.md` with gray-matter |
| `content/blog/.gitkeep` | Create | Keeps empty directory tracked by git |
| `content/blog/_example.md` | Create | Frontmatter template for future posts |
| `src/app/blog/page.tsx` | Create | "Coming Soon" listing page — noindexed until posts exist |
| `src/app/blog/[slug]/page.tsx` | Create | Post page with `generateMetadata()`, 404 for unknown slugs |
| `src/app/robots.ts` | Create | Dynamic robots route → allows all, points to sitemap |
| `src/app/sitemap.ts` | Create | Dynamic sitemap for all 6 pages + blog + future posts |
| `src/app/layout.tsx` | Modify | Add `metadataBase`, `openGraph`, `twitter` to root metadata |
| `src/app/page.tsx` | Modify | Add `metadata` export with OG, Twitter, canonical |
| `src/app/about/page.tsx` | Modify | Add OG, Twitter, canonical to existing metadata |
| `src/app/catering/page.tsx` | Modify | Add OG, Twitter, canonical to existing metadata |
| `src/app/events/page.tsx` | Modify | Add OG, Twitter, canonical to existing metadata |
| `src/app/pizza-trucks/page.tsx` | Modify | Add OG, Twitter, canonical to existing metadata |
| `src/app/contact/page.tsx` | Modify | Add OG, Twitter, canonical to existing metadata |
| `src/components/json-ld.tsx` | Create | Server component that renders `<script type="application/ld+json">` |
| `src/app/layout.tsx` | Modify | Add Organization, LocalBusiness, WebSite JSON-LD schemas |
| `src/app/catering/page.tsx` | Modify | Add CateringService JSON-LD schema |
| `src/app/events/page.tsx` | Modify | Add EventPlanning Service JSON-LD schema |
| `src/app/pizza-trucks/page.tsx` | Modify | Add PizzaTruck Service JSON-LD schema |
| `src/app/blog/[slug]/page.tsx` | Modify | Add Article JSON-LD schema when post exists |

---

## Task 1: Install gray-matter

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install the package**

```bash
npm install gray-matter
npm install --save-dev @types/gray-matter
```

Expected: Both packages appear in `package.json`.

- [ ] **Step 2: Verify the install didn't break the build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install gray-matter for blog frontmatter parsing"
```

---

## Task 2: Blog types and content directory

**Files:**
- Create: `src/types/blog.ts`
- Create: `content/blog/.gitkeep`
- Create: `content/blog/_example.md`

- [ ] **Step 1: Create the BlogPost type**

Create `src/types/blog.ts`:

```ts
export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string    // ISO 8601, e.g. "2026-01-01"
  tags: string[]
  content: string // Raw Markdown body
}
```

- [ ] **Step 2: Create the blog content directory**

Create `content/blog/.gitkeep` (empty file).

Create `content/blog/_example.md`:

```md
---
title: "Post Title Here"
description: "One-sentence description for SEO meta."
date: "2026-01-01"
tags: ["catering", "nyc", "events"]
---

Post content goes here.
```

Note: Files starting with `_` are ignored by `getAllPosts()` — this file is a template only.

- [ ] **Step 3: Commit**

```bash
git add src/types/blog.ts content/blog/.gitkeep content/blog/_example.md
git commit -m "feat(blog): add BlogPost type and empty content directory"
```

---

## Task 3: Blog utility functions

**Files:**
- Create: `src/lib/blog.ts`

- [ ] **Step 1: Create src/lib/blog.ts**

```ts
import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))

  const posts: BlogPost[] = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      content,
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null
}
```

Key points:
- `import 'server-only'` prevents this file from being accidentally imported into Client Components (would cause a runtime error because `fs` is Node.js-only).
- `getAllPosts()` returns `[]` when `content/blog/` is empty — no errors.
- Skips `_`-prefixed files (templates).

- [ ] **Step 2: Verify the build**

```bash
npm run build
```

Expected: Build succeeds. TypeScript should not complain about the `gray-matter` import.

- [ ] **Step 3: Commit**

```bash
git add src/lib/blog.ts
git commit -m "feat(blog): add getAllPosts and getPostBySlug utilities"
```

---

## Task 4: Blog routes

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create the blog listing page**

Create `src/app/blog/page.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Catering tips, event planning guides, and more from New York Fine Foods.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://www.newyorkfinefoods.com/blog',
  },
  openGraph: {
    title: 'Blog | New York Fine Foods',
    description:
      'Catering tips, event planning guides, and more from New York Fine Foods.',
    url: 'https://www.newyorkfinefoods.com/blog',
  },
  twitter: {
    title: 'Blog | New York Fine Foods',
    description:
      'Catering tips, event planning guides, and more from New York Fine Foods.',
  },
}

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h1 className="font-playfair mb-4 text-4xl font-bold tracking-tight text-stone-900">
        From Our Kitchen
      </h1>
      <p className="text-lg text-stone-600">
        We&apos;re sharing our expertise soon. Check back for catering tips,
        event planning guides, and more.
      </p>
    </section>
  )
}
```

Note on `robots: { index: false }`: Remove this line once your first blog post is published. It prevents Google from indexing the empty Coming Soon page.

- [ ] **Step 2: Create the blog post page**

Create `src/app/blog/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://www.newyorkfinefoods.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | New York Fine Foods`,
      description: post.description,
      url: `https://www.newyorkfinefoods.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      title: `${post.title} | New York Fine Foods`,
      description: post.description,
    },
  }
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-playfair mb-4 text-4xl font-bold text-stone-900">
        {post.title}
      </h1>
      <time className="mb-8 block text-sm text-stone-500" dateTime={post.date}>
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <div className="prose prose-stone max-w-none">
        {post.content}
      </div>
    </article>
  )
}
```

Note: `params` is typed as `Promise<{ slug: string }>` in Next.js 16 — awaiting it is required. The `generateStaticParams` export enables static generation for known slugs; it returns `[]` when no posts exist, which is fine.

- [ ] **Step 3: Start the dev server and verify the blog routes**

```bash
npm run dev
```

- Open `http://localhost:3000/blog` — should show the "Coming Soon" page.
- Open `http://localhost:3000/blog/nonexistent` — should show the Next.js 404 page.

- [ ] **Step 4: Verify the build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/app/blog/
git commit -m "feat(blog): add Coming Soon listing page and post route scaffold"
```

---

## Task 5: Robots and sitemap

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create app/robots.ts**

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.newyorkfinefoods.com/sitemap.xml',
  }
}
```

- [ ] **Step 2: Create app/sitemap.ts**

```ts
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://www.newyorkfinefoods.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,             priority: 1.0, changeFrequency: 'weekly',  lastModified: new Date() },
    { url: `${BASE}/catering`,     priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${BASE}/events`,       priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${BASE}/pizza-trucks`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${BASE}/about`,        priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${BASE}/contact`,      priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${BASE}/blog`,         priority: 0.6, changeFrequency: 'weekly',  lastModified: new Date() },
  ]

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: new Date(post.date),
  }))

  return [...staticRoutes, ...postRoutes]
}
```

- [ ] **Step 3: Start dev server and verify both routes**

```bash
npm run dev
```

Check robots.txt:
```bash
curl http://localhost:3000/robots.txt
```
Expected output:
```
User-agent: *
Allow: /

Sitemap: https://www.newyorkfinefoods.com/sitemap.xml
```

Check sitemap:
```bash
curl http://localhost:3000/sitemap.xml
```
Expected: Valid XML with 7 `<url>` entries (home + 5 pages + /blog). No blog post entries since content/blog/ is empty.

- [ ] **Step 4: Build verification**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/app/robots.ts src/app/sitemap.ts
git commit -m "feat(seo): add robots.txt and dynamic sitemap"
```

---

## Task 6: Root layout metadata

**Files:**
- Modify: `src/app/layout.tsx`

The current `layout.tsx` metadata only has `title`, `description`, and `icons`. We're adding `metadataBase`, `keywords`, `authors`, `openGraph`, and `twitter`.

- [ ] **Step 1: Update src/app/layout.tsx**

Replace the existing `metadata` export (lines 19–34) with:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://www.newyorkfinefoods.com'),
  title: {
    default: 'New York Fine Foods | NYC Catering, Events & Pizza Trucks',
    template: '%s | New York Fine Foods',
  },
  description:
    "NYC's premier catering, events, and pizza truck company. From intimate gatherings to grand celebrations, we bring fine dining to every occasion.",
  keywords: [
    'NYC catering',
    'catering company New York',
    'event planning NYC',
    'pizza truck rental NYC',
    'Neapolitan pizza truck',
    'corporate catering New York',
    'wedding catering NYC',
    'New York Fine Foods',
  ],
  authors: [{ name: 'New York Fine Foods' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'New York Fine Foods',
    images: [
      {
        url: '/OGImage.png',
        alt: 'New York Fine Foods',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}
```

Important: Do NOT add `alternates.canonical` here — it must be per-page only.

- [ ] **Step 2: Build and verify meta tags appear in rendered HTML**

```bash
npm run build && npm run start
```

```bash
curl -s http://localhost:3000 | grep -E 'og:|twitter:|metadataBase'
```

Expected: You should see `og:type`, `og:site_name`, `og:image`, `twitter:card` in the HTML `<head>`.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add metadataBase, Open Graph, and Twitter card to root layout"
```

---

## Task 7: Per-page metadata

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/catering/page.tsx`
- Modify: `src/app/events/page.tsx`
- Modify: `src/app/pizza-trucks/page.tsx`
- Modify: `src/app/contact/page.tsx`

Every page needs an explicit `alternates.canonical` — there is no fallback from the layout. Also add per-page `openGraph.url`, `openGraph.title/description`, and `twitter.title/description`.

- [ ] **Step 1: Add metadata to src/app/page.tsx**

`src/app/page.tsx` currently has no `metadata` export. Add at the top of the file (after existing imports):

```ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'New York Fine Foods | NYC Catering, Events & Pizza Trucks',
  },
  description:
    "NYC's premier catering, events, and pizza truck company. From intimate gatherings to grand celebrations, we bring fine dining to every occasion.",
  alternates: {
    canonical: 'https://www.newyorkfinefoods.com',
  },
  openGraph: {
    title: 'New York Fine Foods | NYC Catering, Events & Pizza Trucks',
    description:
      "NYC's premier catering, events, and pizza truck company. From intimate gatherings to grand celebrations, we bring fine dining to every occasion.",
    url: 'https://www.newyorkfinefoods.com',
  },
  twitter: {
    title: 'New York Fine Foods | NYC Catering, Events & Pizza Trucks',
    description:
      "NYC's premier catering, events, and pizza truck company. From intimate gatherings to grand celebrations, we bring fine dining to every occasion.",
  },
}
```

Note: `title.absolute` bypasses the layout's `template: "%s | New York Fine Foods"` suffix — the home page title should stand alone.

- [ ] **Step 2: Update src/app/about/page.tsx**

Replace the existing `metadata` export:

```ts
export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about New York Fine Foods — our story, our values, and the passionate team behind NYC\'s premier catering company.',
  alternates: {
    canonical: 'https://www.newyorkfinefoods.com/about',
  },
  openGraph: {
    title: 'About | New York Fine Foods',
    description:
      'Learn about New York Fine Foods — our story, our values, and the passionate team behind NYC\'s premier catering company.',
    url: 'https://www.newyorkfinefoods.com/about',
  },
  twitter: {
    title: 'About | New York Fine Foods',
    description:
      'Learn about New York Fine Foods — our story, our values, and the passionate team behind NYC\'s premier catering company.',
  },
}
```

- [ ] **Step 3: Update src/app/catering/page.tsx**

Replace the existing `metadata` export:

```ts
export const metadata: Metadata = {
  title: 'Catering',
  description:
    "NYC's finest catering — restaurant-quality food crafted for your event. Request a custom quote today.",
  alternates: {
    canonical: 'https://www.newyorkfinefoods.com/catering',
  },
  openGraph: {
    title: 'NYC Catering Services | New York Fine Foods',
    description:
      "NYC's finest catering — restaurant-quality food crafted for your event. Request a custom quote today.",
    url: 'https://www.newyorkfinefoods.com/catering',
  },
  twitter: {
    title: 'NYC Catering Services | New York Fine Foods',
    description:
      "NYC's finest catering — restaurant-quality food crafted for your event. Request a custom quote today.",
  },
}
```

- [ ] **Step 4: Update src/app/events/page.tsx**

Replace the existing `metadata` export:

```ts
export const metadata: Metadata = {
  title: 'Events',
  description:
    'Full-service event planning and catering for weddings, corporate events, parties, and festivals in NYC.',
  alternates: {
    canonical: 'https://www.newyorkfinefoods.com/events',
  },
  openGraph: {
    title: 'Event Planning NYC | New York Fine Foods',
    description:
      'Full-service event planning and catering for weddings, corporate events, parties, and festivals in NYC.',
    url: 'https://www.newyorkfinefoods.com/events',
  },
  twitter: {
    title: 'Event Planning NYC | New York Fine Foods',
    description:
      'Full-service event planning and catering for weddings, corporate events, parties, and festivals in NYC.',
  },
}
```

- [ ] **Step 5: Update src/app/pizza-trucks/page.tsx**

Replace the existing `metadata` export:

```ts
export const metadata: Metadata = {
  title: 'Pizza Trucks',
  description:
    'Book our Authentic Neapolitan Style Pizza trucks for your next event. Fresh pizza served anywhere in NYC.',
  alternates: {
    canonical: 'https://www.newyorkfinefoods.com/pizza-trucks',
  },
  openGraph: {
    title: 'Neapolitan Pizza Truck Rental NYC | New York Fine Foods',
    description:
      'Book our Authentic Neapolitan Style Pizza trucks for your next event. Fresh pizza served anywhere in NYC.',
    url: 'https://www.newyorkfinefoods.com/pizza-trucks',
  },
  twitter: {
    title: 'Neapolitan Pizza Truck Rental NYC | New York Fine Foods',
    description:
      'Book our Authentic Neapolitan Style Pizza trucks for your next event. Fresh pizza served anywhere in NYC.',
  },
}
```

- [ ] **Step 6: Update src/app/contact/page.tsx**

Replace the existing `metadata` export:

```ts
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with New York Fine Foods. Reach out for event inquiries, catering quotes, and pizza truck bookings.',
  alternates: {
    canonical: 'https://www.newyorkfinefoods.com/contact',
  },
  openGraph: {
    title: 'Contact | New York Fine Foods',
    description:
      'Get in touch with New York Fine Foods. Reach out for event inquiries, catering quotes, and pizza truck bookings.',
    url: 'https://www.newyorkfinefoods.com/contact',
  },
  twitter: {
    title: 'Contact | New York Fine Foods',
    description:
      'Get in touch with New York Fine Foods. Reach out for event inquiries, catering quotes, and pizza truck bookings.',
  },
}
```

- [ ] **Step 7: Build and spot-check canonical tags**

```bash
npm run build && npm run start
```

```bash
curl -s http://localhost:3000/catering | grep 'canonical'
```

Expected: `<link rel="canonical" href="https://www.newyorkfinefoods.com/catering"/>`

```bash
curl -s http://localhost:3000 | grep 'canonical'
```

Expected: `<link rel="canonical" href="https://www.newyorkfinefoods.com"/>`

- [ ] **Step 8: Commit**

```bash
git add src/app/page.tsx src/app/about/page.tsx src/app/catering/page.tsx src/app/events/page.tsx src/app/pizza-trucks/page.tsx src/app/contact/page.tsx
git commit -m "feat(seo): add Open Graph, Twitter card, and canonical URLs to all pages"
```

---

## Task 8: JSON-LD component

**Files:**
- Create: `src/components/json-ld.tsx`

- [ ] **Step 1: Create src/components/json-ld.tsx**

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

This is a Server Component (no `'use client'`). `dangerouslySetInnerHTML` is safe here because we control the `data` object entirely — it comes from our own code, not user input.

- [ ] **Step 2: Build verification**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/json-ld.tsx
git commit -m "feat(seo): add JsonLd server component"
```

---

## Task 9: Root layout JSON-LD schemas

**Files:**
- Modify: `src/app/layout.tsx`

Add three schemas to the root layout so they appear on every page: `Organization`, `LocalBusiness`, and `WebSite`. These are sourced from `src/lib/constants.ts`.

- [ ] **Step 1: Update src/app/layout.tsx**

Add the import at the top of the file:

```ts
import { JsonLd } from '@/components/json-ld'
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_PHONE,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
} from '@/lib/constants'
```

Add the three schema objects (outside the component, at module level, so they're not recreated on every render):

```ts
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: 'https://www.newyorkfinefoods.com',
  logo: 'https://www.newyorkfinefoods.com/OGImage.png',
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  sameAs: [INSTAGRAM_URL],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'CateringService'],
  name: SITE_NAME,
  url: 'https://www.newyorkfinefoods.com',
  description: SITE_DESCRIPTION,
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New York',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  areaServed: 'New York City',
  priceRange: PRICE_RANGE,
}
```

Add this constant at the top of the schema block (before `organizationSchema`):

```ts
// TODO: confirm priceRange with client before deploying — appears in Google's local knowledge panel
const PRICE_RANGE = '$$-$$$'

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: 'https://www.newyorkfinefoods.com',
}
```

Inside the `RootLayout` component's returned JSX, add the three `<JsonLd>` components inside `<body>`, before `<Navbar />`:

```tsx
export default function RootLayout({ children }: ...) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={webSiteSchema} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify JSON-LD appears in HTML**

```bash
npm run build && npm run start
```

```bash
curl -s http://localhost:3000 | grep -c 'application/ld+json'
```

Expected: `3` (three script tags)

```bash
curl -s http://localhost:3000 | grep -A2 'application/ld+json' | head -20
```

Expected: JSON-LD script tags containing `Organization`, `LocalBusiness`, `WebSite` schemas.

To fully validate: visit https://search.google.com/test/rich-results and paste your local URL (or deploy first), or paste the raw JSON-LD into https://validator.schema.org/.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add Organization, LocalBusiness, and WebSite JSON-LD to root layout"
```

---

## Task 10: Service page JSON-LD + blog Article schema

**Files:**
- Modify: `src/app/catering/page.tsx`
- Modify: `src/app/events/page.tsx`
- Modify: `src/app/pizza-trucks/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Add Service schema to src/app/catering/page.tsx**

Add the import at the top:
```ts
import { JsonLd } from '@/components/json-ld'
```

Add the schema object at module level (before the component):
```ts
const cateringServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'NYC Catering Services',
  description:
    "NYC's finest catering — restaurant-quality food crafted for your event.",
  provider: {
    '@type': 'Organization',
    name: 'New York Fine Foods',
    url: 'https://www.newyorkfinefoods.com',
  },
  areaServed: 'New York City',
  url: 'https://www.newyorkfinefoods.com/catering',
}
```

Add `<JsonLd data={cateringServiceSchema} />` as the first element inside the page component's returned JSX (before any visible content).

- [ ] **Step 2: Add Service schema to src/app/events/page.tsx**

Add the import:
```ts
import { JsonLd } from '@/components/json-ld'
```

Add the schema:
```ts
const eventsServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Event Planning NYC',
  description:
    'Full-service event planning and catering for weddings, corporate events, parties, and festivals in NYC.',
  provider: {
    '@type': 'Organization',
    name: 'New York Fine Foods',
    url: 'https://www.newyorkfinefoods.com',
  },
  areaServed: 'New York City',
  url: 'https://www.newyorkfinefoods.com/events',
}
```

Add `<JsonLd data={eventsServiceSchema} />` as first child of the returned JSX.

- [ ] **Step 3: Add Service schema to src/app/pizza-trucks/page.tsx**

Add the import:
```ts
import { JsonLd } from '@/components/json-ld'
```

Add the schema:
```ts
const pizzaTruckServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Neapolitan Pizza Truck Rental NYC',
  description:
    'Book our Authentic Neapolitan Style Pizza trucks for your next event. Fresh pizza served anywhere in NYC.',
  provider: {
    '@type': 'Organization',
    name: 'New York Fine Foods',
    url: 'https://www.newyorkfinefoods.com',
  },
  areaServed: 'New York City',
  url: 'https://www.newyorkfinefoods.com/pizza-trucks',
}
```

Add `<JsonLd data={pizzaTruckServiceSchema} />` as first child of the returned JSX.

- [ ] **Step 4: Add Article schema to src/app/blog/[slug]/page.tsx**

Add the import:
```ts
import { JsonLd } from '@/components/json-ld'
```

In the `BlogPostPage` component, build the schema from the post and render it:

```tsx
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'New York Fine Foods',
    },
    publisher: {
      '@type': 'Organization',
      name: 'New York Fine Foods',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.newyorkfinefoods.com/OGImage.png',
      },
    },
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <JsonLd data={articleSchema} />
      <h1 className="font-playfair mb-4 text-4xl font-bold text-stone-900">
        {post.title}
      </h1>
      <time className="mb-8 block text-sm text-stone-500" dateTime={post.date}>
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <div className="prose prose-stone max-w-none">
        {post.content}
      </div>
    </article>
  )
}
```

Note: `{post.content}` renders the raw Markdown string as plain text. This is intentional for the scaffold — no Markdown renderer is in scope right now. Before the blog goes live with real posts, add `react-markdown` or `remark` to render the content properly.

- [ ] **Step 5: Build and verify service page JSON-LD**

```bash
npm run build && npm run start
```

```bash
curl -s http://localhost:3000/catering | grep -c 'application/ld+json'
```

Expected: `4` (3 from root layout + 1 Service schema)

```bash
curl -s http://localhost:3000/catering | grep -A5 '"Service"'
```

Expected: JSON-LD block containing `"@type": "Service"` and `"name": "NYC Catering Services"`.

- [ ] **Step 6: Final full build check**

```bash
npm run build
```

Expected: Clean build with 0 errors and 0 TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/app/catering/page.tsx src/app/events/page.tsx src/app/pizza-trucks/page.tsx src/app/blog/[slug]/page.tsx
git commit -m "feat(seo): add Service JSON-LD schemas to service pages and Article schema to blog posts"
```

---

## Verification Checklist

After all tasks are complete, verify the following manually:

| Check | How | Expected |
|-------|-----|---------|
| robots.txt | `curl https://www.newyorkfinefoods.com/robots.txt` | `Allow: /` + sitemap URL |
| sitemap.xml | `curl https://www.newyorkfinefoods.com/sitemap.xml` | 7 URLs, valid XML |
| OG tags | View page source on any page | `og:title`, `og:image`, `og:url` in `<head>` |
| Twitter card | View page source | `twitter:card`, `twitter:title` in `<head>` |
| Canonical | View page source | `<link rel="canonical" href="https://www.newyorkfinefoods.com/[page]">` |
| JSON-LD home | `curl https://... \| grep ld+json` | 3 script tags |
| JSON-LD catering | Same | 4 script tags |
| Blog noindex | View source on /blog | `<meta name="robots" content="noindex">` |
| Schema validity | https://validator.schema.org/ | No errors on Organization/LocalBusiness |

---

## Post-Launch TODOs (not in this plan)

- **`priceRange`:** Confirm `"$$-$$$"` is correct with client. It appears in Google's local knowledge panel. If different, update the `localBusinessSchema` object in `src/app/layout.tsx`.
- **OG image dimensions:** `/public/OGImage.png` is used as-is. Confirm it is at least 1200×630px for optimal display on social platforms.
- **Blog noindex:** When the first post is published, remove `robots: { index: false, follow: true }` from `src/app/blog/page.tsx` metadata.
- **Submit sitemap to GSC:** After deploy, go to Google Search Console → Sitemaps → add `https://www.newyorkfinefoods.com/sitemap.xml`.
