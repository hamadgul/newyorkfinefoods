# Implementation Plan — Rank `/pizza-trucks` for "NYC / New York pizza truck"

_Created 2026-07-13. Status: **plan only — not implemented.**_

Difficulty inferred from GSC positions + live SERP (DataForSEO MCP is not connected in this project), not a paid keyword tool.

---

## 0. Strategy & guardrails (read before touching code)

**Target-page ownership (fixes cannibalization):** Two URLs compete for pizza terms — the homepage ranks for "new york pizza catering" (16.2) and branded terms, while `/pizza-trucks` ranks for "pizza truck nyc" (11.7) and "pizza truck" (8.1). **Decision: `/pizza-trucks` is the sole canonical target for every non-branded pizza-truck query.** The homepage keeps only branded + catering intent and links *down* to `/pizza-trucks` with keyword-rich anchor text. Consolidates signals onto one page.

**Do NOT change the URL slug.** `/pizza-trucks` already ranks page 1 for "pizza truck" and has GSC history + link equity. Renaming to `/nyc-pizza-truck` resets that and forces redirects. Keep the slug; win on on-page + content. The exact-match slug is the only thing nyfta.org has that we concede — not worth the equity reset.

**Two integrity constraints baked in:**
- **`aggregateRating` schema requires genuine numeric ratings.** `testimonials.ts` has named quotes but no star ratings. Do **not** fabricate `ratingValue`. Gated on pulling real ratings from Google Business Profile (Phase 3). Until then: testimonials as visible content only, no Review schema.
- **No new `FAQPage` schema for SERP features.** Google retired FAQ rich results for all sites (May 2026). An on-page FAQ is still worth building for content depth + AI/LLM citation, but the plan won't add `FAQPage` markup expecting rich snippets.

---

## Context: GSC baseline (2026-07-13)

`/pizza-trucks` is already in striking distance:

| Query | Page | Position | Impr | Read |
|---|---|---|---|---|
| pizza truck | /pizza-trucks | **8.1** | 88 | Page 1 already — 1 click / 88 impr = **CTR problem**, not ranking |
| pizza truck nyc | /pizza-trucks | **11.7** | 46 | Target keyword, one spot below page 1 |
| neapolitan pizza truck | /pizza-trucks | 11.2 | 13 | Easy win |
| truck pizza | /pizza-trucks | 15.3 | 99 | Page 2 |
| new york pizza catering | homepage | 16.2 | 53 | Cross-sell intent, page 2 |

**Overall effort: 4/10.** The #1 competitor `nyfta.org/nyc-pizza-truck` is a high-authority aggregator directory page (~1,200 words, **no reviews, no schema**) — beatable on depth, hard to beat on domain authority. Note: New York Fine Foods is itself a NYFTA member (`nyfta.org/new-york-fine-foods`).

---

## Phase 1 — Title/snippet + on-page exact-match (highest ROI, ~1–2 hrs)

On-page only. File: `src/app/pizza-trucks/page.tsx`.

### 1.1 Title tag & meta — single biggest win
"pizza truck" sits at position 8.1 but ~1% CTR (should be 3–4%). Indexed `<title>` is generic `'Pizza Trucks | New York Fine Foods'`. Fixing it lifts clicks on rankings already held.

`metadata` block (lines 11–29):
```
title: 'Pizza Trucks'
→ title: 'NYC Pizza Truck Rental & Catering'
   // renders: "NYC Pizza Truck Rental & Catering | New York Fine Foods"

description: 'Book our Authentic Neapolitan Style Pizza trucks for your next event. Fresh pizza served anywhere in NYC.'
→ 'New York pizza truck catering for weddings, corporate events & parties. Authentic Neapolitan pizza fired fresh on-site, served anywhere in NYC & the Tri-State. Get a quote.'
```
Align `openGraph.title` / `twitter.title` to match.

### 1.2 H1 — inject the exact keyword
Lines 133–136. H1 "Pizza That Comes to You" carries zero keyword.
```
<h1>Pizza That<br/><span>Comes to You</span></h1>
→ <h1>NYC Pizza Truck Catering</h1>
   with "Pizza That Comes to You" demoted to the eyebrow/tagline <p> above (line 130).
```
Visually identical — tagline and keyword phrase swap places.

### 1.3 Geo-phrasing in body H2s + copy
- Line 200: `Our Pizza Trucks` → `Our NYC Pizza Trucks`
- Line 322: `How It Works` → `How Our Pizza Truck Catering Works`
- Showcase paragraph (lines ~211–220): work in "New York pizza truck" + borough names once ("…across Manhattan, Brooklyn, Queens, and the Tri-State").

