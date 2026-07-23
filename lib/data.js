import { supabase } from "./supabaseClient";
import { sampleProperties, findSampleProperty } from "./sampleData";

// Every function here tries Supabase first. Until real credentials exist
// (tomorrow), the query errors out quietly and we fall back to sample
// data so the site is fully browsable today. Once env vars are set, real
// data takes over automatically — no code changes needed.

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
