"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  isPropertySaved,
  toggleSavedProperty,
  SAVED_PROPERTIES_EVENT,
} from "@/lib/savedProperties";

function formatPrice(price) {
  if (!price) return "Price on request";
  const num = Number(price);
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} Lakh`;
  return `₹${num.toLocaleString("en-IN")}`;
}

export default function PropertyCard({ property }) {
  const image = property.images?.[0] || property.property_images?.[0]?.image_url || null;
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isPropertySaved(property.id));
    const sync = () => setSaved(isPropertySaved(property.id));
    window.addEventListener(SAVED_PROPERTIES_EVENT, sync);
    return () => window.removeEventListener(SAVED_PROPERTIES_EVENT, sync);
  }, [property.id]);

  const handleToggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleSavedProperty(property.id));
  };

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block bg-mist rounded-lg overflow-hidden border border-cream/10 hover:border-gold/50 hover:-translate-y-1.5 transition-all duration-300 shadow-lg shadow-black/20"
    >
      <div className="aspect-[4/3] bg-forest overflow-hidden relative">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-cream/30 text-sm">
            No photo yet
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent opacity-80" />
        <span className="absolute top-3 left-3 bg-gold text-ink text-xs font-semibold px-2.5 py-1 rounded-pill">
          {property.type}
        </span>
        {property.price_negotiable && (
          <span className="absolute top-3 right-3 bg-forest/80 backdrop-blur text-cream text-xs px-2.5 py-1 rounded-pill">
            Negotiable
          </span>
        )}
        <button
          type="button"
          onClick={handleToggleSave}
          aria-label={saved ? "Remove from saved properties" : "Save this property"}
          aria-pressed={saved}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform duration-200"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill={saved ? "#C9A86A" : "none"}
            stroke={saved ? "#C9A86A" : "#F3EFE5"}
            strokeWidth="2"
          >
            <path d="M12 21s-7.5-4.6-10.1-9.1C.3 8.8 1.6 5 5.2 4.2 7.6 3.6 9.8 4.7 12 7c2.2-2.3 4.4-3.4 6.8-2.8 3.6.8 4.9 4.6 3.3 7.7C19.5 16.4 12 21 12 21Z" />
          </svg>
        </button>
      </div>

      <div className="p-5">
        <p className="font-display text-lg text-cream leading-snug mb-1">{property.title}</p>
        <p className="text-sm text-cream/50 mb-3">
          {property.location}
          {property.district ? `, ${property.district}` : ""} · {property.area}
        </p>
        <p className="font-medium text-gold">{formatPrice(property.price)}</p>
      </div>
    </Link>
  );
}
