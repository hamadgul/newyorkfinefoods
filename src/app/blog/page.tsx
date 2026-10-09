import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { CTASection } from '@/components/sections/cta-section'
import { JsonLd } from '@/components/json-ld'
import { ORG_REF, WEBSITE_ID, breadcrumbSchema } from '@/lib/schema'

const BASE = 'https://www.newyorkfinefoods.com'
const TITLE = 'Catering & Pizza Truck Guides | New York Fine Foods'
const DESCRIPTION =
  'Straight answers on catering costs, pizza truck pricing and planning events across NYC and the tri-state area.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${BASE}/blog` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE}/blog`,
    type: 'website',
    images: ['/OGImage.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/OGImage.png'],
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${BASE}/blog#blog`,
    url: `${BASE}/blog`,
    name: 'Catering & Pizza Truck Guides',
    description: DESCRIPTION,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: ORG_REF,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${BASE}/blog/${post.slug}`,
      datePublished: post.date,
    })),
  }

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema([{ name: 'Blog', path: '/blog' }])} />
      <section className="bg-ivory pb-20 pt-36">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            From Our Kitchen
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-charcoal sm:text-5xl">
            Catering &amp; Pizza Truck Guides
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/65">
            Straight answers to the questions people actually ask us — what things
            cost, what fits your event, and what to check before you book anyone.
          </p>
          <div className="mt-8 h-px w-16 bg-gold/50" />

          {posts.length === 0 ? (
            <p className="mt-12 text-lg text-charcoal/60">
              New guides are on the way. In the meantime, call{' '}
              <a href="tel:+15162057629" className="font-bold text-gold">
                (516) 205-7629
              </a>{' '}
              and we&apos;ll answer it directly.
            </p>
          ) : (
            <ul className="mt-12 space-y-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-xl border border-charcoal/10 bg-white p-7 transition-all duration-300 hover:border-gold hover:shadow-md"
                  >
                    <time
                      className="text-xs uppercase tracking-widest text-charcoal/40"
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h2 className="mt-2 font-heading text-xl font-bold text-charcoal transition-colors group-hover:text-gold md:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-charcoal/65">
                      {post.description}
                    </p>
                    <span className="mt-4 inline-block text-sm font-bold uppercase tracking-widest text-gold">
                      Read it &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CTASection
        title="Planning an Event?"
        subtitle="Tell us the date, the location and roughly how many guests. We'll come back with a real number."
        ctaText="Get a Quote"
      />
    </>
  )
}
