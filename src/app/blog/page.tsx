import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Catering tips, event planning guides, and more from New York Fine Foods.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://www.newyorkfinefoods.com/blog',
  },
  openGraph: {
    title: 'Blog | New York Fine Foods',
    description:
      'Catering tips, event planning guides, and more from New York Fine Foods.',
    url: 'https://www.newyorkfinefoods.com/blog',
  },
  twitter: {
    title: 'Blog | New York Fine Foods',
    description:
      'Catering tips, event planning guides, and more from New York Fine Foods.',
  },
}

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h1 className="font-playfair mb-4 text-4xl font-bold tracking-tight text-stone-900">
        From Our Kitchen
      </h1>
      <p className="text-lg text-stone-600">
        We&apos;re sharing our expertise soon. Check back for catering tips,
        event planning guides, and more.
      </p>
    </section>
  )
}
