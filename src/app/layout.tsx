import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { JsonLd } from '@/components/json-ld';
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_PHONE_INTL,
  SAME_AS_PROFILES,
} from '@/lib/constants';
import {
  BASE_URL,
  ORG_ID,
  ORG_REF,
  WEBSITE_ID,
  REGION_AREA_SERVED,
} from '@/lib/schema';
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

/**
 * One entity for the business. FoodEstablishment is a LocalBusiness subtype
 * (and therefore an Organization), so a single node carries both the brand
 * and the local data, and every Service.provider { @id } lands on it.
 * (The old 'CateringService' type does not exist in schema.org.)
 */
const businessSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'FoodEstablishment'],
  '@id': ORG_ID,
  name: SITE_NAME,
  url: BASE_URL,
  description: SITE_DESCRIPTION,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/OGImage.png`,
  telephone: CONTACT_PHONE_INTL,
  servesCuisine: ['Pizza', 'Italian'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New York',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  areaServed: REGION_AREA_SERVED,
  priceRange: PRICE_RANGE,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT_PHONE_INTL,
    contactType: 'customer service',
    areaServed: REGION_AREA_SERVED,
    availableLanguage: 'English',
  },
  sameAs: SAME_AS_PROFILES,
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: BASE_URL,
  publisher: ORG_REF,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.newyorkfinefoods.com'),
  title: {
    default: 'New York Fine Foods | NYC Catering, Events & Pizza Trucks',
    template: '%s | New York Fine Foods',
  },
  description:
    "NYC's premier catering, pizza truck, and mobile bar company. From intimate gatherings to grand celebrations, we bring fine dining and exceptional bar service to every occasion.",
  keywords: [
    'NYC catering',
    'catering company New York',
    'event planning NYC',
    'pizza truck rental NYC',
    'Neapolitan pizza truck',
    'corporate catering New York',
    'wedding catering NYC',
    'mobile bar NYC',
    'off premise bar service New York',
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
        <JsonLd data={businessSchema} />
        <JsonLd data={webSiteSchema} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
