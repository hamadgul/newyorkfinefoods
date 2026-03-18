import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from '@/components/json-ld';
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_PHONE,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
} from '@/lib/constants';
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

// TODO: confirm priceRange with client before deploying — appears in Google's local knowledge panel
const PRICE_RANGE = '$$-$$$'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: 'https://www.newyorkfinefoods.com',
  logo: 'https://www.newyorkfinefoods.com/OGImage.png',
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  sameAs: [INSTAGRAM_URL],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'CateringService'],
  name: SITE_NAME,
  url: 'https://www.newyorkfinefoods.com',
  description: SITE_DESCRIPTION,
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New York',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  areaServed: 'New York City',
  priceRange: PRICE_RANGE,
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: 'https://www.newyorkfinefoods.com',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.newyorkfinefoods.com'),
  title: {
    default: 'New York Fine Foods | NYC Catering, Events & Pizza Trucks',
    template: '%s | New York Fine Foods',
  },
  description:
    "NYC's premier catering, events, and pizza truck company. From intimate gatherings to grand celebrations, we bring fine dining to every occasion.",
  keywords: [
    'NYC catering',
    'catering company New York',
    'event planning NYC',
    'pizza truck rental NYC',
    'Neapolitan pizza truck',
    'corporate catering New York',
    'wedding catering NYC',
    'New York Fine Foods',
  ],
  authors: [{ name: 'New York Fine Foods' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'New York Fine Foods',
    images: [
      {
        url: '/OGImage.png',
        alt: 'New York Fine Foods',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={webSiteSchema} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
