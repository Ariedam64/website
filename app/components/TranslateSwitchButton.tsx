"use client";

import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { HiArrowPath } from "react-icons/hi2";

interface SwitchButtonProps {
  onClick: () => void;
}

export default function TranslateSwitchButton() {
  const { i18n } = useTranslation('common');
  const [currentLang, setCurrentLang] = useState(i18n.language || 'fr');
  const [labelAnimating, setLabelAnimating] = useState(false);
  const [rotating, setRotating] = useState(false);

  const alternateLang = currentLang === 'fr' ? 'en' : 'fr';

  const handleClick = () => {
    setRotating(true);
    setLabelAnimating(true);

    setTimeout(() => {
      i18n.changeLanguage(alternateLang);
      setCurrentLang(alternateLang);
    }, 250);

    setTimeout(() => {
      setLabelAnimating(false);
      setRotating(false);
    }, 500);
  };

  return (
    <button
      onClick={handleClick}
      className="
          p-3 bg-gray-800 text-white rounded-full shadow-lg
          hover:bg-gray-700 border-2 border-purple-500/80
        "
    >
      <HiArrowPath
        className={`text-white text-2xl ${
          rotating
            ?
              "animate-[spin_0.5s_linear]"
            : ""
        }`}
      />
    </button>
  );
}
