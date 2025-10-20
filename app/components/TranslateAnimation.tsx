"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/translateAnimation.module.css";

interface TranslateAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

export default function TranslateAnimation({
  text,
  duration = 300,
  className = "",
}: TranslateAnimationProps) {
  const { i18n } = useTranslation();
  const [prevLang, setPrevLang] = useState(i18n.language);
  const [displayedText, setDisplayedText] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Si on a un nouveau texte ou un changement de langue...
    if (text !== displayedText || i18n.language !== prevLang) {
      // on fade-out
      setVisible(false);
      // après la durée, on change le texte+langue, puis fade-in
      const timeout = setTimeout(() => {
        setDisplayedText(text);
        setPrevLang(i18n.language);
        setVisible(true);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [text, i18n.language, duration]);

  return (
    <span
      className={`${styles.fade} ${visible ? styles.enter : ""} ${className}`}
      style={{ transition: `opacity ${duration}ms ease` }}
    >
      {displayedText}
    </span>
  );
}
