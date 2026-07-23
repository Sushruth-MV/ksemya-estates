"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from "browser-image-compression";

const EMPTY = {
  title: "",
  description: "",
  type: "Coffee Plantation",
  price: "",
  area: "",
  location: "",
  district: "",
  status: "active",
  youtube_url: "",
  is_featured: false,
  survey_number: "",
  khata_type: "",
  facing: "",
  road_width: "",
  nearest_landmark: "",
  price_negotiable: false,
};

const inputClass =
  "w-full border border-cream/15 rounded-sm px-3 py-2 bg-forest text-cream focus:border-gold outline-none transition-colors";
const labelClass = "block text-sm text-cream/60 mb-1";

export default function PropertyForm({ existing = null }) {
  const router = useRouter();
  // property_images is a joined array, not a column on `properties` — keep
  // it out of the form state so it never gets spread into the update payload.
  const { property_images: initialImages, ...existingFields } = existing || {};
  const [form, setForm] = useState(() => {
    if (!existing) return EMPTY;
    // Nullable DB columns (optional fields) must become "" for controlled inputs.
    const normalized = { ...existingFields };
    Object.keys(normalized).forEach((key) => {
      if (normalized[key] === null) normalized[key] = "";
    });
    return normalized;
  });
  const [existingImages, setExistingImages] = useState(
    [...(initialImages || [])].sort((a, b) => a.display_order - b.display_order)
  );
  const [removingId, setRemovingId] = useState(null);
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleRemoveExistingImage = async (image) => {
    if (!confirm("Remove this photo? This cannot be undone.")) return;
    setRemovingId(image.id);
    try {
      const res = await fetch("/api/delete-property-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId: image.id, r2Key: image.r2_key }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setExistingImages((prev) => prev.filter((img) => img.id !== image.id));
    } catch (err) {
      console.error("Remove image error:", err);
      setError("Could not remove that photo. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const uploadPhotos = async (propertyId) => {
    const startOrder = existingImages.length;
    for (let i = 0; i < files.length; i++) {
      const compressed = await imageCompression(files[i], {
        maxSizeMB: 0.25,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("propertyId", propertyId);
      formData.append("displayOrder", String(startOrder + i));

      // Calls the API route that pushes to R2 + saves the URL in Supabase.
      // See lib/api-upload-property-image.js — wire this endpoint up when
      // your R2 keys are added tomorrow.
      await fetch("/api/upload-property-image", {
        method: "POST",
        body: formData,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    // Built explicitly (not spread from `form`) so DB-only columns that
    // aren't part of this form — lat, lng, id, created_at, owner_id, etc. —
    // never get sent back in the update and can't collide with their column
    // types (e.g. "" into a numeric column).
    const payload = {
      title: form.title,
      description: form.description,
      type: form.type,
      price: form.price ? Number(form.price) : null,
      area: form.area,
      location: form.location,
      district: form.district,
      status: form.status,
      youtube_url: form.youtube_url,
      is_featured: form.is_featured,
      survey_number: form.survey_number || null,
      khata_type: form.khata_type || null,
      facing: form.facing || null,
      road_width: form.road_width || null,
      nearest_landmark: form.nearest_landmark || null,
      price_negotiable: form.price_negotiable,
    };

    let propertyId = existing?.id;

    if (existing) {
      const { error } = await supabase
        .from("properties")
        .update(payload)
        .eq("id", existing.id);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { data, error } = await supabase
        .from("properties")
        .insert([payload])
        .select()
        .single();
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
      propertyId = data.id;
    }

    if (files.length > 0 && propertyId) {
      try {
        await uploadPhotos(propertyId);
      } catch (err) {
        console.error("Photo upload error:", err);
        // Property itself saved fine — surface a soft warning, don't block
        setError(
          "Property saved, but photo upload failed. You can edit this listing to retry uploading photos."
        );
      }
    }

    setSaving(false);
    router.push("/admin/properties");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClass}>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className={inputClass} />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Type</label>
          <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
            <option>Coffee Plantation</option>
            <option>Agricultural Land</option>
            <option>Farm Land</option>
            <option>Layout Plot</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Price (₹)</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Area (e.g. 5 acres)</label>
          <input name="area" value={form.area} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <input name="location" value={form.location} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>District</label>
          <input name="district" value={form.district} onChange={handleChange} className={inputClass} />
        </div>

        <div className="md:col-span-2 pt-2 border-t border-cream/10">
          <p className="text-xs uppercase tracking-widest text-gold mt-3 mb-1">
            Extra Details (optional)
          </p>
          <p className="text-xs text-cream/40 mb-3">
            Fill in only what applies — none of these are required.
          </p>
        </div>

        <div>
          <label className={labelClass}>Survey / Site Number</label>
          <input name="survey_number" value={form.survey_number} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Khata Type</label>
          <select name="khata_type" value={form.khata_type} onChange={handleChange} className={inputClass}>
            <option value="">Not specified</option>
            <option value="A">A Khata</option>
            <option value="B">B Khata</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Facing</label>
          <select name="facing" value={form.facing} onChange={handleChange} className={inputClass}>
            <option value="">Not specified</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Road Width</label>
          <input
            name="road_width"
            value={form.road_width}
            onChange={handleChange}
            placeholder="e.g. 30 ft"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Nearest Landmark</label>
          <input name="nearest_landmark" value={form.nearest_landmark} onChange={handleChange} className={inputClass} />
        </div>

        <div className="md:col-span-2 flex items-center gap-3 bg-forest border border-cream/10 rounded-sm px-4 py-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, price_negotiable: !form.price_negotiable })}
            role="switch"
            aria-checked={form.price_negotiable}
            className={`w-10 h-5 rounded-full relative transition-colors ${
              form.price_negotiable ? "bg-gold" : "bg-cream/15"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-cream rounded-full transition-transform ${
                form.price_negotiable ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-sm text-cream/80">Price Negotiable</span>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>YouTube Video URL</label>
          <input
            name="youtube_url"
            value={form.youtube_url}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className={inputClass}
          />
          <p className="text-xs text-cream/40 mt-1">
            Upload the walkthrough video to YouTube as Unlisted, then paste the link here.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Photos</label>

          {existingImages.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
              {existingImages.map((image) => (
                <div key={image.id} className="relative group aspect-square rounded-sm overflow-hidden border border-cream/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.image_url} alt="Property" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(image)}
                    disabled={removingId === image.id}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-cream text-xs flex items-center justify-center hover:bg-red-500/80 transition-colors disabled:opacity-50"
                    aria-label="Remove photo"
                  >
                    {removingId === image.id ? "…" : "✕"}
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="w-full text-sm text-cream/70 file:mr-3 file:py-2 file:px-4 file:rounded-pill file:border-0 file:bg-gold file:text-ink file:font-medium file:cursor-pointer"
          />
          <p className="text-xs text-cream/40 mt-1">
            {existingImages.length > 0
              ? "New photos are added alongside the ones above — remove any old photo using the ✕ button."
              : "Photos are compressed automatically before upload. You can select multiple at once."}
          </p>
          {files.length > 0 && (
            <p className="text-xs text-gold mt-1">{files.length} new photo(s) selected — uploaded when you save.</p>
          )}
        </div>

        <div className="md:col-span-2 flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-sm px-4 py-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
            role="switch"
            aria-checked={form.is_featured}
            className={`w-10 h-5 rounded-full relative transition-colors ${
              form.is_featured ? "bg-gold" : "bg-cream/15"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-cream rounded-full transition-transform ${
                form.is_featured ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-sm text-cream/80">Show in homepage carousel (Featured)</span>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="btn-shine bg-gold text-ink px-6 py-2.5 rounded-pill font-semibold hover:bg-gold-light transition-colors duration-300 disabled:opacity-60"
        >
          {saving ? "Saving..." : existing ? "Save Changes" : "Add Property"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/properties")}
          className="border border-cream/15 text-cream/70 px-6 py-2.5 rounded-pill hover:border-gold/40 hover:text-cream transition-colors duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
