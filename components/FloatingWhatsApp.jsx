"use client";
import { usePathname } from "next/navigation";
import { buildWhatsAppLink, generalEnquiryMessage } from "@/lib/whatsapp";

export default function FloatingWhatsApp({ phone }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={buildWhatsAppLink(generalEnquiryMessage, phone)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-black/40 hover:scale-110 transition-transform duration-300"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="currentColor"
        className="relative"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.44 1.32 4.94L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2Z" />
      </svg>
    </a>
  );
}
