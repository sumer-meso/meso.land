import type { Metadata } from "next";
import { Geist_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Sans-serif body face. Exposed as --font-sans for Tailwind's font-sans utility.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Serif display face for headings. Exposed as --font-serif for Tailwind's font-serif utility.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "meso.land — Protocol of Sovereign Existence",
  description: "An unforgeable, self-owned cryptographic key protocol for humans, hardware, and AIs. Interact directly across the web and physical world—no databases, no middlemen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
