// src/utils/useLanguageSwitcher.ts
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAlternateLang, switchLanguage } from './i18n';

export function useLanguageSwitcher(defaultLang: 'fr' | 'en' = 'fr') {
  const { i18n } = useTranslation('common');
  const [currentLang, setCurrentLang] = useState<'fr' | 'en'>(
    (i18n.language as 'fr' | 'en') || defaultLang
  );

  // La langue du visiteur est appliquée après montage par I18nProvider, donc
  // l'état initial peut être dépassé : on se recale sur i18n.
  useEffect(() => {
    setCurrentLang((i18n.language as 'fr' | 'en') || defaultLang);
  }, [i18n.language, defaultLang]);

  const handleSwitch = useCallback(() => {
    switchLanguage(i18n, currentLang, setCurrentLang);
  }, [currentLang, i18n]);

  return {
    currentLang,
    alternateLang: getAlternateLang(currentLang),
    handleSwitch,
  };
}
