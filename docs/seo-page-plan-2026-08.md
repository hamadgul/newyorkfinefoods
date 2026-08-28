# New Page Plan — Data-Backed SEO Expansion (2026-08-27)

All keyword data pulled live from the **DataForSEO API** on 2026-08-27.
Volumes are **New York, NY DMA (location_code 200501)** monthly searches unless
marked "US". Difficulty (KD) is national, 0–100. SERP checks ran against
`New York,New York,United States`, desktop, depth 20.

---

## 1. The actual problem

The site is not suffering from an on-page optimization problem. It has a
**content footprint problem.**

| Metric | newyorkfinefoods.com | itsapizzatruck.com | nyfta.org |
|---|---|---|---|
| Ranked keywords (US) | **29** | 460 | 3,875 |
| Est. organic traffic | **~85 ETV** | 1,950 | 71,873 |
| Indexable pages | **6** | — | — |

Of those 29 keywords, only three sit on page one, and all three are branded
(`new york fine foods`, `new york fine foods pizza truck`, `new york foods
catering`). Everything commercial ranks between position 16 and 76.

You cannot rank for terms you have no page for. Right now there is one generic
`/catering` page trying to serve a market that searches by **borough** and by
**occasion**, and Google has nothing specific to rank.

### The second problem: every SERP has a local pack

Every commercial SERP checked returns `local_pack` above the organic results.
Organic position 1 is visually position 4.

```
catering brooklyn        → local_pack, organic, people_also_ask, related_searches
corporate catering nyc   → local_pack, organic, people_also_ask, related_searches
pizza truck for parties  → local_pack, organic, people_also_ask, images, related_searches
staten island catering   → local_pack, organic, people_also_ask, related_searches
pizza truck long island  → local_pack, organic, people_also_ask, related_searches
```

**There is no claimed Google Business Profile.** That is the single largest
ranking constraint on this business and no amount of page-writing reaches it.
It is Step 0 below.

---

## 2. Step 0 — Google Business Profile (do this first, it is not code)

This outranks every other item on this page in expected value.

1. Claim the profile at business.google.com.
2. Primary category: **Caterer**. Secondary: *Food truck*, *Bartending service*,
   *Party planner*.
3. Set a **service area** (not a storefront address) covering the five boroughs,
   Long Island, Westchester, northern New Jersey, Hudson Valley, and Fairfield
   County CT — matching the confirmed service area.
4. NAP must match the site exactly: `New York Fine Foods` / `(516) 205-7629`.
5. Get reviews. The local pack ranks substantially on review count and velocity.
   Ten real reviews moves this business more than ten new pages will.
6. Post the real event photos (see §6 — the site currently runs 26 Unsplash
   stock images).

Until this exists, the pages below compete for positions 4–10 only.

---

## 3. Opportunity map

### Cluster A — Borough & regional catering (the biggest prize)

`/catering` currently targets nothing geographically. The market searches by place.

| Target keyword | NYC vol/mo | KD | CPC | Page |
|---|---|---|---|---|
| catering brooklyn | **1,300** | 17 | $10.51 | `/catering/brooklyn` |
| staten island catering | **480** | **0** | $5.57 | `/catering/staten-island` |
| long island catering | **320** | **0** | $7.13 | `/catering/long-island` |
| new jersey catering | 320 | 23 | $7.44 | `/catering/new-jersey` |
| catering bronx | 260 | **0** | $6.85 | `/catering/bronx` |
| catering queens | 170 | **0** | $6.64 | `/catering/queens` |
| westchester catering | 170 | 7 | $7.18 | `/catering/westchester` |
| manhattan catering | 110 | 4 | $19.17 | `/catering/manhattan` |
| hudson valley catering | 90 | 19 | $4.95 | `/catering/hudson-valley` |
| connecticut catering | 50 | **0** | $4.26 | `/catering/connecticut` |
| **Cluster total** | **3,270** | | | |

Plus the hub term itself: **`nyc catering` — 1,900/mo, KD 3, $18.24 CPC.**
The site does not rank for it at all today.

**Why this is winnable.** The `catering brooklyn` SERP is held by small
independent restaurant sites — `poppysbrooklyn.com` (p4),
`soulspotrestaurant.com` (p5), `katieosoulfood.com` (p11),
`bassettcaterers.com` (p10). These are single-location delis with a catering
tab, not SEO operations. `staten island catering` is the same picture:
`auntbutchiesofbrooklyn.com`, `townedelipizzasi.com`, `frankandsal.com`.

