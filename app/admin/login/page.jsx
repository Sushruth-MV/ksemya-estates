"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError("Login failed. Check your email/password, or confirm Supabase Auth is connected.");
      return;
    }
    router.push("/admin");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(14,19,16,0.88), rgba(14,19,16,0.94)), url('https://images.unsplash.com/photo-1653775173951-061c5bf1a4f5?w=1600&q=80&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="contour-bg absolute inset-0" />
      <div className="glass-panel rounded-lg p-9 w-full max-w-sm relative animate-fade-in-up">
        <span className="inline-block bg-cream rounded-md p-2 shadow-lg shadow-black/30 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Ksemya Estates" className="h-10 w-auto object-contain" />
        </span>
        <p className="text-sm text-cream/50 mb-7">Owner Dashboard Login</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-cream/60 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-cream/15 rounded-sm px-3 py-2.5 bg-forest text-cream focus:border-gold outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-cream/60 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-cream/15 rounded-sm px-3 py-2.5 bg-forest text-cream focus:border-gold outline-none transition-colors"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-shine w-full bg-gold text-ink py-3 rounded-pill font-semibold hover:bg-gold-light transition-colors duration-300 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