### 1.4 Homepage de-duplication
`src/app/page.tsx`: homepage's pizza mention links to `/pizza-trucks` with anchor "NYC pizza truck catering" (not "learn more"). Do **not** add competing pizza-truck title/H1 optimization to the homepage.

**Verification:** `npm run build` + `npm run lint` clean; view-source confirms new `<title>`/`<h1>`; GSC URL Inspection → Request Indexing.

---

## Phase 2 — Content depth (closes gap vs nyfta.org, ~3–5 hrs)

Add three sections to `/pizza-trucks` before the booking form (`id="book"`, ~line 388):

### 2.1 Visible testimonials section (pizza-specific)
Reuse `src/components/sections/testimonials-section.tsx` or inline-filter `testimonials.ts` to the two `service: "Pizza Truck"` entries (Maria Rodriguez, James Okafor). Visible social proof only — **no Review schema yet** (Phase 3 gate).

### 2.2 Pricing transparency block
Competitors publish prices (Pizza Luca "$1,500+", Itsa "$4,500/60 guests"); the menu shows **no prices**. Add "Pizza Truck Pricing" with honest "packages starting at $X" + what's-included list. Captures "pizza truck cost/price nyc" long-tail. **Needs input: a starting price.**

### 2.3 On-page FAQ section (content + AI citation, not rich results)
Plain FAQ (accordion / `<details>`): min/max guests, how far ahead to book, service area (boroughs + Tri-State), dietary/vegetarian, power/space needs, indoor vs outdoor. ~250–400 words. **No `FAQPage` JSON-LD** (retired) — value is depth + LLM answerability.

Takes the page from ~500 real words to ~1,000+, exceeding the competitor.

---

## Phase 3 — Schema upgrade (gated on real ratings, ~1–2 hrs)

Read `src/app/layout.tsx` lines 30–70 first — already has `Organization`, `LocalBusiness`/`CateringService` (with `PostalAddress`), and `WebSite`.

### 3.1 Upgrade the pizza page `Service` schema
`pizzaTruckServiceSchema` (lines 31–44) is minimal. Enrich:
- `serviceType: "Pizza Truck Catering"`, `areaServed` as array of boroughs + "Tri-State Area"
- `hasOfferCatalog` linking pizza menu items (`src/data/menus.ts`)
- `provider` → reference existing Organization `@id` from layout (add `@id` anchors so entities link, not duplicate)

### 3.2 `aggregateRating` / `Review` — GATED
Only after real ratings exist:
1. Ensure GBP has reviews with star ratings.
2. Add `aggregateRating` (`ratingValue`, `reviewCount`) to `LocalBusiness`/`CateringService` in `layout.tsx`, sourced from actual GBP numbers.
3. Optionally add individual `Review` objects with real names/ratings.

**If real ratings aren't available, skip 3.2 entirely** — never invent values (manual-action risk).

---

## Phase 4 — Off-page / local (3–6 month authority play, ongoing)

Separates position 8 from position 1–3 above nyfta.org:

1. **Google Business Profile** — claim/optimize; categories "Caterer" + "Pizza restaurant"; service area; photos; actively request reviews. Unlocks Phase 3.2 and the **map pack** (which "pizza truck nyc" triggers — often faster than organic).
2. **Existing NYFTA listing** (`nyfta.org/new-york-fine-foods`) — confirm it links to newyorkfinefoods.com and is fully filled out. Turn the domain that outranks you into a backlink/referral asset.
3. **Local citations** — consistent NAP on Yelp, Roaming Hunger (they rank for these terms), The Knot / WeddingWire.
4. **Contextual backlinks** — event venues, wedding planners, corporate caterers.

---

## Sequencing, effort & measurement

| Phase | Effort | Expected impact | When |
|---|---|---|---|
| 1 — Title/H1/geo | 1–2 hrs | "pizza truck" CTR up immediately; "pizza truck nyc" 11.7→single digits | Now |
| 2 — Content depth | 3–5 hrs | Long-tail (pricing/cost/faq), page-1 consolidation | Week 1 |
| 3 — Schema | 1–2 hrs | Entity clarity; rich results *if* real ratings | Week 1–2 |
| 4 — GBP/local | Ongoing | Map pack + authority to challenge nyfta.org top-3 | Weeks 2+ |