Note `campbellandco.nyc` ranks p17 for `catering brooklyn` **and** p13 for
`corporate catering nyc`. That is exactly the borough-page + occasion-page
architecture proposed here, and it works on a domain no stronger than yours.

### Cluster B — Corporate (lowest volume, highest value)

| Target keyword | NYC vol/mo | KD | CPC |
|---|---|---|---|
| corporate event catering | 110 | **0** | **$53.59** |
| corporate catering nyc | 110 | 35 | **$30.24** |
| office party catering | 50 | 37 | — |
| nyc food truck catering | 40 | 16 | $18.53 |

The highest CPCs in the entire dataset. A single booked office account repeats
monthly; the lifetime value dwarfs a one-off party. `corporate event catering`
at **KD 0 with a $53.59 CPC** is the most mispriced keyword found.

Competitors are dedicated: `savory.com`, `metrocateringnyc.com`, `mangia.nyc`,
`relishcaterers.com`. They all have a standalone corporate page. You do not.

→ **`/corporate-catering`**

### Cluster C — Pizza truck occasion & geo spokes

`/pizza-trucks` already ranks (p16 `pizza truck nyc`, p20 `pizza truck new
york`, p25 `pizza truck`). It is a proven asset. Spokes extend it without
touching the slug.

| Target keyword | Vol/mo | KD | Note |
|---|---|---|---|
| pizza truck for parties | 210 NYC | 12 | `thepizzatruckny.com` p4 |
| pizza truck long island | 210 NYC | **0** | you rank **p50** already |
| pizza truck connecticut | 110 NYC | 8 | you do not rank |
| pizza catering wedding | 880 US | **0** | `itsapizzatruck.com` p8 |
| pizza truck for weddings | 210 US | 9 | `itsapizzatruck.com` p4 |
| wedding pizza truck | 90 US | 9 | `itsapizzatruck.com` p4 |
| pizza truck westchester | 40 NYC | — | you rank **p50** already |
| mobile pizza oven catering | 480 US | 5 | |
| pizza truck rental / rent a pizza truck | 50 + 50 | 9 | |

**The wedding cluster is the clearest single gap.** `itsapizzatruck.com` holds
p4–p8 across the whole wedding set with dedicated pages. You have zero wedding
content and the word "Weddings" appears only as a chip in an `idealFor` list.

The `pizza truck long island` SERP is entirely small dedicated local sites with
geo-specific pages — `oakandemberpizza.com` ("Long Island, New York"),
`enzosexpress.com` ("pizza truck | Long Island"), `pizzatruckhamptons.com`.
Geo landing pages are the demonstrated winning pattern in this niche.

→ `/pizza-trucks/weddings`, `/pizza-trucks/parties`,
  `/pizza-trucks/long-island`, `/pizza-trucks/connecticut`

### Cluster D — Bar & bartending

`/mobile-bar` exists but ranks p52 for `drop off service bar nyc` and p76 for
`new york pick up bars` — it is not targeting its own money terms.

| Target keyword | NYC vol/mo | KD | CPC |
|---|---|---|---|
| bartender for hire | 320 | — | $7.97 |
| bartender for hire nyc | 170 | **0** | $13.63 |
| open bar package nyc | 110 | **0** | $5.62 |
| mobile bar nyc | 70 | 2 | $6.25 |
| nyc bartending service | 30 | — | **$24.02** |

The existing page already has genuinely strong material (TIPS-certified staff,
liquor liability insurance, permits handled, $26–$62 open bar tiers). It is
under-targeted, not under-built.

→ **`/mobile-bar/bartenders`** + retitle the existing page.

### Cluster E — Money questions (People Also Ask)

Harvested live from the PAA boxes on the SERPs above:

- "How much does a pizza truck cost for a party?"
- "What's the average catering cost for 100 people?"
- "How much will it cost to cater for 30 people?"
- "What is the cheapest option for catering?"
- "Is there a mobile pizza truck on Long Island?"
- "Where can I find catered food on Staten Island?"

Supporting: `pizza truck cost`, `how much does a pizza truck cost`,
`catering prices wedding` (4,400 US, KD 3), `cost of catering for wedding`
(4,400 US, KD 4).

`/blog` is currently `robots: noindex` with zero posts. These questions are the
right first three posts — high intent, cheap to rank, and heavily cited by AI
answer engines.

---

## 4. Build order

Sequenced by expected value per hour of work.

