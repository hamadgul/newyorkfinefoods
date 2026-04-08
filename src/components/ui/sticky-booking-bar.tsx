"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface StickyBookingBarProps {
  label: string;
  href?: string;
  /** ID of the section that must scroll into view before the bar appears */
  showAfter?: string;
}

export function StickyBookingBar({ label, href = "#book", showAfter }: StickyBookingBarProps) {
  const [pastMenu, setPastMenu] = useState(false);
  const [atBook, setAtBook] = useState(false);
  const visible = pastMenu && !atBook;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    if (showAfter) {
      const trigger = document.getElementById(showAfter);
      if (trigger) {
        const obs = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              setPastMenu(true);
            } else {
              // top < 0 → section scrolled above viewport (we're past it)
              // top > 0 → section is below viewport (haven't reached it)
              setPastMenu(e.boundingClientRect.top < 0);
            }
          },
          { threshold: 0.05 }
        );
        obs.observe(trigger);
        observers.push(obs);
      }
    }

    const bookEl = document.getElementById("book");
    if (bookEl) {
      const obs = new IntersectionObserver(
        ([e]) => setAtBook(e.isIntersecting),
        { threshold: 0.1 }
      );
      obs.observe(bookEl);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [showAfter]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gold/20 bg-charcoal/95 px-4 py-3 backdrop-blur-sm lg:hidden">
      <Link
        href={href}
        className="flex w-full items-center justify-center rounded-full bg-gold py-3 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light"
      >
        {label}
      </Link>
    </div>
  );
}
