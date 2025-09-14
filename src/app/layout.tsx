import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "$TILT → $RADR Migration",
  description:
    "Official $TILT → $RADR migration window. Opens Sep 23, 2025 12:00 PM ET. Closes Sep 30, 2025 12:00 PM ET.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-radr-black`}>
        {children}
      </body>
    </html>
  );
}
