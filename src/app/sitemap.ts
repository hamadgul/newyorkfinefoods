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
