import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { JsonLd } from '@/components/json-ld'
import { CTASection } from '@/components/sections/cta-section'

const BASE = 'https://www.newyorkfinefoods.com'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `${BASE}/blog/${post.slug}`
  const title = `${post.title} | New York Fine Foods`

  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: url },
    // A page-level openGraph block REPLACES the layout default — restate images.
    openGraph: {
      title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      images: ['/OGImage.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.description,
      images: ['/OGImage.png'],
    },
  }
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

/**
 * Markdown styling without @tailwindcss/typography (not installed) — the
 * `prose` classes previously on this page were inert. These arbitrary child
 * selectors do the same job against the project's own brand tokens.
 */
const proseStyles = [
  '[&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:font-heading [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-charcoal md:[&>h2]:text-3xl',
  '[&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:font-heading [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-charcoal',
  '[&>p]:mb-5 [&>p]:leading-relaxed [&>p]:text-charcoal/75',
  '[&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-charcoal/75 [&>ul>li]:mb-2',
  '[&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-charcoal/75 [&>ol>li]:mb-2',
  '[&_strong]:font-bold [&_strong]:text-charcoal',
  '[&_a]:font-medium [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-gold-light',
  '[&>blockquote]:my-6 [&>blockquote]:border-l-2 [&>blockquote]:border-gold/40 [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:text-charcoal/60',
  '[&>table]:my-6 [&>table]:w-full [&>table]:text-left [&_th]:border-b-2 [&_th]:border-charcoal [&_th]:pb-2 [&_th]:font-heading [&_th]:text-sm [&_th]:uppercase [&_th]:tracking-wider',
  '[&_td]:border-b [&_td]:border-charcoal/10 [&_td]:py-3 [&_td]:pr-4 [&_td]:text-charcoal/75',
  '[&>hr]:my-10 [&>hr]:border-charcoal/10',
].join(' ')

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const html = await marked.parse(post.content)
  const url = `${BASE}/blog/${post.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: 'New York Fine Foods',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE}/#organization`,
      name: 'New York Fine Foods',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/logo.png`,
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article className="bg-ivory pb-24 pt-36">
        <div className="mx-auto max-w-3xl px-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal/40">
              <li>
                <Link href="/blog" className="transition-colors hover:text-gold">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gold">Article</li>
            </ol>
          </nav>

          <h1 className="font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/60">
            {post.description}
          </p>
          <time
            className="mt-6 block text-sm uppercase tracking-widest text-charcoal/40"
            dateTime={post.date}
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          <div className="mt-10 h-px w-16 bg-gold/50" />

          <div
            className={`mt-10 ${proseStyles}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>

      <CTASection
        title="Planning an Event?"
        subtitle="Tell us the date, the location and roughly how many guests. We'll come back with a real number."
        ctaText="Get a Quote"
      />
    </>
  )
}
