"use client";
import { useRef } from "react";
import PropertyCard from "./PropertyCard";

export default function FeaturedCarousel({ properties }) {
  const trackRef = useRef(null);

  if (!properties || properties.length === 0) return null;

  const scrollBy = (amount) => {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-gold mb-2">Handpicked</p>
          <h2 className="font-display text-3xl md:text-4xl text-cream">Featured Listings</h2>
        </div>
        <div className="hidden md:flex gap-3">
          <button
            onClick={() => scrollBy(-360)}
            aria-label="Scroll left"
            className="w-11 h-11 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-ink transition-colors duration-300"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(360)}
            aria-label="Scroll right"
            className="w-11 h-11 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-ink transition-colors duration-300"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {properties.map((property) => (
          <div key={property.id} className="min-w-[280px] md:min-w-[320px] snap-start">
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </section>
  );
}
