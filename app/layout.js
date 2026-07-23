import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/settings";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return {
    title: `${settings.business_name} — ${settings.tagline}`,
    description:
      "Agricultural land, coffee plantations, and farm lands across Karnataka's hill country. Layout, development, and turnkey housing construction.",
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: settings.business_name,
    description:
      "Land developers, sellers, buyers, and aggregators since 2004, dealing in agricultural land, coffee plantations, and farm lands across Karnataka's hill country, with layout, development, and turnkey housing construction services.",
    email: settings.email,
    address: settings.address,
  };

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
