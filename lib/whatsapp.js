// Builds a wa.me deep link with a pre-filled message. Phone comes from the
// owner-editable site_settings (see lib/settings.js), with a placeholder
// fallback so buttons still render before settings are configured.

const FALLBACK_PHONE = "918660727074";

export function buildWhatsAppLink(message, phone = FALLBACK_PHONE) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function propertyEnquiryMessage(property) {
  const priceText = property?.price
    ? `priced at \u20b9${Number(property.price).toLocaleString("en-IN")}`
    : "";
  return `Hi, I'm interested in ${property?.title || "this property"} - ${
    property?.location || ""
  }, ${priceText}. Please share more details.`;
}

export const generalEnquiryMessage =
  "Hi, I'd like to know more about available properties.";
