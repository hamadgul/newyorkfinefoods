# GEO Audit Report: New York Fine Foods

**Audit Date:** 2026-10-08
**URL:** https://www.newyorkfinefoods.com
**Business Type:** Local Business (service-area) — pizza truck, catering, mobile bar
**Pages Analyzed:** 26 (full sitemap; all HTTP 200, all server-rendered)

---

## Executive Summary

**Overall GEO Score: 49/100 (Poor)**

The site itself is technically sound and its best content (blog cost guides, FAQs, pricing blocks) is genuinely quotable — AI crawlers have unrestricted access and every page ships its full text in raw HTML. The score is dragged down by what lives *off* the site: almost no third-party footprint, no Google Business Profile, a brand history that conflicts across listings, and on-site trust signals (About stats, 5-star testimonials) that cannot be verified. In live buyer queries, AI answers surface the brand only via BestFoodTrucks/Zola/NYFTA listings — never the domain itself.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 72/100 | 25% | 18.0 |
| Brand Authority | 12/100 | 20% | 2.4 |
| Content E-E-A-T | 44/100 | 20% | 8.8 |
| Technical GEO | 86/100 | 15% | 12.9 |
| Schema & Structured Data | 43/100 | 10% | 4.3 |
| Platform Optimization | 25/100 | 10% | 2.5 |
| **Overall GEO Score** | | | **48.9 ≈ 49/100** |

---

## Critical Issues (Fix Immediately)

1. **No Google Business Profile; domain not surfacing in search/AI answers.** Every commercial SERP shows a local pack above organic; Gemini/AI Mode pull local answers from GBP. A `site:newyorkfinefoods.com` web search during this audit returned zero pages. **Fix:** claim GBP as a service-area business (hide address, list all service areas); verify in Bing Webmaster Tools, submit sitemap, add IndexNow.

2. **Conflicting brand facts across the web.** Zola: "formerly Neapolitan Express", "over 10 years", Long Island City, "$25 per person". BestFoodTrucks: "30+ years". Site: "born in 2010", "Marco founded NYFF", "packages start at $1,500". AI models skip or hedge on entities with contradictory facts. **Fix:** owner settles one founding story/year/location/price floor; apply it on `/about`, schema, and every listing. *Open question for the owner: is the company the former Neapolitan Express?* If yes, stating it (plus `alternateName` + `foundingDate` in schema) reconnects 2013–2017 press (Time Out NY, DNAinfo, The Daily Meal, EV Grieve). If no, correct the Zola listing.

3. **Unverifiable trust signals on `/about`.** `src/data/team.ts:40-42` — "2,500+ Events / 30+ Years / 98% Client Satisfaction" — contradicts the same page's "born in 2010" (`src/app/about/page.tsx:72`). **Fix:** remove, or replace with figures the owner can source.

4. **Hardcoded 5-star rating on every testimonial.** `src/components/sections/testimonials-section.tsx:4-24` renders `aria-label="5 out of 5 stars"` with no rating data, on `/`, `/pizza-trucks`, pizza spokes, `/corporate-catering`. Quotes are unattributed/unsourced. **Fix:** delete `StarRating` (or render only from real data); replace quotes with the 4 real Zola reviews (quoted + linked) or GBP reviews once live.

5. **Invalid LocalBusiness subtype + narrow service area.** `src/app/layout.tsx:53` uses `CateringService` (not a schema.org type); `:67` `areaServed: 'New York City'` omits LI, Westchester, NJ, CT, Hudson Valley. **Fix:** `["LocalBusiness","FoodEstablishment"]` + full `areaServed` array (snippet in Schema section).

## High Priority Issues