**Success metrics (falsifiable, check GSC in 2–4 weeks):**
- "pizza truck" CTR rises past 2–3% (Phase 1 working)
- "pizza truck nyc" crosses from 11.x into single digits
- New impressions for "pizza truck cost/price nyc", "pizza truck wedding nyc"
- **If positions don't move after 4 weeks**, bottleneck is authority not on-page → shift all effort to Phase 4.

**Blocked-pending input:** (1) a starting price for Phase 2.2; (2) whether GBP reviews with ratings exist for Phase 3.2.

**Files touched:** `src/app/pizza-trucks/page.tsx` (primary), `src/app/layout.tsx` (schema), `src/app/page.tsx` (internal link), possibly `src/components/sections/testimonials-section.tsx` (reuse). No new routes, no dependencies.

---

# Audit Findings (appended 2026-07-13)

Two full-site SEO audits were run in parallel against the live site — the `claude-seo` plugin audit and the standalone deterministic `seo` audit. Both scored the site **~78–79/100 (Good)**: strong technical base (security headers 100/100, HTTPS+HSTS+CSP, valid sitemap/robots/canonicals, TTFB 144ms, mobile-first, homepage hero already LCP-optimized, blog correctly noindex+sitemap-excluded). The findings below are **new** items beyond Phases 1–4 above, deduped across both audits. Items marked ✅VERIFIED were confirmed by live HTTP check on 2026-07-13.

## High

| # | Finding | Evidence | Fix |
|---|---|---|---|
| A1 | ✅VERIFIED **`og:image` + `og:type` missing site-wide** — every social/link preview (FB, LinkedIn, iMessage, Slack) renders imageless. Root cause: each page's `openGraph`/`twitter` metadata object *replaces* (not deep-merges) the layout defaults, wiping `images`/`type`/`card`. The `OGImage.png` asset itself is valid (1200×630) — it's just never referenced on the pages. | Live `/` and `/pizza-trucks`: no `og:image`, no `og:type`. `layout.tsx:87-100` defines them; `page.tsx:22-27` & `pizza-trucks/page.tsx:18-23` override without `images`. | In each page's `openGraph`, re-declare `images: ['/OGImage.png']` (or a page-specific OG image), or centralize OG via a shared helper so pages only override title/description. |
| A2 | ✅VERIFIED **`twitter:card` downgraded to `summary` site-wide** (same override bug) — large-image cards never render. | Live `/` and `/pizza-trucks`: `<meta name="twitter:card" content="summary">`. `layout.tsx:98` sets `summary_large_image`. | Add `card: 'summary_large_image'` to each page `twitter` block, or stop overriding `twitter` per-page. |
| A3 | ✅VERIFIED **`/events` is in the sitemap but 307-redirects to `/catering`** — sitemaps must list only 200 canonical URLs; redirecting entries waste crawl budget and trigger GSC "Page with redirect". | `sitemap.ts:10` emits `/events`; live sitemap lists both `/events` and `/catering`; `curl /events` → `307 → /catering`. | Remove the `/events` entry from `sitemap.ts`. |
| A4 | **`/events`→`/catering` redirect is temporary (307/`permanent:false`)** — `/catering` never inherits `/events` link equity and Google keeps recrawling `/events`. | `next.config.ts:16` `permanent: false`. | Change to `permanent: true` (308/301) since events is permanently merged into catering. |
| A5 | **`/pizza-trucks` LCP hero is an unoptimized 1.4MB autoplay `<video>`** — no `poster`, no `preload`, and the hero `<Image fill>` shots lack `priority`. The `/catering` and `/mobile-bar` heroes already use `priority`, and the homepage uses the `hero-video.tsx` poster+`preload="none"` pattern — the money page was missed. Hurts mobile LCP/CLS + bandwidth. *(Both audits.)* | `pizza-trucks/page.tsx:99-124` raw `<video src="/gallery/4.mp4">`; contrast `catering/page.tsx:102`, `mobile-bar/page.tsx:180`, `hero-video.tsx:68,82`. `gallery/4.mp4` = 1.43MB. | Reuse `hero-video.tsx`/`LazyVideo` on `/pizza-trucks`: eager `priority` poster as the LCP element, `preload="none"` video, honors `prefers-reduced-motion`. |

## Medium

