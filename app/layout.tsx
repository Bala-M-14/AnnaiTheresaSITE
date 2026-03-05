import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Playpen_Sans_Arabic } from "next/font/google";
import "./globals.css";

const playpenArabic = Playpen_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-playpen-arabic",
  weight: ["400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amplivex",
  description: "Innovation & Growth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${playpenArabic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}