import { NextResponse } from "next/server";
import { deleteFromR2 } from "@/lib/r2Client";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const { imageId, r2Key } = await request.json();

    if (!imageId) {
      return NextResponse.json({ error: "Missing imageId" }, { status: 400 });
    }

    if (r2Key) {
      await deleteFromR2(r2Key);
    }

    const { error } = await supabaseAdmin.from("property_images").delete().eq("id", imageId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete image error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
