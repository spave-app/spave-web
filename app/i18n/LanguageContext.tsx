"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { translations, type Language, type Translations } from "./translations";

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
  l: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
  l: (path) => `/en${path}`,
});

const PAGE_TITLES: Record<Language, string> = {
  en: "Spave - Book Soccer Courts in the Greater Montreal Area",
  fr: "Spave - Réservez des terrains de soccer dans le Grand Montréal",
};

export function LanguageProvider({ lang: initialLang, children }: { lang: Language; children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(initialLang);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    const newPath = window.location.pathname.replace(/^\/(en|fr)/, `/${newLang}`);
    window.history.replaceState(null, "", newPath);
    document.title = PAGE_TITLES[newLang];
  }, []);

  const l = useCallback((path: string) => `/${lang}${path}`, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang] as Translations, l }),
    [lang, setLang, l]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  return useContext(LanguageContext);
}
