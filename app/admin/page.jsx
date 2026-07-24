"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({ total: 0, featured: 0, enquiries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const [{ count: total }, { count: featured }, { count: enquiries }] = await Promise.all([
        supabase.from("properties").select("*", { count: "exact", head: true }),
        supabase
          .from("properties")
          .select("*", { count: "exact", head: true })
          .eq("is_featured", true),
        supabase.from("enquiries").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        total: total || 0,
        featured: featured || 0,
        enquiries: enquiries || 0,
      });
      setLoading(false);
    }
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Dashboard</h1>
      <p className="text-cream/50 mb-8">
        {loading ? "Loading stats..." : "Overview of your listings and enquiries."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-mist border border-cream/10 rounded-lg p-6 border-t-2 border-t-gold hover:-translate-y-1 transition-transform duration-300">
          <p className="text-xs uppercase tracking-widest text-gold mb-2">Total Properties</p>
          <p className="font-display text-4xl text-cream">{stats.total}</p>
        </div>
        <div className="bg-mist border border-cream/10 rounded-lg p-6 border-t-2 border-t-gold hover:-translate-y-1 transition-transform duration-300">
          <p className="text-xs uppercase tracking-widest text-gold mb-2">Currently Featured</p>
          <p className="font-display text-4xl text-cream">{stats.featured}</p>
        </div>
        <div className="bg-mist border border-cream/10 rounded-lg p-6 border-t-2 border-t-gold hover:-translate-y-1 transition-transform duration-300">
          <p className="text-xs uppercase tracking-widest text-gold mb-2">Total Enquiries</p>
          <p className="font-display text-4xl text-cream">{stats.enquiries}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/properties/new"
          className="btn-shine bg-gold text-ink px-6 py-3 rounded-pill font-semibold hover:bg-gold-light transition-colors duration-300"
        >
          + Add New Property
        </Link>
        <Link
          href="/admin/enquiries"
          className="border border-cream/20 text-cream px-6 py-3 rounded-pill font-medium hover:border-gold hover:text-gold transition-colors duration-300"
        >
          View Enquiries
        </Link>
      </div>
    </div>
  );
}
