"use client"

import { useState } from "react";
import { HomeIcon } from '@heroicons/react/24/outline'
import { LanguageIcon } from '@heroicons/react/24/outline'
import IconButton from './Buttons';
import { useLanguageSwitcher } from '../../../utils/languageSwitcher';
import { useTranslation } from "react-i18next";
import Chat from "@/app/components/portfolio/Chat"
 

export default function Sidebar() {

  const { handleSwitch } = useLanguageSwitcher();
  const { t } = useTranslation("common");

  return (
    <div className={`
        fixed bottom-6 left-6 flex flex-col space-y-2
        sm:top-1/2 sm:left-6 sm:bottom-auto sm:right-auto
        sm:transform sm:-translate-y-1/2 sm:space-y-4
        z-50
        bg-gradient-to-br from-indigo-600/20 to-purple-600/20
        backdrop-blur-lg
        shadow-2xl shadow-purple-500/10
        px-5 py-4
        rounded-t-full rounded-b-full
        transition-all duration-300
      `}
    >
      {/* Bouton Home */}
      <IconButton
        icon={<HomeIcon className="w-6 h-6" />}
        href="/"
        tooltip={t("sidebar.home")}
      />

      {/* Bouton Traduction  */}
      <IconButton
        icon={<LanguageIcon className="w-6 h-6" />}
        onClick={handleSwitch}
        tooltip={t("sidebar.translate")}
      />

      {/* Bouton Chatbot assistant ajouter le code ici */}
      <Chat/>

    </div>
  )
}