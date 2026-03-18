import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { JsonLd } from '@/components/json-ld'

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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://www.newyorkfinefoods.com/blog/${post.slug}`,
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
