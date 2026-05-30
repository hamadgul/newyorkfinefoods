"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { darkBlur } from "@/lib/image-utils";

const POSTER = "/hero/hero-poster.jpg";
const MP4 = "/hero/hero-background.mp4";
const WEBM = "/hero/hero-background.webm";

/**
 * Cinematic full-viewport hero with an autoplaying, muted, looping background
 * video. The poster image is the eager LCP element; the video is lazy-loaded
 * only after the hero scrolls into view and fades in over the poster.
 * Users with `prefers-reduced-motion` never download the video and keep the
 * static poster instead.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Decide whether to lazy-load the video (skip entirely for reduced motion).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Attach sources and begin playback once we've opted in.
  useEffect(() => {
    if (!loadVideo) return;
    const el = videoRef.current;
    if (!el) return;
    el.load();
    el.play().catch(() => {
      /* Autoplay can be blocked; poster remains as a graceful fallback. */
    });
  }, [loadVideo]);

  return (
    <section
      aria-label="New York Fine Foods — catering, pizza trucks, and mobile bar"
      className="relative flex h-svh min-h-[600px] w-full items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* ── Background media (poster + video) ── */}
      <div className="absolute inset-0">
        {/* Poster: eager LCP candidate + reduced-motion fallback. Fixed to the
            section so it can never shift layout. */}
        <Image
          src={POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={darkBlur}
          className="object-cover object-center"
        />

        {/* Video fades in over the poster once it can play. */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-out ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {loadVideo && <source src={WEBM} type="video/webm" />}
          {loadVideo && <source src={MP4} type="video/mp4" />}
        </video>
      </div>

      {/* ── Overlays for legibility (≈ rgba(0,0,0,0.45) + directional gradients) ── */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal/70" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <p className="animate-in fade-in slide-in-from-bottom-2 text-xs font-medium uppercase tracking-[0.3em] text-gold duration-700 [animation-fill-mode:both] sm:text-sm">
          <Link
            href="/pizza-trucks"
            className="rounded-sm transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
          >
            NYC Pizza Trucks
          </Link>
          {" · "}
          <Link
            href="/catering"
            className="rounded-sm transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
          >
            Catering
          </Link>
          {" · "}
          <Link
            href="/mobile-bar"
            className="rounded-sm transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
          >
            Mobile Bar
          </Link>
        </p>

        <h1 className="mt-5 animate-in fade-in slide-in-from-bottom-3 font-heading text-5xl font-bold leading-[1.05] text-ivory duration-700 [animation-delay:120ms] [animation-fill-mode:both] sm:text-6xl md:text-7xl lg:text-8xl">
          Exceptional Food
          <br />
          <span className="text-gold">Unforgettable Events</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-in fade-in slide-in-from-bottom-3 text-base leading-relaxed text-ivory/85 duration-700 [animation-delay:240ms] [animation-fill-mode:both] sm:text-lg md:text-xl">
          Authentic Neapolitan pizza trucks, full-service catering, and
          off-premise bar service throughout NYC and the Tri-State Area.
        </p>

        <div className="mt-10 flex w-full animate-in fade-in slide-in-from-bottom-4 flex-col items-center gap-4 duration-700 [animation-delay:360ms] [animation-fill-mode:both] sm:w-auto sm:flex-row sm:justify-center">
          <Link
            href="/pizza-trucks#menu"
            className="w-full rounded-full bg-gold px-9 py-4 text-sm font-bold uppercase tracking-widest text-charcoal shadow-lg shadow-black/20 transition-all duration-300 hover:bg-gold-light hover:shadow-xl hover:shadow-gold/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal sm:w-auto"
          >
            View Pizza Truck Menu
          </Link>
          <Link
            href="/catering#menu"
            className="w-full rounded-full border border-ivory/50 bg-ivory/10 px-9 py-4 text-sm font-bold uppercase tracking-widest text-ivory backdrop-blur-sm transition-all duration-300 hover:border-ivory hover:bg-ivory/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal sm:w-auto"
          >
            View Catering Menu
          </Link>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce text-ivory/50 sm:block">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>

      {/* ── Bottom fade into the next (ivory) section ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-ivory to-transparent sm:h-28" />
    </section>
  );
}
