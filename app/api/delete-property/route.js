import { NextResponse } from "next/server";
import { deleteFromR2 } from "@/lib/r2Client";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Deleting a property alone leaves its photos orphaned in R2 (the DB row
// cascades, but nothing tells R2 to free the actual files). This route
// cleans up R2 first, then removes the property row.
export async function POST(request) {
  try {
    const { propertyId } = await request.json();

    if (!propertyId) {
      return NextResponse.json({ error: "Missing propertyId" }, { status: 400 });
    }

    const { data: images } = await supabaseAdmin
      .from("property_images")
      .select("r2_key")
      .eq("property_id", propertyId);

    for (const image of images || []) {
      if (image.r2_key) {
        try {
          await deleteFromR2(image.r2_key);
        } catch (err) {
          // Keep going — a stuck R2 object shouldn't block deleting the listing.
          console.error("R2 delete failed for", image.r2_key, err);
        }
      }
    }

    const { error } = await supabaseAdmin.from("properties").delete().eq("id", propertyId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete property error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
