"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function EnquiryForm({ propertyId = null, title = "Send an Enquiry" }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus("error");
      return;
    }
    setStatus("sending");

    const { error } = await supabase.from("enquiries").insert([
      {
        property_id: propertyId,
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        message: form.message || null,
      },
    ]);

    if (error) {
      console.error("Enquiry submit error:", error.message);
      setStatus("error");
      return;
    }

    setStatus("sent");
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  if (status === "sent") {
    return (
      <div className="text-center py-6">
        <svg
          className="checkmark-circle mx-auto mb-4"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
        >
          <circle cx="28" cy="28" r="26" stroke="#C9A86A" strokeWidth="2.5" />
          <path
            className="checkmark-path"
            d="M17 29L24.5 36.5L39 20"
            stroke="#C9A86A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <p className="font-display text-lg text-gold mb-1">Thank you</p>
        <p className="text-sm text-cream/60">
          We&apos;ve received your enquiry and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="font-display text-lg text-cream">{title}</p>

      <div>
        <label className="block text-sm text-cream/50 mb-1" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-cream/15 rounded-sm px-3 py-2 bg-forest text-cream focus:border-gold outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-cream/50 mb-1" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border border-cream/15 rounded-sm px-3 py-2 bg-forest text-cream focus:border-gold outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-cream/50 mb-1" htmlFor="email">
          Email (optional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-cream/15 rounded-sm px-3 py-2 bg-forest text-cream focus:border-gold outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-cream/50 mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder={propertyId ? "I'm interested in this property..." : "How can we help?"}
          className="w-full border border-cream/15 rounded-sm px-3 py-2 bg-forest text-cream placeholder:text-cream/30 focus:border-gold outline-none transition-colors"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please fill in your name and phone, or try the WhatsApp button
          instead.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-shine w-full bg-gold text-ink py-3 rounded-pill font-semibold hover:bg-gold-light transition-colors duration-300 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
