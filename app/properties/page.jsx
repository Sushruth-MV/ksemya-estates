import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertiesGrid from "./PropertiesGrid";
import { getAllProperties } from "@/lib/data";

export default async function PropertiesPage() {
  const properties = await getAllProperties();

  return (
    <>
      <Header />
      <section className="bg-forest border-b border-cream/10 py-16">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <p className="text-xs uppercase tracking-widest text-gold mb-2">Browse</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream">All Properties</h1>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-14">
        <PropertiesGrid initialProperties={properties} />
      </section>
      <Footer />
    </>
  );
}