| # | Finding | Evidence | Fix |
|---|---|---|---|
| A6 | **Weak entity graph / no shared `@id`** — `Organization` has `sameAs: [Instagram]` only, no `@id`, no `contactPoint`, no `address`; the org is re-declared as `Service.provider` on `/pizza-trucks` with no `@id` link, so entities don't consolidate. Weakens knowledge panel + AI-search. *(Both audits.)* Complements Phase 3/4. | `layout.tsx:32-40`, `pizza-trucks/page.tsx:37-41`. | Add a stable `@id` (e.g. `…/#organization`) shared across all JSON-LD; add `contactPoint`, `address`, and expand `sameAs` (GBP, Yelp, Facebook, LinkedIn). |
| A7 | **LocalBusiness/CateringService schema is thin** — no `streetAddress`, `geo`, `image`, or `openingHours`; `priceRange` is an unconfirmed placeholder (`$$-$$$`). Weakens local/map eligibility. Distinct from the Phase 3 Service-schema + aggregateRating work. | `layout.tsx:42-57`, placeholder at `layout.tsx:29-30`. | Add `image`, `geo` (lat/lng), `openingHours`; confirm `priceRange` with client; add `streetAddress` if a physical/commissary address exists. |
| A8 | **Organization `logo` points to `OGImage.png` (1200×630 banner)** instead of the square `public/logo.png` that exists — Google's logo guideline prefers a near-square image; a wide banner may be rejected. | `layout.tsx:37`; `public/logo.png` (89KB) present. | Point `logo` to a square logo asset. |
| A9 | **26 external Unsplash stock images across 7 files** — hotlinked from images.unsplash.com. E-E-A-T/authenticity risk (not their real food/team), zero image-search value, 3rd-party perf dependency. Note: `/pizza-trucks` itself uses local `/trucks` + `/gallery` (good). | `grep images.unsplash.com src` → `page.tsx`, `about`, `catering`, `mobile-bar`, `contact`, `data/team.ts`, `data/events.ts`. | Replace with real, self-hosted, descriptively-named images + alt text — especially team photos. |
| A10 | **Non-descriptive numeric image filenames** (`/trucks/1.jpg`, `/gallery/4.mp4`, `/hero/1.jpg`) — forfeit image-search ranking for "nyc pizza truck" image queries. (Pairs with A9 as an "Image SEO" workstream.) | `public/trucks/*`, `public/gallery/*`, `public/hero/*`. | Rename to keyword-rich slugs (e.g. `nyc-neapolitan-pizza-truck.jpg`) and update references. |

## Low

| # | Finding | Evidence | Fix |
|---|---|---|---|
| A11 | **No `llms.txt`** (404) — cheap GEO/AI-discoverability win given AI-search is in scope. *(Both audits.)* | `curl /llms.txt` → 404. | Add a `/llms.txt` route summarizing services, service area (NYC/Tri-State), and key page URLs. |
| A12 | **No `BreadcrumbList` schema** on any page. | No `BreadcrumbList` in JSON-LD. | Add `BreadcrumbList` to service pages for SERP breadcrumbs + AI context. |
| A13 | **Canonical trailing-slash inconsistency** — homepage canonical `…newyorkfinefoods.com` (no slash) vs sitemap `<loc>` `…newyorkfinefoods.com/` (trailing slash). | `page.tsx:20` vs live `sitemap.xml`. | Standardize on one form across canonical + sitemap. |
| A14 | **Sitemap `lastmod` = build time for all static routes** (`new Date()`), identical across pages → weak freshness signal. | `sitemap.ts:8-14`; live sitemap all show same timestamp. | Use per-page real modified dates (constant map or git mtime). |
| A15 | **WebSite schema has no `potentialAction`/SearchAction; no web manifest or `theme-color`.** Minor polish. | `layout.tsx:59-64`; no manifest/themeColor in metadata. | Optional: add SearchAction if site search exists; add manifest + `theme-color`. |
| A16 | **Confirm `alt` text on content-bearing carousel images** — 7 `alt=""` hits; most decorative (fine), but verify `TruckCarousel` images carry descriptive alt for image SEO. | `grep alt=""` → 7 hits; `truck-carousel.tsx`. | Keep decorative alts empty; add descriptive alt to content images. |

## Not a defect — do NOT chase (verified positives)
- **Security headers: 100/100** — full CSP, HSTS, X-Frame DENY, Permissions-Policy, Referrer-Policy (via `proxy.ts`).
- **`OGImage.png` asset is valid** (1200×630, 28KB). The A1 problem is that pages don't *reference* it, not the asset.
- **TTFB 144ms, 0-hop redirect, canonicals present on all pages, homepage hero already LCP-optimized, blog correctly `noindex` + sitemap-excluded.**
- **robots.txt allows AI crawlers** (GPTBot/ClaudeBot/PerplexityBot inherit `allow:/`) — correct given the AI-search goal; leave as-is.

