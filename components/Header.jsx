import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";
import MobileNav from "./MobileNav";

export default async function Header() {
  const settings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-30 bg-forest/90 backdrop-blur-md border-b border-cream/10 relative">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <span className="bg-cream rounded-md p-1.5 shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt={settings.business_name}
              className="h-11 w-auto object-contain"
            />
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 font-body text-sm text-cream/85">
          <Link href="/" className="link-underline hover:text-gold transition-colors">
            Home
          </Link>
          <Link href="/properties" className="link-underline hover:text-gold transition-colors">
            Properties
          </Link>
          <Link href="/about" className="link-underline hover:text-gold transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="link-underline hover:text-gold transition-colors">
            Contact Us
          </Link>
        </nav>

        <a
          href={`tel:+${settings.phone}`}
          className="btn-shine hidden md:inline-flex items-center text-sm font-medium border border-gold/50 text-gold px-5 py-2.5 rounded-pill hover:bg-gold hover:text-ink transition-colors duration-300"
        >
          Call Now
        </a>

        <MobileNav phone={settings.phone} />
      </div>
    </header>
  );
}
