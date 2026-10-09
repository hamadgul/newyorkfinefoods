"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { LazyVideo } from "@/components/ui/lazy-video";

type GalleryItem = { src: string; type: "image" | "video"; alt?: string };

const galleryItems: GalleryItem[] = [
  { src: "/trucks/nyc-neapolitan-pizza-truck.jpg", type: "image", alt: "New York Fine Foods pizza truck lit up at night on an NYC street" },
  { src: "/trucks/margherita.jpg", type: "image", alt: "Margherita Neapolitan pizza with fresh mozzarella and basil" },
  { src: "/trucks/nyc-pizza-truck-in-action.mp4", type: "video" },
  { src: "/trucks/bianca.jpg", type: "image", alt: "Bianca white Neapolitan pizza with basil and olive oil" },
  { src: "/trucks/pizza-truck-catering-nyc.jpg", type: "image", alt: "Guest picking up boxed pizzas at the New York Fine Foods truck window" },
  { src: "/trucks/diavola.jpg", type: "image", alt: "Diavola Neapolitan pizza with spicy salami and jalapeños" },
  { src: "/trucks/mobile-pizza-truck-nyc.jpg", type: "image", alt: "Boxed Neapolitan cheese pizza in front of the New York Fine Foods truck" },
  { src: "/trucks/di-parma.jpg", type: "image", alt: "Di Parma Neapolitan pizza with prosciutto and arugula" },
];

export function TruckCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Scroll one card width in a direction
  const scrollByCard = useCallback((direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    // Each card is the first child
    const card = track.children[0] as HTMLElement | undefined;
    if (!card) return;
    const gap = 16; // gap-4 = 1rem = 16px
    const amount = card.offsetWidth + gap;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  // Infinite loop: when we scroll past the first set, jump back; when before, jump forward
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalSets = 3;
    const oneSetWidth = track.scrollWidth / totalSets;

    // If we've scrolled past the 2nd set, silently jump back by one set
    if (track.scrollLeft >= oneSetWidth * 2) {
      track.style.scrollBehavior = "auto";
      track.scrollLeft -= oneSetWidth;
      track.style.scrollBehavior = "";
    }
    // If we've scrolled before the 1st set, silently jump forward by one set
    if (track.scrollLeft < 4) {
      track.style.scrollBehavior = "auto";
      track.scrollLeft += oneSetWidth;
      track.style.scrollBehavior = "";
    }
  }, []);

  // Start scrolled to the middle set so we can go left from the start
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const oneSetWidth = track.scrollWidth / 3;
    track.style.scrollBehavior = "auto";
    track.scrollLeft = oneSetWidth;
    track.style.scrollBehavior = "";
  }, []);

  // Listen for scroll events to do the infinite jump
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scrollend", handleScroll);
    return () => track.removeEventListener("scrollend", handleScroll);
  }, [handleScroll]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      scrollByCard("right");
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, scrollByCard]);

  // Render a single card
  // The track renders three copies for the infinite loop; only the middle
  // copy carries alt text so assistive tech and crawlers read each photo once.
  const renderCard = (item: GalleryItem, i: number) => (
    <div
      key={i}
      className="group relative aspect-[4/3] w-[75vw] flex-shrink-0 overflow-hidden rounded-lg sm:w-[40vw] md:w-[28vw] lg:w-[22vw]"
    >
      {item.type === "video" ? (
        <LazyVideo
          src={item.src}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <Image
          src={item.src}
          alt={
            i >= galleryItems.length && i < galleryItems.length * 2
              ? item.alt ?? ""
              : ""
          }
          fill
          loading="lazy"
          sizes="(min-width:1024px) 22vw, (min-width:768px) 28vw, (min-width:640px) 40vw, 75vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/20" />
    </div>
  );

  // Render 3 copies of the items: [set][set][set] — we start at the middle set
  const tripled = [...galleryItems, ...galleryItems, ...galleryItems];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {tripled.map((item, i) => renderCard(item, i))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => scrollByCard("left")}
        className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/70 text-ivory backdrop-blur-sm transition-all hover:bg-charcoal/90"
        aria-label="Scroll left"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scrollByCard("right")}
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/70 text-ivory backdrop-blur-sm transition-all hover:bg-charcoal/90"
        aria-label="Scroll right"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
