import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/EnquiryForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { generalEnquiryMessage } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/settings";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <section className="bg-forest border-b border-cream/10 py-16">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <p className="text-xs uppercase tracking-widest text-gold mb-2">Get In Touch</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream">Contact Us</h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="text-cream/60 mb-8 leading-relaxed">
            Have a question about a property, or looking for something specific that isn&apos;t
            listed yet? Send us a message or reach out directly on WhatsApp — we usually respond the
            same day.
          </p>

          <ul className="space-y-4 text-sm text-cream/70 mb-8">
            <li className="flex gap-3">
              <span className="text-gold font-medium shrink-0">Phone</span>
              <span>+{settings.phone}</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-medium shrink-0">Email</span>
              <span>{settings.email}</span>
            </li>
            <li className="flex gap-3">
              <span className="text-gold font-medium shrink-0">Address</span>
              <span>{settings.address}</span>
            </li>
          </ul>

          <WhatsAppButton
            message={generalEnquiryMessage}
            label="Chat with us on WhatsApp"
            phone={settings.phone}
          />
        </div>

        <div className="glass-panel rounded-lg p-6 md:p-7 h-fit">
          <EnquiryForm propertyId={null} title="Send a General Enquiry" />
        </div>
      </section>
      <Footer />
    </>
  );
}
