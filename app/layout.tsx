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
  metadataBase: new URL("https://spaveapp.com"),
  title: {
    default: "Spave – Book Soccer Courts in the Greater Montreal Area",
    template: "%s | Spave",
  },
  description:
    "Find and book soccer courts by the hour across Montreal's metropolitan area. Direct booking coming soon!",
  openGraph: {
    title: "Spave – Book Soccer Courts in the Greater Montreal Area",
    description:
      "Find and book soccer courts by the hour across Montreal's metropolitan area. Direct booking coming soon!",
    url: "https://spaveapp.com",
    siteName: "Spave",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Spave – Book Soccer Courts in Montreal" }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spave – Book Soccer Courts in the Greater Montreal Area",
    description:
      "Find and book soccer courts by the hour across Montreal's metropolitan area. Direct booking coming soon!",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://spaveapp.com",
    languages: {
      "en-CA": "https://spaveapp.com",
      "fr-CA": "https://spaveapp.com/fr",
    },
  },
  themeColor: "#76043D",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Spave",
  url: "https://spaveapp.com",
  description:
    "Find and book soccer courts by the hour across Montreal's metropolitan area.",
  inLanguage: ["en-CA", "fr-CA"],
  potentialAction: {
    "@type": "SearchAction",
    target: "https://spaveapp.com/browse?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Spave",
  description:
    "Marketplace for booking soccer courts by the hour in the Greater Montreal Area.",
  url: "https://spaveapp.com",
  logo: "https://spaveapp.com/spave-logo.svg",
  image: "https://spaveapp.com/og-image.png",
  areaServed: {
    "@type": "City",
    name: "Montreal",
    addressCountry: "CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
