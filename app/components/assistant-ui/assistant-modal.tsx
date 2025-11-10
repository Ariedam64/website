"use client";

import { BotIcon } from "lucide-react";
import { type FC, forwardRef, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AssistantModalPrimitive } from "@assistant-ui/react";
import TranslateAnimation from "../TranslateAnimation";
import { useTranslation } from "react-i18next";
import { Thread } from "@/app/components/assistant-ui/thread";

export const AssistantModal: FC = () => {
  const { t } = useTranslation("common");

  return (
    <AssistantModalPrimitive.Root>
      {/* Bouton */}
      <AssistantModalPrimitive.Trigger asChild>
        <AssistantModalButton tooltip={t("sidebar.chatbot")} />
      </AssistantModalPrimitive.Trigger>

      {/* MOBILE : Anchor monté dans <body> pour ignorer le transform de la sidebar */}
      <BodyPortal>
        <AssistantModalPrimitive.Anchor asChild>
          <div className="fixed sm:hidden z-[2] top-40 left-1/2 -translate-x-1/2 w-px h-px pointer-events-none" />
        </AssistantModalPrimitive.Anchor>
      </BodyPortal>

      {/* MOBILE : contenu attaché à l'anchor, centré et stable */}
      <AssistantModalPrimitive.Content
        side="bottom"
        align="center"
        sideOffset={10}
        avoidCollisions={false}
        className="sm:hidden z-[2] bg-transparent p-0"
      >
        <div
          className="
            w-[92vw] max-w-[480px] h-[78vh]
            bg-[#18181be1] text-[#d4d4d4] text-sm
            rounded-xl border border-[#3E304F]
            p-2 shadow-2xl shadow-purple-500/10 backdrop-blur-lg
            overflow-y-auto
          "
        >
          <Thread />
        </div>
      </AssistantModalPrimitive.Content>

      {/* DESKTOP : popover accroché au bouton à droite */}
      <AssistantModalPrimitive.Content
        side="right"
        sideOffset={150}
        className="hidden sm:block z-[60] bg-transparent p-0"
      >
        <div
          className="
            mt-45
            w-[420px] h-[500px]
            md:w-[560px] md:h-[600px]
            bg-[#18181be1] text-[#d4d4d4]
            rounded-2xl border border-[#3E304F]
            p-5 lg:p-6 shadow-2xl shadow-purple-500/10 backdrop-blur-lg
            overflow-y-auto
          "
        >
          <Thread />
        </div>
      </AssistantModalPrimitive.Content>
    </AssistantModalPrimitive.Root>
  );
};

type AssistantModalButtonProps = {
  "data-state"?: "open" | "closed";
  tooltip?: string;
};

const AssistantModalButton = forwardRef<
  HTMLButtonElement,
  AssistantModalButtonProps
>(({ "data-state": state, tooltip, ...rest }, ref) => {
  const ariaLabel = state === "open" ? "Close Assistant" : "Open Assistant";

  const baseClasses = `
    p-3 rounded-full shadow-lg inline-flex items-center justify-center cursor-pointer
    text-[#d4d4d4]
    bg-gradient-to-b from-purple-700/30 to-indigo-700/30 backdrop-blur
    border-2 border-[#3E304F]
    hover:brightness-110 active:scale-[0.98]
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9333ea]
  `;

  const ButtonElement = (
    <button
      {...rest}
      ref={ref}
      aria-label={ariaLabel}
      className={baseClasses}
    >
      <BotIcon className="w-6 h-6" />
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );

  if (!tooltip) return ButtonElement;

  return (
    <div className="relative inline-block group">
      {ButtonElement}
      <span
        role="tooltip"
        className="
          absolute bottom-full left-1/2 mb-2 -translate-x-1/2
          px-3 py-1.5 text-sm text-white
          bg-gray-800/90 rounded-md shadow-lg
          opacity-0 scale-75
          group-hover:opacity-100 group-hover:scale-100
          transform transition-all duration-200 ease-out
          whitespace-nowrap pointer-events-none z-50
          after:content-['']
          after:absolute
          after:top-full after:left-1/2
          after:-translate-x-1/2
          after:border-x-4 after:border-x-transparent
          after:border-t-4 after:border-t-gray-800/90
        "
      >
        <TranslateAnimation text={tooltip} />
      </span>
    </div>
  );
});

AssistantModalButton.displayName = "AssistantModalButton";

// Portal util: monte les enfants dans document.body
const BodyPortal: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const portalEl = useMemo(() => {
    if (typeof document === "undefined") return null as unknown as HTMLDivElement;
    const el = document.createElement("div");
    el.setAttribute("data-assistant-anchor-portal", "");
    return el;
  }, []);

  useEffect(() => {
    if (!portalEl || typeof document === "undefined") return;
    setMounted(true);
    document.body.appendChild(portalEl);
    return () => {
      try {
        document.body.removeChild(portalEl);
      } catch {}
    };
  }, [portalEl]);

  if (!mounted || !portalEl) return null;
  return createPortal(children, portalEl);
};