- **Brand absent from AI-cited third-party sources:** Yelp, Thumbtack, The Knot, WeddingWire, Reddit, YouTube, LinkedIn, Facebook, Roaming Hunger, corporate-catering listicles (Fooda, ZeroCater). Create listings with identical facts; request reviews from recent clients.
- **`sameAs` = Instagram only** (`layout.tsx:48`). Add Zola + BestFoodTrucks now; GBP/Yelp/etc. as created. Never list profiles that don't exist.
- **No named person anywhere.** Blog `author` is the Organization (`src/app/blog/[slug]/page.tsx:85`); team section is commented out. Add one real owner/chef bio + `Person` schema; byline blog posts.
- **`llms.txt` covers 6 of 26 pages**, omits Hudson Valley, mobile-bar pricing, lead times; `/llms-full.txt` is 404. Add `## Areas`, `## Guides`, `## Optional` sections; consider generating both at build from `src/data`.
- **Entity graph split:** `Service.provider` → `#organization`, never `#localbusiness`; WebSite has no `@id`/`publisher`; `/mobile-bar` provider has no `@id` (`src/app/mobile-bar/page.tsx:44-48`).
- **Blog Article schema missing `image`**; `dateModified` always equals `datePublished` (`blog/[slug]/page.tsx:78-90`).
- **Homepage, `/about`, `/contact` have no `og:image`** and use `summary` Twitter card — page-level `openGraph` overrides layout defaults (`src/app/page.tsx:22-32`, `about/page.tsx:17-27`, `contact/page.tsx:14-24`).
- **21/28 product photos on `/pizza-trucks` have `alt=""`** (`src/components/sections/truck-carousel.tsx:99`).
- **Licensing/insurance claimed but not shown** (TIPS, liquor liability, COI, Caterer's permit). Add a "Licensed & Insured" block; feature on `/corporate-catering`.
- **No privacy policy or terms page** despite a contact form collecting personal data.

## Medium Priority Issues

- `/catering` FAQ dodges "cost for 100 people" — the single most-asked question. Answer with a real range.
- Few question-shaped H2s on service/area pages; add one 40–60-word answer block near the top of each.
- No FAQPage schema (deliberate). Google no longer shows FAQ rich results for commercial sites, but Bing/ChatGPT/Perplexity still parse Q&A pairs — revisit the trade-off.
- `areaServed` inconsistent across pages; only `/catering` lists the full region. Centralize in `src/data/service-areas.ts`.
- No `AboutPage` / `ContactPage` / `Blog` schema or breadcrumbs on `/about`, `/contact`, `/blog`; no breadcrumbs on `/mobile-bar`.
- `/catering` + `/mobile-bar` hero grids: 4 × `<Image fill priority>` with no `sizes` (`catering/page.tsx:168`, `mobile-bar/page.tsx:192`) — LCP risk on mobile.
- Apex `https://newyorkfinefoods.com` → www is a **307** (temporary); http apex is two hops. Set permanent 308 in Vercel Domains.
- `/contact` meta description renders a literal `&amp;` (`contact/page.tsx:10,17,23`) — use `&`.
- Titles over 60 chars: `/blog/pizza-truck-vs-traditional-catering` (82), `/mobile-bar` (69).
- Oven described as both "wood-fired" and fuel-agnostic in different pages — pick one.
- Thin pages: `/about` 307 words (mostly generic values copy), `/contact` 159.
- Unsupported scale claims ("5,000 guests", "1,000-guest galas") — back with a named event or soften.
- No outbound citations anywhere (only external link is the developer credit). Cite NYC DOHMH/SAPO in cost posts.
- No `speakable` markup; no YouTube channel despite existing truck video.

## Low Priority Issues

- Concatenated H1 text in raw HTML ("Exceptional FoodUnforgettable Events", "NYC Pizza TruckCatering", "The BarComes to You") — add `{" "}` before `<br />` (`hero-video.tsx:125-127`, `pizza-trucks/page.tsx:221`, `mobile-bar/page.tsx:203`).
- No `msvalidate.01` / IndexNow key.
- `not-found.tsx` inherits homepage title.
- Telephone not in E.164 (`+1-516-205-7629`); 516 area code vs. `addressLocality: New York` — reconcile with GBP.
- Two Connecticut pages share a near-identical sentence (`areas-tristate.ts:306`, `pizza-truck-pages.ts:302`).
- `/catering/manhattan` has no local image (other 9 do).
- Stock Unsplash imagery on `/about`, `/catering`, `/mobile-bar`, `/`, `/contact`.
- Optional: `Content-Signal:` line in robots.txt.

---

## Category Deep Dives

### AI Citability (72/100)

Best-in-class for a local caterer on the blog and FAQ content; generic on hubs.

**Strong (keep this pattern):**
- `/blog/pizza-truck-vs-traditional-catering`: *"Short version: a pizza truck wins at outdoor, informal, long-running events at venues without a kitchen. Traditional catering wins at formal, seated, indoor events…"*
- `/blog/pizza-truck-cost-party-nyc`: *"Pizza truck catering with New York Fine Foods starts at $1,500. That covers the truck, the wood-fired oven and its fuel, a professional crew…"*
- `/pizza-trucks` FAQ: 25 → 5,000+ guests; "book 4–8 weeks ahead… spring, early summer, and December book up fastest."
- `/mobile-bar` worked pricing example (75 guests × 5 hrs in Brooklyn = $3,375).

**Weak → rewrite:**
- `/catering` FAQ "average cost for 100 people": *"It depends… we'll quote it properly rather than give you a range that means nothing."* → give the tray-based range per guest, the full-service floor, and the $1,500 pizza-truck alternative.
- Home intro: *"restaurant-quality cuisine… flawless service from 20 to 1,000 guests"* → a definitional sentence naming services + full service area.
- `/catering` "The Food Speaks for Itself" → replace with what a half/full tray feeds and order lead time.
- Put mobile-bar price tiers in a semantic `<table>`.

**Gap with no competitor:** no source answers "how much does a pizza truck cost NYC" for *rental* (results are about buying trucks). The existing cost post targets it exactly — it just isn't indexed/surfaced yet.

### Brand Authority (12/100)

| Platform | Status |
|---|---|
| Wikipedia / Wikidata | None (former name "Neapolitan Express" mentioned in passing in 3 articles) |
| Google Business Profile | Not claimed |
| Yelp / Thumbtack / The Knot / WeddingWire | Not found |
| Zola | Listed — 5.0 (4 reviews), no website link, conflicting facts |
| BestFoodTrucks / NYFTA | Listed — conflicting years / pizza size |
| Instagram | Present (only `sameAs`) |
| Reddit / YouTube / LinkedIn / Facebook / TikTok | Not found |
| Press | Only under former name (2013–2017), if the link is confirmed |

Unrelated similarly named businesses excluded: Clemente's, Ceriello, DiPalo, A&S Fine Foods, NYC Pizza Truck.

### Content E-E-A-T (44/100)

Experience 10/25 · Expertise 7/25 · Authoritativeness 5/25 · Trustworthiness 11/25.

- **Strengths:** borough pages are genuinely differentiated (26–31% 5-gram overlap with place names masked; mostly shared menu/CTA/FAQ blocks) — not a doorway pattern. Pricing is transparent. Voice is human and opinionated (blog Flesch ≈ 63–68).
- **Weaknesses:** no named person; unverifiable stats and ratings; stock imagery; no licensing proof; no privacy/terms; zero citations; no first-person event stories or named venues; only 3 blog posts, all dated 2026-08-25..27.

### Technical GEO (86/100)

| Sub-area | Score |
|---|---|
| Server-side rendering | 96 |
| Meta tags & indexability | 72 |
| Crawlability | 85 |
| Security headers | 100 |
| Core Web Vitals risk (estimated; PSI quota exceeded) | 65 |
| Mobile | 90 |
| URL structure | 95 |

- **AI crawler access: 100.** `robots.txt` = `User-Agent: * / Allow: /`. Live requests with GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, bingbot, CCBot all returned 200 with identical bytes — no WAF challenge, no `X-Robots-Tag`.
- Canonicals consistent (www, no trailing slash); trailing-slash/http/`/events` → 308; real 404 with `noindex`; hero video poster-first + reduced-motion aware; full security header set (HSTS, CSP, XFO DENY, nosniff, Referrer-Policy, Permissions-Policy).
- Gaps: OG images (3 pages), carousel alt text, hero-grid `sizes`/`priority`, 307 apex redirect, `&amp;` on `/contact`, long titles, no Bing verification.

### Schema & Structured Data (43/100)

All 26 pages emit valid, SSR JSON-LD; no deprecated types. Present: Organization, LocalBusiness (invalid subtype), WebSite, Service (+OfferCatalog/MenuItem/Offer/PriceSpecification), BreadcrumbList, Article/WebPage/ImageObject. Missing: Person, speakable, AboutPage/ContactPage/Blog, FAQPage (deliberate), Review/AggregateRating (correctly absent — no real data).

**Fix 1 — `src/app/layout.tsx:51-69`:**
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FoodEstablishment"],
  "@id": "https://www.newyorkfinefoods.com/#localbusiness",
  "name": "New York Fine Foods",
  "url": "https://www.newyorkfinefoods.com",
  "logo": "https://www.newyorkfinefoods.com/logo.png",
  "image": "https://www.newyorkfinefoods.com/OGImage.png",
  "telephone": "+1-516-205-7629",
  "servesCuisine": ["Pizza", "Italian", "American"],
  "parentOrganization": { "@id": "https://www.newyorkfinefoods.com/#organization" },
  "address": { "@type": "PostalAddress", "addressLocality": "New York", "addressRegion": "NY", "addressCountry": "US" },
  "areaServed": [
    { "@type": "City", "name": "Manhattan" }, { "@type": "City", "name": "Brooklyn" },
    { "@type": "City", "name": "Queens" }, { "@type": "City", "name": "The Bronx" },
    { "@type": "City", "name": "Staten Island" },
    { "@type": "AdministrativeArea", "name": "Long Island" },
    { "@type": "AdministrativeArea", "name": "Westchester County" },
    { "@type": "AdministrativeArea", "name": "Hudson Valley" },
    { "@type": "State", "name": "New Jersey" },
    { "@type": "State", "name": "Connecticut" }
  ],
  "sameAs": ["https://www.instagram.com/newyorkfinefoods"]
}
```
Plus `"@id": ".../#website"` and `"publisher": {"@id": ".../#organization"}` on WebSite.

**Fix 2 — `src/app/blog/[slug]/page.tsx:78-90`:** switch to `BlogPosting` with `image`, a real `dateModified`, a `Person` author (`worksFor` → `#organization`), and `speakable` on the H1 + first paragraph.

