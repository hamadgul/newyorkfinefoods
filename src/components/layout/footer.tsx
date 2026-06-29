import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, CONTACT_PHONE, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";
import { ProtectedEmail } from "@/components/ui/protected-email";

const serviceLinks = [
  { label: "Pizza Trucks", href: "/pizza-trucks" },
  { label: "Catering", href: "/catering" },
  { label: "Mobile Bar", href: "/mobile-bar" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Pizza Menu", href: "/pizza-trucks#menu" },
  { label: "Bar Packages", href: "/mobile-bar#packages" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">

        {/* Main grid: brand (left) + link columns (right) */}
        <div className="grid gap-10 lg:grid-cols-5">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt={SITE_NAME}
                width={975}
                height={113}
                className="h-7 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/45">
              NYC&apos;s premier pizza truck, catering &amp; mobile bar company — bringing fine dining and exceptional bar service to every occasion.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              {INSTAGRAM_HANDLE}
            </a>
          </div>

          {/* Link columns sub-grid: 2-col on mobile, 3-col on sm+ */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">

            {/* Services */}
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Services
              </p>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/55 transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Quick Links
              </p>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/55 transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact — spans full width on mobile, 1 col on sm+ */}
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Contact
              </p>
              <ul className="space-y-3 text-sm text-ivory/55">
                <li>
                  <a href={`tel:${CONTACT_PHONE}`} className="transition-colors hover:text-ivory">
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li>
                  <ProtectedEmail className="transition-colors hover:text-ivory" />
                </li>
                <li className="pt-1 text-xs leading-relaxed text-ivory/35">
                  New York City &amp; Tri-State Area
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-light"
              >
                Book an event →
              </Link>
            </div>

          </div>
        </div>

        {/* Gold ornamental divider */}
        <div className="mt-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
          <div className="h-1.5 w-1.5 rotate-45 bg-gold/40" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        </div>

        {/* Copyright bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-ivory/25">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-ivory/20">
            NYC &amp; Tri-State Area &middot; Pizza Trucks &middot; Catering &middot; Mobile Bar
          </p>
        </div>

        {/* Design credit */}
        <p className="mt-4 text-center text-xs text-ivory/20">
          Designed &amp; Developed by{" "}
          <a
            href="https://neuragul.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ivory/35 transition-colors hover:text-gold"
          >
            NeuraGul Labs
          </a>
        </p>

      </div>
    </footer>
  );
}
