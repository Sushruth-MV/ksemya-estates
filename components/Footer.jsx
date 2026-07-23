import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="bg-bark border-t border-cream/10 mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-12">
        <div className="max-w-xs">
          <span className="inline-block bg-cream rounded-md p-2 shadow-lg shadow-black/20 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt={settings.business_name} className="h-12 w-auto object-contain" />
          </span>
          <p className="text-xs text-gold mb-2 tracking-widest uppercase">{settings.tagline}</p>
          <p className="text-sm text-cream/60 leading-relaxed">
            Agricultural land, coffee plantations, and farm lands across
            Karnataka's hill country — with layout, development, and
            turnkey housing construction services.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gold mb-4">Quick Links</p>
          <ul className="space-y-3 text-sm text-cream/70">
            <li><Link href="/properties" className="link-underline hover:text-cream transition-colors">All Properties</Link></li>
            <li><Link href="/about" className="link-underline hover:text-cream transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="link-underline hover:text-cream transition-colors">Contact Us</Link></li>
            <li><Link href="/admin/login" className="link-underline hover:text-cream transition-colors">Owner Login</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gold mb-4">Get In Touch</p>
          <ul className="space-y-3 text-sm text-cream/70">
            <li className="leading-relaxed">{settings.address}</li>
            <li><a href={`tel:+${settings.phone}`} className="link-underline hover:text-cream transition-colors">+{settings.phone}</a></li>
            <li><a href={`mailto:${settings.email}`} className="link-underline hover:text-cream transition-colors">{settings.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {settings.business_name}. All rights reserved.
      </div>
    </footer>
  );
}