**Fix 3 — `src/app/mobile-bar/page.tsx`:** add `@id` to provider; add BreadcrumbList (pattern from `catering/page.tsx:69`). Same for `/about` (AboutPage), `/contact` (ContactPage), `/blog`.

### Platform Optimization (25/100)

| Platform | Score | Main blocker |
|---|---|---|
| Google AI Overviews / AI Mode | 30 | Few pages indexed; no GBP for the local pack |
| ChatGPT search | 24 | Domain not surfacing in Bing-backed index; thin entity |
| Perplexity | 28 | No Reddit/forum/review footprint |
| Gemini | 18 | No GBP, YouTube, or Knowledge Graph entity |
| Bing Copilot | 22 | No Bing Webmaster verification / IndexNow |

**Live query results (who gets cited instead):**
- "best pizza truck catering NYC" → bestfoodtrucks.com, roaminghunger.com, nyfta.org (brand appears only via BFT listing)
- "pizza truck for wedding Long Island" → Zola, WeddingWire, hungryonion.org (brand absent)
- "corporate catering Manhattan" → fooda.com, zerocater.com, tryperdiem.com (absent)
- "mobile bar rental NYC" → Thumbtack, The Knot, GigSalad, Zola (absent)
- "how much does a pizza truck cost NYC" → only truck-*purchase* articles (open gap)

