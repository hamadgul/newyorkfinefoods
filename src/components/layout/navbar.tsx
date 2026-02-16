"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt={SITE_NAME}
            width={975}
            height={113}
            className="h-7 w-auto brightness-0 invert sm:h-8 md:h-9"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  pathname === link.href ? "text-gold" : "text-ivory/80"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full bg-gold px-6 py-2 text-sm font-bold uppercase tracking-wider text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-md hover:shadow-gold/20 lg:inline-block"
        >
          Book Now
        </Link>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-ivory">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-charcoal border-charcoal w-72">
            <SheetTitle>
              <Image
                src="/logo.png"
                alt={SITE_NAME}
                width={975}
                height={113}
                className="h-6 w-auto brightness-0 invert"
              />
            </SheetTitle>
            <ul className="mt-8 space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block text-lg font-medium transition-colors hover:text-gold ${
                      pathname === link.href ? "text-gold" : "text-ivory/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wider text-charcoal transition-all duration-300 hover:bg-gold-light"
            >
              Book Now
            </Link>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
