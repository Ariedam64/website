"use client";

import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { readStoredLocale } from "./i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // La langue préférée n'est appliquée qu'après montage : pendant le rendu
  // initial, client et serveur doivent afficher exactement la même chose,
  // sinon React signale un écart d'hydratation et rejette l'arbre.
  useEffect(() => {
    const stored = readStoredLocale();
    if (stored && stored !== i18n.language) {
      void i18n.changeLanguage(stored);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