---

## Quick Wins (Implement This Week)

1. **Claim Google Business Profile** + verify Bing Webmaster Tools and submit the sitemap — the single largest lever for Gemini, AI Mode, ChatGPT and Copilot.
2. **Remove the hardcoded `StarRating`** and the unsourced `/about` stats block — eliminates the two fabricated-signal risks in < 30 min of code.
3. **Fix the LocalBusiness schema** (`FoodEstablishment` + full `areaServed` + `@id` graph links) in `layout.tsx`.
4. **Expand `llms.txt`** to all 26 pages + Hudson Valley + bar pricing/lead times; add `llms-full.txt`.
5. **Correct the Zola / BestFoodTrucks / NYFTA listings** to match the site, add the website link on Zola, and add both to `sameAs`.
6. Small code fixes in one PR: OG images on 3 pages, carousel alt text, `&amp;` on `/contact`, H1 `{" "}` spacing, two long titles, hero-grid `sizes`.

## 30-Day Action Plan

### Week 1: Entity foundation & honesty fixes
- [ ] Claim + verify Google Business Profile (service-area, all regions)
- [ ] Verify Bing Webmaster Tools; submit sitemap; add IndexNow key
- [ ] Owner decides the canonical founding story (Neapolitan Express question)
- [ ] Remove `StarRating` and unsourced About stats
- [ ] Ship schema fixes 1–3 and the small technical-fix PR

### Week 2: Third-party footprint
- [ ] Create Yelp, The Knot, WeddingWire, Thumbtack (pizza + bar) listings with identical NAP/facts
- [ ] Fix Zola/BFT/NYFTA facts; add website links
- [ ] Update `sameAs` with every live profile
- [ ] Ask 5–10 recent clients for reviews on GBP/Yelp/The Knot

