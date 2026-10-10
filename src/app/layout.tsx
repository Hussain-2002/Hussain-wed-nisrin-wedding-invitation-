import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Noto_Naskh_Arabic, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Hussain & Nisrin · 2–7 August 2027",
  description:
    "Hussain and Nisrin joyfully invite you across Ujjain, Chechat and Indore. 2–7 August 2027.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} ${script.variable} ${naskh.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-night text-ivory">{children}</body>
    </html>
  );
}
