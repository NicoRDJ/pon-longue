import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100";
const title = "PON Lounge — La Sala del Tiempo";
const description =
  "PON Lounge: un lounge VIP en Medellín, una oda al tiempo y al lujo. Donde el tiempo se detiene y el lujo no tiene hora.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · PON Lounge",
  },
  description,
  robots: {
    index: process.env.NEXT_PUBLIC_ENV === "production",
    follow: process.env.NEXT_PUBLIC_ENV === "production",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "PON Lounge",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="bg-obsidian text-cream flex min-h-full flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
