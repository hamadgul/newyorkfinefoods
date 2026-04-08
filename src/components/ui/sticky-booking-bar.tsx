"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function StickyBookingBar({ label, href = "#book" }: { label: string; href?: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("book");
    if (!target) return;
    const obs = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), { threshold: 0.1 });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

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