## Not run (both audits)
No DataForSEO / Moz / GSC / GA4 / CrUX / PageSpeed credentials were available, so there is **no live field CWV (LCP/INP/CLS), backlink profile, or indexation-coverage data** — all performance findings (A5) are code/asset-size heuristics (confidence: Likely). To get field data, set a `PAGESPEED_API_KEY` and re-run against `/` and `/pizza-trucks`.

## Suggested sequencing for audit items
- **Fold into Phase 1** (same file/PR as the title/H1 work): A1, A2 (metadata override — trivial and site-wide impact), A5 (pizza hero perf, since you're already editing that file).
- **Fold into Phase 3** (schema PR): A6, A7, A8, A12.
- **Quick wins, any time:** A3, A4 (sitemap/redirect — 2-line fix), A11, A13, A14.
- **Separate Image-SEO workstream:** A9 + A10 + A16.

---

# Live Keyword & SERP Data (DataForSEO, appended 2026-07-13)

Pulled live from DataForSEO (location: United States, language: en). This replaces the earlier "inferred difficulty" caveat with real numbers. **Headline: the entire niche is low-difficulty — the constraint is search volume, not competition.**

## Target keyword metrics (real volume / difficulty / intent)

| Keyword | Vol/mo | KD | Competition | CPC | Intent |
|---|---|---|---|---|---|
| **pizza truck near me** | **2,900** | 17 | Medium | $1.81 | transactional |
| **pizza truck catering** | **880** | 0 | Medium | $3.42 | commercial |
| neapolitan pizza truck | 170 | 2 | Low | $0.93 | navigational |
| pizza truck wedding | 110 | 7 | Medium | $2.04 | navigational |
| new york pizza truck | 90 | 4 | Low | $3.34 | navigational |
| **nyc pizza truck** | 90 | 1 | Low | $3.34 | navigational |
| pizza catering nyc | 90 | 0 | Medium | **$10.51** | commercial |
| pizza truck nyc | 90 | 3 | Low | $3.34 | navigational |
| rent a pizza truck | 40 | 12 | Medium | $1.16 | transactional |
| pizza truck cost | 30 | 0 | Low | $1.26 | commercial |
| pizza truck rental nyc | — | — | — | — | (no data / negligible) |

**Reading it:**
- The exact terms in the original request ("nyc/new york pizza truck", "pizza truck nyc") are **~90/mo each at KD 1–4** — trivially winnable but low traffic. Google labels them **navigational**, meaning many searchers already have a brand in mind (some of this is people looking for a known truck). Combined geo-cluster ≈ 270/mo.
- **The actual traffic prizes on the same page:** `pizza truck near me` (2,900, transactional — won via **Google Business Profile + map pack**, Phase 4, not organic on-page) and `pizza truck catering` (880, KD 0, commercial). `pizza catering nyc` has a **$10.51 CPC** = high buyer value despite low volume.

## Revised target priority for /pizza-trucks
1. **`pizza truck catering`** (880, KD 0) — make this a co-primary H1/title target alongside "NYC pizza truck". Zero difficulty, 10× the volume of the geo terms, commercial intent. _This shifts the Phase 1.1/1.2 title+H1 recommendation: lead with "NYC Pizza Truck **Catering**" — captures both._
2. **`pizza truck near me`** (2,900) — **not an on-page play**; it's transactional/local → owned via GBP + reviews (Phase 4). Biggest single prize; reinforces that GBP is the highest-volume lever.
3. **Geo head terms** (nyc/new york/pizza truck nyc, 90 each, KD 1–4) — easy wins, already covered by Phase 1 exact-match work.
4. **Long-tail on-page sections:** `neapolitan pizza truck` (170), `pizza truck wedding` (110), `pizza truck cost` (30, commercial) — all map to existing page content (Neapolitan angle, `idealFor` weddings, the Phase 2.2 pricing block).

## Live SERP — "nyc pizza truck" (159 organic results, US)

| Pos | Domain | Note |
|---|---|---|
| 1 | nyfta.org | aggregator (your directory-page competitor) |
| 2 | valduccispizza.com | established truck |
| 3 | pizzaluca.com | established truck |
| 4 | yelp.com | aggregator |
| 5 | instagram.com | Pizza Luca IG |
| 6–8 | itsapizzatruck.com (×2), eddiespizzany.com | established trucks |
| **9** | **instagram.com — New York Fine Foods** | **your own IG outranks your site** |
| 10 | bestfoodtrucks.com | aggregator |
| **11** | **newyorkfinefoods.com/pizza-trucks** | **← you** |
| 12–15 | jiannettospizza, roaminghunger, thepizzatruckny, eventcombo | trucks + aggregators |

- **Corroboration:** DataForSEO live #11 ≈ GSC avg 11.7 — consistent; this is your true position.
- **Your Instagram (#9) ranks above your website (#11).** The Phase 1 on-page work should push the site above its own IG, then past the aggregators at 10/8.
- SERP is **aggregator-heavy** (nyfta, yelp, bestfoodtrucks, roaminghunger, eventcombo). Being listed/optimized on those (you're already on nyfta + roaminghunger) is part of cracking the top 5 — reinforces Phase 4 citation work.
- No local pack returned for the US-wide query, but "pizza truck near me" (2,900) will trigger one → GBP priority.

## Domain footprint (DataForSEO ranked_keywords)
`newyorkfinefoods.com` ranks for only **16 keywords total** — a young, thin footprint with large headroom. Non-branded pizza terms all sit on `/pizza-trucks` (pos ~16–38 in DataForSEO's lagging DB; live SERP + GSC show ~#11 for the head term). Notable: `/contact` accidentally ranks #56 for "fine food" (1,600 vol, irrelevant — ignore). Branded terms ("new york fine foods", "…pizza truck") hold #1–2. **Implication:** nearly every keyword in the table above is net-new upside, not cannibalized.

## Cost & method
DataForSEO REST API (MCP server not connected), ~$0.03 total across 3 calls (keyword_overview, live SERP, ranked_keywords). Credentials supplied by user at runtime; not stored in repo.

## Backlink / authority comparison (DataForSEO backlinks, appended 2026-07-13)

Domain-level authority for you vs the "nyc pizza truck" SERP (DataForSEO Domain Rank scale ~0–1000; higher = more authority):

| Domain | SERP pos | Domain Rank | Backlinks | Referring domains |
|---|---|---|---|---|
| **newyorkfinefoods.com** | **#11** | **0** | **18** | **12** |
| nyfta.org | #1 | 296 | 4,248 | 1,059 |
| eddiespizzany.com | #7 | 160 | 397 | 170 |
| pizzaluca.com | #3 | 113 | 147 | 113 |
| valduccispizza.com | #2 | 110 | 146 | 105 |
| itsapizzatruck.com | #6 | 85 | 141 | 99 |

**What this settles:**
- **You have effectively zero link authority (Domain Rank 0, 12 referring domains) yet already rank #11.** That #11 is bought entirely with on-page relevance + brand signals, *no links*. Strongly confirms on-page work (Phase 1) has real room to move you up in this low-KD niche.
- **nyfta.org (#1) is unbeatable on links** — Domain Rank 296, 1,059 referring domains, ~88× your referring-domain count. Do **not** target beating it organically. The plan is correct: get listed on it (done), and win the **map pack** ("pizza truck near me", 2,900) + the **catering long-tail** ("pizza truck catering", 880 KD0) where authority matters less.
- **The established trucks at #2–#7 have 99–170 referring domains vs your 12.** To *hold* a top-5 organic spot for competitive/broad terms you'd need to close roughly an **85–160 referring-domain gap** — that's the real 3–6 month link-building cost, and it's Phase 4's justification.
- **Reconciling with KD:** the exact geo terms are KD 1–4 despite these authority-heavy competitors, because for that specific long-tail, exact-match + intent outweigh raw links. **Takeaway: you can reach top-5 for "nyc/new york pizza truck" on on-page alone; you cannot for "pizza truck near me"/broad terms without GBP + links.**

## Final effort verdict (data-backed)
- **"nyc / new york pizza truck" (the original ask):** LOW effort. KD 1–4, you're already #11 with DR 0. Phase 1 on-page → realistic top-5 in weeks. Ceiling is low volume (~90/mo each), not difficulty.
- **"pizza truck catering" (880, KD 0):** LOW effort, highest on-page ROI — re-target the page title/H1 to include it.
- **"pizza truck near me" (2,900):** MEDIUM effort, GBP-dependent, not on-page. Biggest traffic prize.
- **Cracking/holding top-5 for broad terms:** the only HIGH-effort part — needs an ~85-160 referring-domain link-building campaign (Phase 4).

Total DataForSEO spend this session ~$0.10 (6 calls); credentials runtime-only, not stored.
