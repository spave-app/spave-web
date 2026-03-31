import type { Language } from "../i18n/translations";
import { LanguageProvider } from "../i18n/LanguageContext";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
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

  return <LanguageProvider lang={lang}>{children}</LanguageProvider>;
}
