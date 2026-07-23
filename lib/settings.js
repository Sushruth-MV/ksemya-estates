import { supabase } from "./supabaseClient";

// Same fallback pattern as lib/data.js — tries Supabase first, and falls
// back to these defaults if site_settings isn't reachable yet (or before
// the owner has customized anything in the admin dashboard).
export const defaultSettings = {
  business_name: "Ksemya Estates",
  tagline: "Where Land Meets Opportunity",
  email: "ksemyaestates@gmail.com",
  phone: "918660727074",
  address:
    "36, 1106, L&T Raintree Boulevard, Bellary Road, Hebbal, Bengaluru, Karnataka – 560092, India",
  about_us: `Since 2004, Ksemya Estates has worked as land developers, sellers, buyers, and aggregators — building a business rooted in the belief that land should be dealt with honestly, and understood firsthand before it's ever offered to a buyer.

We work across Karnataka's hill country, dealing directly in agricultural land, coffee plantations, and farm lands, with no layers of brokers in between. Beyond listings, we also handle layout and development work and turnkey housing construction projects, A to Z — from acquiring the right piece of land to handing over a finished home.

Our approach stays close to nature and grounded in development — respecting the land we sell while helping it grow into something more, whether that's a productive plantation, a well-planned layout, or a finished home. Every listing on this site has been personally visited — we know the soil, the water source, the access road, and the paperwork history of each property we list, not just what's written on a brochure.

Two decades on, that same hands-on, direct approach is still how we work — for every buyer, seller, and landowner we partner with.`,
};

export async function getSiteSettings() {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", true)
      .single();

    if (error || !data) throw error || new Error("empty");
    return data;
  } catch {
    return defaultSettings;
  }
}
