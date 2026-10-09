export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string    // ISO 8601, e.g. "2026-01-01"
  updated?: string // ISO 8601; set when the post is materially revised
  tags: string[]
  content: string // Raw Markdown body
}