| # | Page | Primary target | Vol | KD |
|---|---|---|---|---|
| **0** | *Google Business Profile* | — | — | — |
| 1 | `/catering/brooklyn` | catering brooklyn | 1,300 | 17 |
| 2 | `/corporate-catering` | corporate event catering | 110 | 0 |
| 3 | `/catering/staten-island` | staten island catering | 480 | 0 |
| 4 | `/pizza-trucks/weddings` | pizza catering wedding | 880 US | 0 |
| 5 | `/catering/long-island` | long island catering | 320 | 0 |
| 6 | `/pizza-trucks/parties` | pizza truck for parties | 210 | 12 |
| 7 | `/pizza-trucks/long-island` | pizza truck long island | 210 | 0 |
| 8 | `/catering/queens` `/bronx` `/manhattan` | — | 540 | 0–4 |
| 9 | `/catering/westchester` `/new-jersey` | — | 490 | 7–23 |
| 10 | `/mobile-bar/bartenders` | bartender for hire nyc | 170 | 0 |
| 11 | `/catering/hudson-valley` `/connecticut` | — | 140 | 0–19 |
| 12 | `/pizza-trucks/connecticut` | pizza truck connecticut | 110 | 8 |
| 13 | Blog: 3 cost posts | PAA cluster | — | — |

**Addressable demand: ~6,500 searches/mo in NYC metro**, against ~85 estimated
visits today.

---

## 5. Architecture rules (do not skip these)

**Hub and spoke.** `/catering` becomes a hub targeting `nyc catering`
(1,900/mo, KD 3) and links down to every borough spoke with keyword anchor
text. Each spoke links back up and sideways to two sibling boroughs. Same for
`/pizza-trucks`.

**No slug changes.** `/pizza-trucks` and `/catering` already hold equity. New
pages are children, never renames.

**Thin-content is the real risk.** Ten borough pages built from one template
with the place name swapped is a doorway-page pattern, and Google demotes it.
Every borough page must carry material that is *only true of that borough* —
the venue types, the access and parking reality, the neighborhoods, the
permit facts. §2 of the copy doc gives each page its own differentiation angle
for exactly this reason. **If a borough page could have its name find-replaced
and still read correctly, it is not finished.**

**Cannibalization.** `/catering/*` owns geo + catering. `/pizza-trucks/*` owns
pizza. `/corporate-catering` owns corporate. Where they overlap
(`nyc food truck catering`), `/pizza-trucks` is canonical.

**Schema per page type.** Borough pages get `Service` with `areaServed` set to
that specific `City`/`AdministrativeArea` — not the generic "New York City"
string used today. Add `BreadcrumbList` on every spoke. Do **not** add
`FAQPage` for rich results (retired May 2026); the FAQ blocks are for depth and
AI citation. Do **not** add `aggregateRating` until real GBP reviews exist.

---

## 6. Honesty constraints carried into the copy

These are load-bearing — the copy in the companion doc respects all of them.

- **Do not reuse the About-page stats.** `2,500+ Events Catered`,
  `30+ Years of Experience`, `98% Client Satisfaction`, `50+ Team Members` are
  unverified and sit alongside four team members with Unsplash stock
  headshots. None appear in the new copy. Verify or remove them.
- **Verified facts that may be used freely:** phone (516) 205-7629; open bar
  $26/$34/$45/$62 per person; dry hire $22/$28/$35; pizza truck from $1,500;
  900°F ovens, 90-second cook, 14" and 10" pies, 25 to 5,000 guests;
  TIPS-certified bartenders; liquor liability insurance and Caterer's Alcohol
  Permit handled; setup 60–90 min early; full breakdown and cleanup.
- **No fabricated reviews or ratings.** The four existing testimonials are
  reusable; no new ones invented.
- **No invented pricing.** Where catering tray pricing is needed, the copy
  points to the live menu rather than quoting numbers.

---

## 7. Measurement

Baseline captured 2026-08-27: **29 ranked keywords, ~85 ETV.**

Re-pull at 30/60/90 days:

```bash
curl -s -X POST -u "$DATAFORSEO_USERNAME:$DATAFORSEO_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '[{"target":"newyorkfinefoods.com","location_code":2840,"language_code":"en","limit":200}]' \
  https://api.dataforseo.com/v3/dataforseo_labs/google/ranked_keywords/live
```

Leading indicators, in the order they should move: GBP impressions → borough
page indexation → long-tail rankings (KD 0 terms first) → `catering brooklyn`
and `nyc catering`.

Total API spend for this research: **~$0.42**.
