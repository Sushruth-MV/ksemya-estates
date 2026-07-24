"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { defaultSettings } from "@/lib/settings";

const inputClass =
  "w-full border border-cream/15 rounded-sm px-3 py-2 bg-mist text-cream focus:border-gold outline-none transition-colors";
const labelClass = "block text-sm text-cream/60 mb-1";

export default function AdminSettingsPage() {
  const [form, setForm] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", true)
        .single();

      if (!error && data) setForm(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const { id, updated_at, ...payload } = form;
    const { error } = await supabase.from("site_settings").update(payload).eq("id", true);

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSaved(true);
  };

  if (loading) {
    return <p className="text-cream/50">Loading settings...</p>;
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-cream mb-1">Business Settings</h1>
      <p className="text-cream/50 mb-8">
        These details show up across the public website — header, footer, contact page, and About
        Us.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
        <div>
          <label className={labelClass}>Business Name</label>
          <input
            name="business_name"
            value={form.business_name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Tagline</label>
          <input
            name="tagline"
            value={form.tagline}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>WhatsApp / Phone (with country code, no +)</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="918660727074"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Business Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={2}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>About Us</label>
          <textarea
            name="about_us"
            value={form.about_us}
            onChange={handleChange}
            rows={10}
            className={inputClass}
          />
          <p className="text-xs text-cream/40 mt-1">
            Shown on the About Us page. Leave a blank line between paragraphs.
          </p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {saved && <p className="text-sm text-gold">Saved — changes are live on the site now.</p>}

        <button
          type="submit"
          disabled={saving}
          className="btn-shine bg-gold text-ink px-6 py-2.5 rounded-pill font-semibold hover:bg-gold-light transition-colors duration-300 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
