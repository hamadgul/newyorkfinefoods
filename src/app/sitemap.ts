import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://www.newyorkfinefoods.com'

// Stable per-page modified dates (bump the relevant entry when a page's content
// changes). Using a constant avoids the "lastmod = build time for every page"
// churn that gives Google a weak, identical freshness signal on every deploy.
const LAST_MODIFIED = '2026-07-22'
const PIZZA_TRUCKS_MODIFIED = '2026-07-22'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}`,              priority: 1.0, changeFrequency: 'weekly',  lastModified: LAST_MODIFIED },
    { url: `${BASE}/catering`,     priority: 0.8, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    { url: `${BASE}/pizza-trucks`, priority: 0.8, changeFrequency: 'monthly', lastModified: PIZZA_TRUCKS_MODIFIED },
    { url: `${BASE}/mobile-bar`,   priority: 0.8, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    { url: `${BASE}/about`,        priority: 0.6, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    { url: `${BASE}/contact`,      priority: 0.6, changeFrequency: 'monthly', lastModified: LAST_MODIFIED },
    // /events is intentionally omitted — it 301-redirects to /catering, and
    // sitemaps must list only canonical 200 URLs.
    // /blog is excluded while the listing page carries robots: noindex.
    // Add it back when the first post is published and noindex is removed.

  ]

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: new Date(post.date),
  }))

  return [...staticRoutes, ...postRoutes]
}
