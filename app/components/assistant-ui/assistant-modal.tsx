"use client";

import { BotIcon } from "lucide-react";
import { type FC, forwardRef } from "react";
import { AssistantModalPrimitive } from "@assistant-ui/react";
import TranslateAnimation from "../TranslateAnimation";
import { useTranslation } from "react-i18next";

import { Thread } from "@/app/components/assistant-ui/thread";

export const AssistantModal: FC = () => {
  const { t } = useTranslation("common");
  return (
    <AssistantModalPrimitive.Root>
      <AssistantModalPrimitive.Trigger asChild>
        <AssistantModalButton tooltip={t("sidebar.chatbot")} />
      </AssistantModalPrimitive.Trigger>
      <AssistantModalPrimitive.Content
        side="right"
        align="center"
        sideOffset={50}
        alignOffset={4}
        className="
          bg-popover text-popover-foreground
          z-50

          /* Mobile */
          w-[300px] h-[400px]

          /* Tablettes ≥640px */
          sm:w-[350px] sm:h-[450px]

          /* Desktop ≥768px */
          md:w-[450px] md:h-[550px]

          overflow-y-auto
          rounded-xl border
          p-4 sm:p-6 lg:p-8

          shadow-md outline-none
          [&>.aui-thread-root]:bg-inherit

          data-[state=closed]:animate-out data-[state=open]:animate-in
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
          data-[state=closed]:zoom-out data-[state=open]:zoom-in
        "
      >
        <Thread />
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
    p-3 bg-gray-800 text-white rounded-full shadow-lg
    hover:bg-gray-700 border-2 border-purple-500/80
    inline-flex items-center justify-center
    cursor-pointer
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

  if (!tooltip) {
    return ButtonElement;
  }

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

          /* flèche sous la bulle */
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
