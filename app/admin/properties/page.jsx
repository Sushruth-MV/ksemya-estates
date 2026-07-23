"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

function formatPrice(price) {
  if (!price) return "—";
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export default function AdminPropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*, property_images(image_url, display_order)")
      .order("created_at", { ascending: false });
    if (!error && data) setProperties(data);
    setLoading(false);
  }

  function coverImage(property) {
    const images = property.property_images || [];
    if (images.length === 0) return null;
    return [...images].sort((a, b) => a.display_order - b.display_order)[0].image_url;
  }

  useEffect(() => {
    load();
  }, []);

  const toggleFeatured = async (property) => {
    // Optimistic update so the switch feels instant
    setProperties((prev) =>
      prev.map((p) =>
        p.id === property.id ? { ...p, is_featured: !p.is_featured } : p
      )
    );
    const { error } = await supabase
      .from("properties")
      .update({ is_featured: !property.is_featured })
      .eq("id", property.id);
    if (error) load(); // revert by re-fetching if it failed
  };

  const handleDelete = async (property) => {
    if (!confirm(`Delete "${property.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("properties").delete().eq("id", property.id);
    if (!error) setProperties((prev) => prev.filter((p) => p.id !== property.id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-cream">Properties</h1>
        <Link
          href="/admin/properties/new"
          className="btn-shine bg-gold text-ink px-5 py-2.5 rounded-pill font-semibold hover:bg-gold-light transition-colors duration-300"
        >
          + Add New Property
        </Link>
      </div>

      {loading ? (
        <p className="text-cream/50">Loading...</p>
      ) : properties.length === 0 ? (
        <div className="bg-mist border border-cream/10 rounded-lg p-10 text-center text-cream/60">
          No properties yet. Add your first listing to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => {
            const cover = coverImage(p);
            return (
              <div
                key={p.id}
                className="bg-mist border border-cream/10 rounded-lg overflow-hidden flex flex-col hover:border-gold/30 transition-colors"
              >
                <div className="aspect-video bg-forest relative">
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cover} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-cream/30 text-sm">
                      No photo
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-black/60 text-cream/80 text-xs px-2 py-1 rounded-pill capitalize">
                    {p.status}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-display text-lg text-cream truncate">{p.title}</h3>
                  <p className="text-xs text-cream/50 mb-2">{p.type}</p>
                  <p className="text-gold font-semibold mb-3">{formatPrice(p.price)}</p>

                  <label className="flex items-center gap-2 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={p.is_featured}
                      onChange={() => toggleFeatured(p)}
                      className="w-4 h-4 rounded accent-gold cursor-pointer"
                    />
                    <span className="text-xs text-cream/50">Featured</span>
                  </label>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-cream/10">
                    <Link
                      href={`/admin/properties/${p.id}/edit`}
                      className="link-underline text-gold hover:text-gold-light text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p)}
                      className="link-underline text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
