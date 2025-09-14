import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$TILT → $RADR Migration",
  description: "The official $TILT → $RADR migration window. Opens Sep 23, 2025 12:00 PM ET. Closes Sep 30, 2025 12:00 PM ET.",
  keywords: ["TILT", "RADR", "migration", "crypto", "token", "blockchain"],
  authors: [{ name: "Radr" }],
  openGraph: {
    title: "$TILT → $RADR Migration",
    description: "The official $TILT → $RADR migration window. Opens Sep 23, 2025 12:00 PM ET. Closes Sep 30, 2025 12:00 PM ET.",
    type: "website",
    siteName: "Radr Migration",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "$TILT → $RADR Migration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "$TILT → $RADR Migration",
    description: "The official $TILT → $RADR migration window. Opens Sep 23, 2025 12:00 PM ET. Closes Sep 30, 2025 12:00 PM ET.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
