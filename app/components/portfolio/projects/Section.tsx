"use client";

import React from "react";
import TranslateAnimation from "../../TranslateAnimation";

export interface SectionProps {
  emoji?: string;
  title: string;
  titleColor?: string;
  borderColor?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
}

export default function Section({
  emoji,
  title,
  titleColor = "text-white",
  borderColor,
  bodyClassName = "text-gray-300 text-sm sm:text-base pl-4 space-y-4",
  children,
}: SectionProps) {
  const headerClass = [
    "text-xl sm:text-3xl font-semibold",
    titleColor,
    borderColor ? `border-l-4 ${borderColor} pl-4` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="space-y-4 bg-zinc-800/50 p-6 rounded-lg">
      <h2 className={headerClass}>
        <span className="inline-flex items-start gap-2">
          {emoji && <span className="shrink-0 leading-none">{emoji}</span>}
          <span className="min-w-0 leading-tight">
            <TranslateAnimation text={title} />
          </span>
        </span>
      </h2>
      <div className={bodyClassName}>
        {children}
      </div>
    </section>
  );
}
