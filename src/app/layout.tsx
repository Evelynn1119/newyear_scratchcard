import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Celestial Steed | Lunar New Year 2026",
  description: "A 7-day journey of blessings for the Year of the Horse. Scratch to reveal your daily gift.",
  keywords: ["Lunar New Year", "2026", "Year of the Horse", "Scratch Card", "Digital Gift"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}

