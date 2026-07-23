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
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setProperties(data);
    setLoading(false);
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
        <div className="bg-mist border border-cream/10 rounded-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-forest text-left text-cream/50">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-t border-cream/10 text-cream/80 hover:bg-forest/40 transition-colors">
                  <td className="px-4 py-3 max-w-xs truncate">{p.title}</td>
                  <td className="px-4 py-3 text-cream/50">{p.type}</td>
                  <td className="px-4 py-3">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 text-cream/50 capitalize">{p.status}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(p)}
                      role="switch"
                      aria-checked={p.is_featured}
                      className={`w-10 h-5 rounded-full relative transition-colors ${
                        p.is_featured ? "bg-gold" : "bg-cream/15"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-cream rounded-full transition-transform ${
                          p.is_featured ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link
                      href={`/admin/properties/${p.id}/edit`}
                      className="link-underline text-gold hover:text-gold-light"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p)}
                      className="link-underline text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
