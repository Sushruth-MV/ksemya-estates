// Placeholder data used ONLY when Supabase isn't connected yet (i.e. today,
// before accounts are created tomorrow). Every page tries the real Supabase
// query first and falls back to this so you can preview the full site now.
// Delete this file once real data is flowing — nothing else imports it
// except the pages' fallback logic.

export const sampleProperties = [
  {
    id: "sample-1",
    title: "12-Acre Arabica Coffee Plantation, Hethur Road",
    description:
      "A shaded Arabica coffee plantation with mature silver oak cover, a seasonal stream along the northern boundary, and an existing pulping unit. Road access year-round, close to the main highway.",
    type: "Coffee Plantation",
    price: 9500000,
    area: "12 acres",
    location: "Hethur Road",
    district: "Hassan District",
    status: "active",
    is_featured: true,
    youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    images: ["https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200"],
  },
  {
    id: "sample-2",
    title: "5-Acre Agricultural Land, Bellur",
    description:
      "Flat, red-soil agricultural land suited for pepper or areca intercropping. Borewell already in place, 400m from the main road.",
    type: "Agricultural Land",
    price: 3200000,
    area: "5 acres",
    location: "Bellur",
    district: "Hassan District",
    status: "active",
    is_featured: true,
    youtube_url: "",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"],
  },
  {
    id: "sample-3",
    title: "3-Acre Farm Land, Manjarabad Road",
    description:
      "Gently sloped farm land close to Manjarabad Fort road, with an existing tool shed and seasonal water source. Suited for mixed cropping or a small homestead.",
    type: "Farm Land",
    price: 1800000,
    area: "3 acres",
    location: "Manjarabad Road",
    district: "Hassan District",
    status: "active",
    is_featured: false,
    youtube_url: "",
    images: ["https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200"],
  },
];

export function findSampleProperty(id) {
  return sampleProperties.find((p) => p.id === id) || null;
}
