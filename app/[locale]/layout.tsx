import type { Metadata } from "next";
import type { Language } from "../i18n/translations";
import { LanguageProvider } from "../i18n/LanguageContext";
import CookieBanner from "../components/CookieBanner";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

const meta: Record<Language, Metadata> = {
  en: {
    title: "Spave – Book Soccer Courts in the Greater Montreal Area",
    description: "Find and book soccer courts across the Greater Montreal Area in a few clicks. No calls, no guesswork.",
    alternates: {
      canonical: "https://spaveapp.com",
      languages: {
        "en-CA": "https://spaveapp.com",
        "fr-CA": "https://spaveapp.com/fr",
      },
    },
  },
  fr: {
    title: "Spave – Réservez des terrains de soccer dans le Grand Montréal",
    description: "Trouvez et réservez des terrains de soccer dans le Grand Montréal en quelques clics. Sans appels, sans tracas.",
    alternates: {
      canonical: "https://spaveapp.com/fr",
      languages: {
        "en-CA": "https://spaveapp.com",
        "fr-CA": "https://spaveapp.com/fr",
      },
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Language = locale === "fr" ? "fr" : "en";
  return meta[lang];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Language = locale === "fr" ? "fr" : "en";

  return (
    <LanguageProvider lang={lang}>
      {children}
      <CookieBanner />
    </LanguageProvider>
  );
}
