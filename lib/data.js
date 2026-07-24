import { supabase } from "./supabaseClient";
import { sampleProperties, findSampleProperty } from "./sampleData";

// Every function here tries Supabase first and falls back to sample data
// (lib/sampleData.js) if the query errors or returns nothing — e.g. before
// any real listings have been added, or if Supabase is briefly unreachable.

export async function getAllProperties() {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, property_images(image_url, display_order)")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) throw error || new Error("empty");
    return data;
  } catch {
    return sampleProperties;
  }
}

export async function getFeaturedProperties() {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, property_images(image_url, display_order)")
      .eq("status", "active")
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) throw error || new Error("empty");
    return data;
  } catch {
    return sampleProperties.filter((p) => p.is_featured);
  }
}

export async function getPropertyById(id) {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, property_images(image_url, display_order)")
      .eq("id", id)
      .single();

    if (error || !data) throw error || new Error("not found");
    return data;
  } catch {
    return findSampleProperty(id);
  }
}
