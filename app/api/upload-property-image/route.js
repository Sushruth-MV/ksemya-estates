import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2Client";
import { createClient } from "@supabase/supabase-js";

// Uses the service-role key (server-side only, never exposed to the browser)
// so this route can write to property_images even though only the owner's
// session created the parent property. Add SUPABASE_SERVICE_ROLE_KEY
// tomorrow alongside the other env vars.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key"
);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const propertyId = formData.get("propertyId");
    const displayOrder = Number(formData.get("displayOrder") || 0);

    if (!file || !propertyId) {
      return NextResponse.json({ error: "Missing file or propertyId" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `properties/${propertyId}/${Date.now()}-${file.name}`;

    const imageUrl = await uploadToR2(key, buffer, file.type);

    const { error } = await supabaseAdmin.from("property_images").insert([
      {
        property_id: propertyId,
        image_url: imageUrl,
        r2_key: key,
        display_order: displayOrder,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
