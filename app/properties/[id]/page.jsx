import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/EnquiryForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getPropertyById } from "@/lib/data";
import { getSiteSettings } from "@/lib/settings";
import { propertyEnquiryMessage } from "@/lib/whatsapp";
import { notFound } from "next/navigation";

function formatPrice(price) {
  if (!price) return "Price on request";
  const num = Number(price);
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} Lakh`;
  return `₹${num.toLocaleString("en-IN")}`;
}

function youTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{11})/);
  if (!match) return null;
  return `https://www.youtube.com/embed/${match[1]}`;
}

export default async function PropertyDetailPage({ params }) {
  const property = await getPropertyById(params.id);
  if (!property) return notFound();
  const settings = await getSiteSettings();

  const images = property.images || property.property_images?.map((img) => img.image_url) || [];
  const embedUrl = youTubeEmbedUrl(property.youtube_url);

  return (
    <>
      <Header />
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Photo gallery */}
          <div className="grid grid-cols-2 gap-3">
            {images.length > 0 ? (
              images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt={`${property.title} photo ${i + 1}`}
                  className={`rounded-lg object-cover w-full border border-cream/10 ${
                    i === 0 ? "col-span-2 aspect-video" : "aspect-square"
                  }`}
                />
              ))
            ) : (
              <div className="col-span-2 aspect-video bg-mist border border-cream/10 rounded-lg flex items-center justify-center text-cream/30">
                No photos yet
              </div>
            )}
          </div>

          {/* Video */}
          {embedUrl && (
            <div className="aspect-video rounded-lg overflow-hidden border border-cream/10">
              <iframe
                src={embedUrl}
                title="Property walkthrough video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Info */}
          <div>
            <span className="inline-block bg-gold text-ink text-xs font-semibold px-3 py-1 rounded-pill mb-4">
              {property.type}
            </span>
            <h1 className="font-display text-3xl md:text-4xl text-cream mb-2">{property.title}</h1>
            <p className="text-cream/50 mb-4">
              {property.location}
              {property.district ? `, ${property.district}` : ""} · {property.area}
            </p>
            <p className="font-display text-2xl text-gold mb-6">
              {formatPrice(property.price)}
              {property.price_negotiable && (
                <span className="text-sm text-cream/40 font-body ml-2">(Negotiable)</span>
              )}
            </p>
            <p className="text-cream/70 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Extra details — only shown if at least one was filled in */}
          {(property.survey_number ||
            property.khata_type ||
            property.facing ||
            property.road_width ||
            property.nearest_landmark) && (
            <div className="glass-panel rounded-lg p-7">
              <h2 className="font-display text-xl text-cream mb-5">Property Details</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                {property.survey_number && (
                  <div>
                    <dt className="text-cream/40 mb-1">Survey / Site Number</dt>
                    <dd className="text-cream font-medium">{property.survey_number}</dd>
                  </div>
                )}
                {property.khata_type && (
                  <div>
                    <dt className="text-cream/40 mb-1">Khata Type</dt>
                    <dd className="text-cream font-medium">{property.khata_type} Khata</dd>
                  </div>
                )}
                {property.facing && (
                  <div>
                    <dt className="text-cream/40 mb-1">Facing</dt>
                    <dd className="text-cream font-medium">{property.facing}</dd>
                  </div>
                )}
                {property.road_width && (
                  <div>
                    <dt className="text-cream/40 mb-1">Road Width</dt>
                    <dd className="text-cream font-medium">{property.road_width}</dd>
                  </div>
                )}
                {property.nearest_landmark && (
                  <div className="sm:col-span-2">
                    <dt className="text-cream/40 mb-1">Nearest Landmark</dt>
                    <dd className="text-cream font-medium">{property.nearest_landmark}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>

        {/* Sidebar: enquiry */}
        <aside className="space-y-4 h-fit lg:sticky lg:top-28">
          <div className="glass-panel rounded-lg p-6">
            <EnquiryForm propertyId={property.id} title="Enquire About This Property" />
          </div>
          <WhatsAppButton
            message={propertyEnquiryMessage(property)}
            label="Enquire on WhatsApp"
            phone={settings.phone}
          />
        </aside>
      </section>
      <Footer />
    </>
  );
}
