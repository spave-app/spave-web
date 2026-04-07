import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-main",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spave - Book Soccer Courts in the Greater Montreal Area",
  description: "Find and book soccer courts by the hour across Montreal's metropolitan area. Instant booking coming soon!",
  openGraph: {
    title: "Spave - Book Soccer Courts in the Greater Montreal Area",
    description: "Find and book soccer courts by the hour across Montreal's metropolitan area. Instant booking coming soon!",
    url: "https://spaveapp.com",
    siteName: "Spave",
    images: [{ url: "https://spaveapp.com/og-image.png", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spave - Book Soccer Courts in the Greater Montreal Area",
    description: "Find and book soccer courts by the hour across Montreal's metropolitan area. Instant booking coming soon!",
    images: ["https://spaveapp.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/spave-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
