"use client";
import { useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";

export default function PropertiesGrid({ initialProperties }) {
  const [type, setType] = useState("all");
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState("newest");

  const locations = useMemo(() => {
    const set = new Set(initialProperties.map((p) => p.location).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [initialProperties]);

  const filtered = useMemo(() => {
    let list = [...initialProperties];
    if (type !== "all") list = list.filter((p) => p.type === type);
    if (location !== "all") list = list.filter((p) => p.location === location);
    if (sort === "price-asc") list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === "price-desc") list.sort((a, b) => (b.price || 0) - (a.price || 0));
    return list;
  }, [initialProperties, type, location, sort]);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-10">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-cream/15 rounded-pill px-4 py-2.5 bg-mist text-cream/80 text-sm focus:border-gold outline-none transition-colors"
        >
          <option value="all">All Types</option>
          <option value="Coffee Plantation">Coffee Plantation</option>
          <option value="Agricultural Land">Agricultural Land</option>
          <option value="Farm Land">Farm Land</option>
          <option value="Layout Plot">Layout Plot</option>
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-cream/15 rounded-pill px-4 py-2.5 bg-mist text-cream/80 text-sm focus:border-gold outline-none transition-colors"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc === "all" ? "All Locations" : loc}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-cream/15 rounded-pill px-4 py-2.5 bg-mist text-cream/80 text-sm focus:border-gold outline-none transition-colors"
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-cream/50 text-sm">No properties match these filters yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
