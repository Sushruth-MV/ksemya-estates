"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*, properties(id, title)")
        .order("created_at", { ascending: false });
      if (!error && data) setEnquiries(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Enquiries</h1>
      <p className="text-cream/50 mb-8">
        Messages submitted through the website&apos;s enquiry forms.
      </p>

      {loading ? (
        <p className="text-cream/50">Loading...</p>
      ) : enquiries.length === 0 ? (
        <div className="bg-mist border border-cream/10 rounded-lg p-10 text-center text-cream/60">
          No enquiries yet.
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => (
            <div
              key={e.id}
              className="bg-mist border border-cream/10 rounded-lg p-5 hover:border-gold/30 transition-colors"
            >
              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <div>
                  <p className="font-medium text-cream">{e.name}</p>
                  <p className="text-sm text-cream/50">
                    {e.phone}
                    {e.email ? ` · ${e.email}` : ""}
                  </p>
                </div>
                <p className="text-xs text-cream/30">
                  {new Date(e.created_at).toLocaleString("en-IN")}
                </p>
              </div>

              {e.properties ? (
                <Link
                  href={`/properties/${e.properties.id}`}
                  target="_blank"
                  className="inline-block text-xs bg-forest text-gold px-2.5 py-1 rounded-pill mb-2 hover:bg-forest/70 transition-colors"
                >
                  Re: {e.properties.title}
                </Link>
              ) : (
                <span className="inline-block text-xs bg-gold/15 text-gold px-2.5 py-1 rounded-pill mb-2">
                  General Enquiry
                </span>
              )}

              {e.message && <p className="text-sm text-cream/70 mt-2">{e.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