### Week 3: E-E-A-T content
- [ ] Owner/chef bio with real photo on `/about` (600+ words, named events/venues) + `Person` schema
- [ ] Byline all blog posts; add real `dateModified`
- [ ] "Licensed & Insured" block; privacy + terms pages
- [ ] Replace stock imagery with real truck/event photos

### Week 4: Citability & platform reach
- [ ] Answer "catering cost for 100 people" with real ranges on `/catering`
- [ ] Add one question-shaped H2 + 40–60-word answer to each service/area page
- [ ] Upload truck footage to YouTube; embed on matching landing pages
- [ ] Pitch Roaming Hunger, NYFTA guides, Fooda/ZeroCater lists; answer genuine r/AskNYC / r/LongIsland threads (no astroturfing)
- [ ] Publish 1–2 new guides (NYC pizza-truck permits; wedding late-night food)

---

## Appendix: Pages Analyzed

| URL | Title | Words | GEO Issues |
|---|---|---|---|
| / | New York Fine Foods \| NYC Catering & Pizza Trucks | 612 | 5 (no og:image, summary card, H1 spacing, generic intro, testimonial stars) |
| /catering | NYC Catering \| New York Fine Foods | 756 | 4 (cost FAQ dodge, 4 stock imgs no-alt, hero `sizes`/priority, generic copy) |
| /pizza-trucks | NYC Pizza Truck Rental & Catering \| New York Fine Foods | 1,237 | 4 (21 imgs no alt, H1 spacing, areaServed strings, testimonial stars) |
| /corporate-catering | Corporate Catering NYC \| New York Fine Foods | 849 | 2 (no Hudson Valley in areaServed, testimonial stars) |
| /mobile-bar | Mobile Bar & Bartenders NYC \| Open Bar Packages \| … | 860 | 5 (69-char title, H1 spacing, provider no @id, no breadcrumbs, hero `sizes`) |
| /mobile-bar/bartenders | Bartender for Hire NYC \| TIPS-Certified Bartenders | 703 | 1 (areaServed) |
| /blog | Catering & Pizza Truck Guides \| New York Fine Foods | 287 | 2 (no Blog schema, thin) |
| /about | About \| New York Fine Foods | 307 | 6 (unverified stats, stock photo, no person, thin, no og:image, no AboutPage) |
| /contact | Contact \| New York Fine Foods | 159 | 4 (`&amp;` in meta, no og:image, thin, no ContactPage) |
| /catering/brooklyn | Brooklyn Catering \| New York Fine Foods | 689 | 1 (question-shaped H2) |
| /catering/staten-island | Staten Island Catering \| … | 643 | 1 |
| /catering/queens | Queens Catering \| … | 666 | 1 |
| /catering/bronx | Bronx Catering \| … | 642 | 1 |
| /catering/manhattan | Manhattan Catering \| … | 678 | 2 (no local image) |
| /catering/long-island | Long Island Catering \| … | 673 | 1 |
| /catering/westchester | Westchester Catering \| … | 657 | 1 |
| /catering/new-jersey | New Jersey Catering \| … | 646 | 1 |
| /catering/hudson-valley | Hudson Valley Catering \| … | 691 | 1 |
| /catering/connecticut | Connecticut Catering \| … | 633 | 2 (duplicate sentence w/ pizza CT) |
| /pizza-trucks/weddings | Pizza Truck Weddings \| Wedding Pizza Catering NYC | 807 | 2 (testimonial stars, areaServed) |
| /pizza-trucks/parties | Pizza Truck for Parties \| NYC Party Pizza Catering | 802 | 2 |
| /pizza-trucks/long-island | Long Island Pizza Truck \| Nassau & Suffolk Catering | 853 | 2 |
| /pizza-trucks/connecticut | Connecticut Pizza Truck \| Fairfield County Catering | 765 | 3 (duplicate sentence) |
| /blog/pizza-truck-cost-party-nyc | How Much Does a Pizza Truck Cost for a Party? \| … | 771 | 3 (org author, no schema image, no citations) |
| /blog/catering-cost-100-people-nyc | What Does Catering Cost for 100 People in NYC? \| … | 836 | 3 |
| /blog/pizza-truck-vs-traditional-catering | Pizza Truck vs. Traditional Catering: … | 898 | 4 (82-char title + above) |

**Fetch failures:** none. `/llms-full.txt` → 404 (not a crawl failure; file absent). PageSpeed Insights API quota exceeded — Core Web Vitals estimated from markup, not measured.
