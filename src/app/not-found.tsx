import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center">
      <Link href="/" className="mb-10">
        <Image
          src="/logo.png"
          alt={SITE_NAME}
          width={975}
          height={113}
          className="h-8 w-auto brightness-0"
        />
      </Link>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">404</p>
      <h1 className="mt-3 font-heading text-4xl font-bold text-charcoal sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-charcoal/60">
        Looks like this page went off-menu. Let&apos;s get you back to something delicious.
      </p>
      <div className="mt-4 h-px w-10 bg-gold/40" />
      <Link
        href="/"
        className="mt-10 inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-md hover:shadow-gold/20"
      >
        Back to Home
      </Link>
      <div className="mt-8 flex items-center gap-6 text-sm text-charcoal/40">
        <Link href="/catering" className="transition-colors hover:text-gold">Catering</Link>
        <span>·</span>
        <Link href="/pizza-trucks" className="transition-colors hover:text-gold">Pizza Trucks</Link>
        <span>·</span>
        <Link href="/mobile-bar" className="transition-colors hover:text-gold">Mobile Bar</Link>
      </div>
    </div>
  );
}
