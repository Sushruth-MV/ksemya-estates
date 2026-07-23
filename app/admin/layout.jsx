"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [session, setSession] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Login page doesn't need the guard
    if (pathname === "/admin/login") {
      setChecked(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setSession(data.session);
      }
      setChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (!sess) router.push("/admin/login");
    });

    return () => listener.subscription.unsubscribe();
  }, [pathname, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (pathname === "/admin/login") return children;

  if (!checked) {
    return (
      <div className="min-h-screen bg-forest flex items-center justify-center text-cream/50">
        Checking login...
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-bark md:flex">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-30 bg-forest border-b border-cream/10 relative">
        <div className="flex items-center justify-between px-5 h-16">
          <span className="inline-block bg-cream rounded-md p-1.5 shadow-lg shadow-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Ksemya Estates" className="h-8 w-auto object-contain" />
          </span>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="relative w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block w-6 h-[1.5px] bg-cream transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-cream transition-opacity duration-300 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block w-6 h-[1.5px] bg-cream transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-forest border-b border-cream/10 shadow-xl shadow-black/30 animate-fade-in-up">
            <nav className="flex flex-col px-5 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-3 border-b border-cream/5 last:border-0 transition-colors ${
                    pathname === item.href ? "text-gold font-semibold" : "text-cream/80 hover:text-gold"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="mt-3 mb-1 text-sm text-cream/60 hover:text-cream border border-cream/15 rounded-pill py-2.5 transition-colors duration-200"
              >
                Log Out
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 bg-forest border-r border-cream/10 text-cream flex-col shrink-0">
        <div className="px-5 py-7">
          <span className="inline-block bg-cream rounded-md p-1.5 shadow-lg shadow-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Ksemya Estates" className="h-9 w-auto object-contain" />
          </span>
          <p className="text-xs text-cream/40 mt-3 tracking-wide">Owner Dashboard</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 rounded-pill text-sm transition-colors duration-200 ${
                pathname === item.href
                  ? "bg-gold text-ink font-semibold"
                  : "text-cream/70 hover:bg-cream/10 hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full text-sm text-cream/60 hover:text-cream hover:border-gold/40 border border-cream/15 rounded-pill py-2.5 transition-colors duration-200"
          >
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-5 md:p-10 min-w-0">{children}</main>
    </div>
  );
}
