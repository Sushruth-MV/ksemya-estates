import Link from "next/link";

function formatPrice(price) {
  if (!price) return "Price on request";
  const num = Number(price);
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} Lakh`;
  return `₹${num.toLocaleString("en-IN")}`;
}

export default function PropertyCard({ property }) {
  const image = property.images?.[0] || property.property_images?.[0]?.image_url || null;

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block bg-mist rounded-lg overflow-hidden border border-cream/10 hover:border-gold/50 hover:-translate-y-1.5 transition-all duration-300 shadow-lg shadow-black/20"
    >
      <div className="aspect-[4/3] bg-forest overflow-hidden relative">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-cream/30 text-sm">
            No photo yet
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent opacity-80" />
        <span className="absolute top-3 left-3 bg-gold text-ink text-xs font-semibold px-2.5 py-1 rounded-pill">
          {property.type}
        </span>
        {property.price_negotiable && (
          <span className="absolute top-3 right-3 bg-forest/80 backdrop-blur text-cream text-xs px-2.5 py-1 rounded-pill">
            Negotiable
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="font-display text-lg text-cream leading-snug mb-1">{property.title}</p>
        <p className="text-sm text-cream/50 mb-3">
          {property.location}
          {property.district ? `, ${property.district}` : ""} · {property.area}
        </p>
        <p className="font-medium text-gold">{formatPrice(property.price)}</p>
      </div>
    </Link>
  );
}
