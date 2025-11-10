"use client";

import React from "react";
import TranslateAnimation from "../../TranslateAnimation";

export interface ListItem {
  icon?: string;
  text: string;
}

export type ListStyle =
  | "disc"
  | "decimal"
  | "none";

export interface ListSectionProps {
  items: unknown;
  textColor?: string;
  listStyle?: ListStyle;
}

export default function ListSection({
  items,
  textColor = "text-white",
  listStyle = "disc",
}: ListSectionProps) {
  const safeItems: ListItem[] = Array.isArray(items)
    ? (items as any[]).reduce<ListItem[]>((acc, item) => {
        if (
          item &&
          typeof item === "object" &&
          "text" in item &&
          (typeof (item as any).text === "string" || typeof (item as any).text === "number")
        ) {
          acc.push({
            icon: typeof (item as any).icon === "string" ? (item as any).icon : undefined,
            text: String((item as any).text),
          });
        } else if (typeof item === "string" || typeof item === "number") {
          acc.push({ text: String(item) });
        }
        return acc;
      }, [])
    : [];

  return (
    <ul className={`list-none space-y-2 ${textColor}`}>
      {safeItems.map(({ icon, text }, idx) => (
        <li key={idx} className="flex items-start gap-x-3">
          {/* Marqueur personnalisé: icône prioritaire, sinon puce/numéro */}
          {icon ? (
            <span className="flex-shrink-0 leading-none mt-1">{icon}</span>
          ) : listStyle === "decimal" ? (
            <span className="flex-shrink-0 text-gray-400 w-5 text-right select-none">{idx + 1}.</span>
          ) : listStyle === "disc" ? (
            <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-current" />
          ) : null}
          <span className="flex-1 min-w-0">
            <TranslateAnimation text={text} />
          </span>
        </li>
      ))}
    </ul>
  );
}
