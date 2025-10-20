// i18n.ts
import i18n from "i18next";
import FSBackend from "i18next-fs-backend";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import type { TFunction } from "i18next";
import path from "path";

const isServer = typeof window === "undefined";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// public/locales/fr/common.json
// public/locales/en/common.json

if (!i18n.isInitialized) {
  i18n.use(initReactI18next);

  if (isServer) {
    // Serveur: lit les fichiers directement depuis le FS (aucun réseau pendant SSR/SSG)
    i18n.use(FSBackend);
  } else {
    // Client: charge via HTTP et détecte la langue
    i18n.use(HttpBackend);
    i18n.use(LanguageDetector);
  }

  i18n.init({
    debug: process.env.NODE_ENV === "development",
    fallbackLng: "fr",
    supportedLngs: ["en", "fr"],
    defaultNS: "common",
    ns: ["common"],

    backend: isServer
      ? {
          loadPath: path.join(
            process.cwd(),
            "public",
            "locales",
            "{{lng}}",
            "{{ns}}.json"
          ),
        }
      : {
          loadPath: `${basePath}/locales/{{lng}}/{{ns}}.json`,
        },

    detection: !isServer
      ? { order: ["localStorage", "cookie", "navigator"], caches: ["localStorage", "cookie"] }
      : undefined,

    // Pas de Suspense côté serveur, sinon tu bloques le rendu
    react: { useSuspense: !isServer },

    interpolation: { escapeValue: false },

    // Évite la microtask async en SSR qui traîne et cause des timeouts
    initImmediate: false,
  });
}

// Utilitaire pour récupérer un tableau de chaînes depuis les traductions
export function tList(t: TFunction, key: string): string[] {
  const result = t(key, { returnObjects: true });
  if (Array.isArray(result)) return result.map(String);
  if (typeof result === "string") return [result];
  return [];
}

export function getAlternateLang(current: "fr" | "en"): "fr" | "en" {
  return current === "fr" ? "en" : "fr";
}

export async function switchLanguage(
  i18nInst: { changeLanguage: (l: string) => Promise<any> },
  current: "fr" | "en",
  setCurrent: (l: "fr" | "en") => void
): Promise<"fr" | "en"> {
  const next = getAlternateLang(current);
  await i18nInst.changeLanguage(next);
  setCurrent(next);
  return next;
}

export default i18n;
