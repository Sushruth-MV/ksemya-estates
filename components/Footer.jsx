import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";

// Placeholder until the client shares real profile links — swap the href
// values below when they're provided.
const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <path d="M12 2.2c2.7 0 3 .01 4.1.06 1.1.05 1.8.22 2.2.36.6.24 1 .5 1.4.9.4.4.7.9.9 1.4.15.4.3 1.1.36 2.2.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1.1-.22 1.8-.36 2.2-.24.6-.5 1-.9 1.4-.4.4-.9.7-1.4.9-.4.15-1.1.3-2.2.36-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1.1-.05-1.8-.22-2.2-.36-.6-.24-1-.5-1.4-.9-.4-.4-.7-.9-.9-1.4-.15-.4-.3-1.1-.36-2.2-.05-1.1-.06-1.4-.06-4.1s.01-3 .06-4.1c.05-1.1.22-1.8.36-2.2.24-.6.5-1 .9-1.4.4-.4.9-.7 1.4-.9.4-.15 1.1-.3 2.2-.36 1.1-.05 1.4-.06 4.1-.06M12 0C9.28 0 8.94.01 7.87.06 6.8.11 6.07.28 5.43.53c-.67.26-1.24.6-1.8 1.17-.57.56-.91 1.13-1.17 1.8-.25.64-.42 1.37-.47 2.44C1.94 6.99 1.93 8 1.93 10.72v2.56c0 2.72.01 3.73.06 4.8.05 1.07.22 1.8.47 2.44.26.67.6 1.24 1.17 1.8.56.57 1.13.91 1.8 1.17.64.25 1.37.42 2.44.47 1.07.05 1.38.06 4.13.06s3.06-.01 4.13-.06c1.07-.05 1.8-.22 2.44-.47.67-.26 1.24-.6 1.8-1.17.57-.56.91-1.13 1.17-1.8.25-.64.42-1.37.47-2.44.05-1.07.06-1.38.06-4.13v-2.56c0-2.72-.01-3.73-.06-4.8-.05-1.07-.22-1.8-.47-2.44a4.96 4.96 0 0 0-1.17-1.8A4.96 4.96 0 0 0 18.57.53c-.64-.25-1.37-.42-2.44-.47C15.06.01 14.72 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <path d="M13.5 21v-8.5h2.85l.43-3.3h-3.28V6.9c0-.96.27-1.6 1.65-1.6h1.76V2.36C16.6 2.25 15.6 2.15 14.44 2.15c-2.4 0-4.05 1.47-4.05 4.16v2.32H7.53v3.3h2.86V21h3.11z" />
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.6 4 12 4 12 4s-7.6 0-9.4.4A3 3 0 0 0 .5 6.5 31 31 0 0 0 .1 12a31 31 0 0 0 .4 5.5 3 3 0 0 0 2.1 2.1C4.4 20 12 20 12 20s7.6 0 9.4-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-5.5 31 31 0 0 0-.4-5.5zM9.7 15.5v-7l6.2 3.5-6.2 3.5z" />
    ),
  },
];

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

          <p className="text-xs uppercase tracking-widest text-gold mt-6 mb-4">Follow Us</p>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-9 h-9 rounded-full bg-mist border border-cream/10 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold/40 hover:-translate-y-0.5 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} {settings.business_name}. All rights reserved.
      </div>
    </footer>
  );
}
