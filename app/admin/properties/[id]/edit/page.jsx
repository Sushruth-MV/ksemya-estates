"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import PropertyForm from "@/components/PropertyForm";

export default function EditPropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) setProperty(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <p className="text-cream/50">Loading...</p>;
  if (!property) return <p className="text-cream/50">Property not found.</p>;

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Edit Property</h1>
      <p className="text-cream/50 mb-8">Update the listing details below.</p>
      <PropertyForm existing={property} />
    </div>
  );
}
