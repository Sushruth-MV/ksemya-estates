import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppButton({ message, label = "Enquire on WhatsApp", phone }) {
  return (
    <a
      href={buildWhatsAppLink(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-shine flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-pill font-medium hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.44 1.32 4.94L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2Z" />
      </svg>
      {label}
    </a>
  );
}
