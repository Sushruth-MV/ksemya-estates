import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const paragraphs = settings.about_us.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <Header />

      {/* Hero banner */}
      <section
        className="relative py-24 md:py-32 text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14,19,16,0.88), rgba(14,19,16,0.94)), url('https://images.unsplash.com/photo-1630347254189-468465d1f99b?w=1600&q=80&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="text-xs uppercase tracking-widest text-gold mb-3">Our Story</p>
        <h1 className="font-display text-4xl md:text-6xl text-cream">
          About {settings.business_name}
        </h1>
      </section>

      <section className="max-w-4xl mx-auto px-5 md:px-8 py-16">
        <Reveal>
          <div className="space-y-5 text-cream/70 leading-relaxed text-lg">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14 glass-panel rounded-lg p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl text-cream mb-6">What We Deal In</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm text-cream/60">
              <li className="bg-forest rounded-lg p-5 border border-cream/10 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300">
                <p className="font-display text-lg font-medium text-gold mb-2">
                  Coffee Plantations
                </p>
                Shaded Arabica and Robusta plantations, with or without existing infrastructure.
              </li>
              <li className="bg-forest rounded-lg p-5 border border-cream/10 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300">
                <p className="font-display text-lg font-medium text-gold mb-2">
                  Agricultural &amp; Farm Land
                </p>
                Red-soil and irrigated parcels suited for pepper, areca, and mixed cropping.
              </li>
              <li className="bg-forest rounded-lg p-5 border border-cream/10 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300">
                <p className="font-display text-lg font-medium text-gold mb-2">
                  Layout, Development &amp; Construction
                </p>
                Layout planning, land development, and turnkey housing construction projects.
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="btn-shine inline-block bg-gold text-ink px-8 py-3.5 rounded-pill font-semibold hover:bg-gold-light transition-colors duration-300"
          >
            Get In Touch
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
