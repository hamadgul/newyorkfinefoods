import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { serviceAreas } from '@/data/service-areas'
import { pizzaTruckPages } from '@/data/pizza-truck-pages'

const BASE = 'https://www.newyorkfinefoods.com'

// Stable per-page modified dates (bump the relevant entry when a page's content
// changes). Using a constant avoids the "lastmod = build time for every page"
// churn that gives Google a weak, identical freshness signal on every deploy.
const LAST_MODIFIED = '2026-07-22'
const PIZZA_TRUCKS_MODIFIED = '2026-07-22'
// Borough/occasion landing pages, the /catering hub rewrite and the blog all
// shipped together in the 2026-08 search expansion.
const EXPANSION_MODIFIED = '2026-08-27'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}`,                   priority: 1.0, changeFrequency: 'weekly',  lastModified: LAST_MODIFIED },
    { url: `${BASE}/catering`,          priority: 0.9, changeFrequency: 'monthly', lastModified: EXPANSION_MODIFIED },
    { url: `${BASE}/pizza-trucks`,      priority: 0.9, changeFrequency: 'monthly', lastModified: PIZZA_TRUCKS_MODIFIED },
    { url: `${BASE}/corporate-catering`,priority: 0.9, changeFrequency: 'monthly', lastModified: EXPANSION_MODIFIED },
    { url: `${BASE}/mobile-bar`,        priority: 0.8, changeFrequency: 'monthly', lastModified: EXPANSION_MODIFIED },
    { url: `${BASE}/mobile-bar/bartenders`, priority: 0.7, changeFrequency: 'monthly', lastModified: EXPANSION_MODIFIED },
    { url: `${BASE}/blog`,              priority: 0.6, changeFrequency: 'monthly', lastModified: EXPANSION_MODIFIED },
    { url: `${BASE}/about`,             priority: 0.6, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    { url: `${BASE}/contact`,           priority: 0.6, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    // /events is intentionally omitted — it 301-redirects to /catering, and
    // sitemaps must list only canonical 200 URLs.
  ]

  // Borough & regional catering spokes.
  const areaRoutes: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${BASE}/catering/${area.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: EXPANSION_MODIFIED,
  }))

  // Pizza truck occasion & geo spokes.
  const pizzaRoutes: MetadataRoute.Sitemap = pizzaTruckPages.map((page) => ({
    url: `${BASE}/pizza-trucks/${page.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: EXPANSION_MODIFIED,
  }))

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: new Date(post.date),
  }))

  return [...staticRoutes, ...areaRoutes, ...pizzaRoutes, ...postRoutes]
}
