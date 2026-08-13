import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

/* Archivo — a grotesque with signage and industrial heritage, which is the
   right register for equipment, crews and payroll. IBM Plex Mono carries
   every number and label so figures read as instrument data, not decoration. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: "Tinex.AI — AI employees for landscaping and hardscaping crews",
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI receptionist for landscapers",
    "landscaping AI assistant",
    "hardscaping estimating software",
    "AI employee",
    "contractor answering service",
  ],
  openGraph: {
    title: "Tinex.AI — AI employees for landscaping and hardscaping crews",
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinex.AI — AI employees for landscaping and hardscaping crews",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080a14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh bg-ground text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
