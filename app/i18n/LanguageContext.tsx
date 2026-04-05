"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
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

export function LanguageProvider({ lang: initialLang, children }: { lang: Language; children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(initialLang);

  const titles: Record<Language, string> = {
    en: "Spave - Book Soccer Courts in the Greater Montreal Area",
    fr: "Spave - Réservez des terrains de soccer dans le Grand Montréal",
  };

  function setLang(newLang: Language) {
    setLangState(newLang);
    const newPath = window.location.pathname.replace(/^\/(en|fr)/, `/${newLang}`);
    window.history.replaceState(null, "", newPath);
    document.title = titles[newLang];
  }

  function l(path: string) {
    return `/${lang}${path}`;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], l }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  return useContext(LanguageContext);
}
