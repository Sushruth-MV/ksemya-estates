import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { getFeaturedProperties, getAllProperties } from "@/lib/data";

export default async function HomePage() {
  const featured = await getFeaturedProperties();
  const all = await getAllProperties();
  const recent = all.slice(0, 3);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden text-cream">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1653775173951-061c5bf1a4f5?w=1600&q=80&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/90 to-forest/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/60" />
        <div className="contour-bg absolute inset-0" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-28 pb-40 md:pt-40 md:pb-52">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-5 animate-fade-in-up">
            Land · Legacy · Life
          </p>
          <h1
            className="font-display italic text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-2xl animate-fade-in-up"
            style={{ animationDelay: "80ms" }}
          >
            Where land meets <span className="text-gold not-italic">opportunity.</span>
          </h1>
          <p
            className="mt-6 max-w-xl text-cream/70 text-lg animate-fade-in-up"
            style={{ animationDelay: "160ms" }}
          >
            Ksemya Estates deals in agricultural land, coffee plantations,
            and farm lands across Karnataka's hill country — with layout,
            development, and turnkey housing construction handled end to end.
          </p>
          <div
            className="mt-9 flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/properties"
              className="btn-shine bg-gold text-ink px-7 py-3.5 rounded-pill font-semibold hover:bg-gold-light transition-colors duration-300"
            >
              View All Properties →
            </Link>
            <Link
              href="/contact"
              className="border border-cream/30 text-cream px-7 py-3.5 rounded-pill font-medium hover:bg-cream/10 transition-colors duration-300"
            >
              Enquire Now
            </Link>
          </div>
        </div>

        {/* Floating glass stat card */}
        <div className="hidden lg:block absolute right-[7%] bottom-16 w-72 glass-panel rounded-lg p-7 animate-float">
          <p className="text-gold text-xs uppercase tracking-widest mb-3">Since 2004</p>
          <p className="font-display text-2xl leading-snug mb-2">
            Two decades of direct land deals.
          </p>
          <p className="text-cream/60 text-sm">
            No brokers, no middlemen — every listing personally walked and verified.
          </p>
        </div>
      </section>

      {/* Featured carousel */}
      <FeaturedCarousel properties={featured} />

      {/* Recently listed */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-2">Just In</p>
              <h2 className="font-display text-3xl md:text-4xl text-cream">Recently Listed</h2>
            </div>
            <Link href="/properties" className="link-underline text-sm text-cream/70 hover:text-gold transition-colors">
              View all
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recent.map((property, i) => (
            <Reveal key={property.id} delay={i * 100}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-bark border-y border-cream/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="border-t border-gold/30 pt-6">
                <p className="font-display text-4xl text-gold mb-3">Since 2004</p>
                <p className="text-cream/60 text-sm leading-relaxed">
                  Working land deals across Karnataka's hill country, long before
                  it was a destination on anyone's map.
                </p>
              </div>
              <div className="border-t border-gold/30 pt-6">
                <p className="font-display text-4xl text-gold mb-3">Local</p>
                <p className="text-cream/60 text-sm leading-relaxed">
                  Every listing is walked, checked, and photographed in person —
                  not sourced from a broker network.
                </p>
              </div>
              <div className="border-t border-gold/30 pt-6">
                <p className="font-display text-4xl text-gold mb-3">Direct</p>
                <p className="text-cream/60 text-sm leading-relaxed">
                  You deal with the owner directly — no middlemen, no inflated
                  commissions.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 md:px-8 py-20">
        <Reveal>
          <div
            className="max-w-6xl mx-auto relative rounded-xl overflow-hidden text-center px-8 py-20 md:py-28"
            style={{
              backgroundImage:
                "linear-gradient(rgba(14,19,16,0.82), rgba(14,19,16,0.92)), url('https://images.unsplash.com/photo-1759196452243-078353128b30?w=1600&q=80&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="font-display text-4xl md:text-6xl text-cream mb-5">
              Your next chapter starts with land.
            </h2>
            <p className="text-cream/70 mb-10 max-w-lg mx-auto">
              Let's help you find the right piece of land — for growing, building, or holding onto for what's next.
            </p>
            <Link
              href="/contact"
              className="btn-shine inline-block bg-gold text-ink px-8 py-4 rounded-pill font-semibold hover:bg-gold-light transition-colors duration-300"
            >
              Start Your Journey →
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
