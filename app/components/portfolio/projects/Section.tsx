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
  bodyClassName = "text-gray-300 pl-4 space-y-4",
  children,
}: SectionProps) {
  const headerClass = [
    "text-2xl sm:text-3xl font-semibold",
    titleColor,
    borderColor ? `border-l-4 ${borderColor} pl-4` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="space-y-4 bg-zinc-800/50 p-6 rounded-lg">
      <h2 className={headerClass}>
        {emoji && <span className="mr-2">{emoji}</span>}
        <TranslateAnimation text={title} />
      </h2>
      <div className={bodyClassName}>
        {children}
      </div>
    </section>
  );
}
