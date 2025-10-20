import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import type { TFunction } from 'i18next';

// Configuration centralisée
const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['en', 'fr'],
  },
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json', // Assurez-vous que vos fichiers sont dans public/locales/...
  },
};

i18n
  .use(HttpBackend) // Pour charger les fichiers de traduction
  .use(LanguageDetector) // Pour détecter la langue et la mémoriser (optionnel)
  .use(initReactI18next) // Pour intégrer i18next à React
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: nextI18NextConfig.i18n.defaultLocale,
    supportedLngs: nextI18NextConfig.i18n.locales,
    defaultNS: 'common', // Assurez-vous que vos traductions se trouvent dans common.json
    ns: ['common'],
    backend: {
      loadPath: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: true, // Vous pouvez le mettre à true si vous gérez un fallback via Suspense
    },
    interpolation: {
      escapeValue: false, // React s'occupe de l'échappement
    },
  });

// Utilitaire pour récupérer un tableau de chaînes depuis les traductions
export function tList(t: TFunction, key: string): string[] {
  const result = t(key, { returnObjects: true });

  if (Array.isArray(result)) {
    return result.map((value) => String(value));
  }

  if (typeof result === 'string') {
    return [result];
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
