import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
