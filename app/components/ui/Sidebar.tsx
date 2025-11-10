"use client";

import { useEffect, useRef, useState } from "react";
import { HomeIcon, LanguageIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import IconButton from './Buttons';
import { useLanguageSwitcher } from '../../../utils/languageSwitcher';
import { useTranslation } from "react-i18next";
import Chat from "@/app/components/portfolio/Chat";

export default function Sidebar() {
  const { handleSwitch } = useLanguageSwitcher();
  const { t } = useTranslation("common");

  const [open, setOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      const x = e.touches[0]?.clientX ?? 0;
      touchStartX.current = x;
      touchCurrentX.current = x;
    };

    const onTouchMove = (e: TouchEvent) => {
      touchCurrentX.current = e.touches[0]?.clientX ?? null;
    };

    const onTouchEnd = () => {
      const start = touchStartX.current;
      const current = touchCurrentX.current;
      if (start == null || current == null) {
        touchStartX.current = null;
        touchCurrentX.current = null;
        return;
      }

      const dx = current - start;
      const startNearEdge = start < 20; // bord gauche

      if (!open && startNearEdge && dx > 50) {
        setOpen(true);
      } else if (open && dx < -50) {
        setOpen(false);
      }

      touchStartX.current = null;
      touchCurrentX.current = null;
    };

    // Gestion des gestes uniquement sur mobile (approx via matchMedia)
    const mq = window.matchMedia('(max-width: 639px)');
    if (mq.matches) {
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
    }
    return () => {
      if (mq.matches) {
        window.removeEventListener('touchstart', onTouchStart as any);
        window.removeEventListener('touchmove', onTouchMove as any);
        window.removeEventListener('touchend', onTouchEnd as any);
      }
    };
  }, [open]);

  return (
    <>
      {/* Panneau latéral */}
      <div
        className={`
          fixed bottom-6 left-0 sm:left-6
          sm:top-1/2 sm:bottom-auto sm:right-auto
          sm:transform sm:-translate-y-1/2
          z-50
          bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-lg
          shadow-2xl shadow-purple-500/10
          px-5 py-4 rounded-t-full rounded-b-full
          transition-transform duration-300 will-change-transform
          ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0
        `}
      >
        <div className="flex flex-col space-y-2 sm:space-y-4">
          <IconButton
            icon={<HomeIcon className="w-6 h-6" />}
            href="/"
            tooltip={t("sidebar.home")}
          />

          <IconButton
            icon={<LanguageIcon className="w-6 h-6" />}
            onClick={handleSwitch}
            tooltip={t("sidebar.translate")}
          />

          <Chat />
        </div>
      </div>

      {/* Poignée hamburger (mobile uniquement) */}
      <button
        type="button"
        aria-label={open ? 'Masquer la barre latérale' : 'Afficher la barre latérale'}
        onClick={() => setOpen(!open)}
        className={`
          sm:hidden fixed top-1/2 -translate-y-1/2 -left-3 z-50
          flex items-center justify-center
          w-7 h-16
          bg-gradient-to-b from-purple-700/30 to-indigo-700/30
          text-[#d4d4d4]
          shadow-lg border border-[#3E304F]
          rounded-r-full backdrop-blur
          transition-transform duration-200 active:scale-[0.98] hover:translate-x-1
        `}
      >
        {open ? (
          <ChevronLeftIcon className="w-5 h-5" />
        ) : (
          <ChevronRightIcon className="w-5 h-5" />
        )}
      </button>

      {/* Voile de fond pour fermer en touchant l'extérieur (mobile) */}
      {open && (
        <button
          type="button"
          aria-label="Fermer la barre latérale"
          onClick={() => setOpen(false)}
          className="sm:hidden fixed inset-0 z-40 bg-black/30"
        />
      )}
    </>
  );
}
