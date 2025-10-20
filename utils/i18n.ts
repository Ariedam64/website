import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import type { TFunction } from 'i18next';

import enCommon from '../public/locales/en/common.json';
import frCommon from '../public/locales/fr/common.json';

const resources = {
  en: { common: enCommon },
  fr: { common: frCommon },
} as const;

const defaultLocale: keyof typeof resources = 'fr';
const supportedLngs = Object.keys(resources);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const isBrowser = typeof window !== 'undefined';

if (!i18n.isInitialized) {
  if (isBrowser) {
    i18n.use(HttpBackend).use(LanguageDetector);
  }

  i18n.use(initReactI18next).init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: defaultLocale,
    supportedLngs,
    defaultNS: 'common',
    ns: ['common'],
    initImmediate: false,
    resources: isBrowser ? undefined : resources,
    backend: isBrowser
      ? {
          loadPath: `${basePath}/locales/{{lng}}/{{ns}}.json`,
        }
      : undefined,
    detection: isBrowser
      ? {
          order: ['localStorage', 'cookie', 'navigator'],
          caches: ['localStorage', 'cookie'],
        }
      : undefined,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
}

// Utilitaire pour récupérer un tableau typé depuis les traductions
export function tList<T = string>(t: TFunction, key: string): T[] {
  const result = t(key, { returnObjects: true });
  if (Array.isArray(result)) {
    return result as T[];
  }
  if (
    typeof result === 'string' ||
    typeof result === 'number' ||
    typeof result === 'boolean'
  ) {
    return [result as unknown as T];
  }
  return [];
}

export function getAlternateLang(current: 'fr' | 'en'): 'fr' | 'en' {
  return current === 'fr' ? 'en' : 'fr';
}

export async function switchLanguage(
  i18n: { changeLanguage: (l: string) => Promise<any> },
  current: 'fr' | 'en',
  setCurrent: (l: 'fr' | 'en') => void
): Promise<'fr' | 'en'> {
  const next = getAlternateLang(current);
  await i18n.changeLanguage(next);
  setCurrent(next);
  return next;
}

export default i18n;
