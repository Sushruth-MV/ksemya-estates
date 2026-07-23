"use client";
import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function MobileNav({ phone }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative w-9 h-9 flex flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block w-6 h-[1.5px] bg-cream transition-transform duration-300 ${
            open ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-6 h-[1.5px] bg-cream transition-opacity duration-300 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block w-6 h-[1.5px] bg-cream transition-transform duration-300 ${
            open ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full bg-forest border-b border-cream/10 shadow-xl shadow-black/30 animate-fade-in-up">
          <nav className="flex flex-col px-5 py-4">
            {LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-cream/85 hover:text-gold border-b border-cream/5 last:border-0 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:+${phone}`}
              className="btn-shine mt-4 inline-flex items-center justify-center text-sm font-medium border border-gold/50 text-gold px-5 py-3 rounded-pill hover:bg-gold hover:text-ink transition-colors duration-300"
            >
              Call Now
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
