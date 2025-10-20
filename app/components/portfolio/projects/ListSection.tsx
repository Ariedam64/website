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

  const styleClasses: Record<ListStyle, string> = {
    disc: "list-disc",
    decimal: "list-decimal",
    none: "list-none",
  };

  const listTypeClass = styleClasses[listStyle];
  const positionClass = "list-outside";

  return (
    <ul className={`${listTypeClass} ${positionClass} space-y-2 ${textColor} pl-2 sm:pl-4 md:pl-6`}>
      {safeItems.map(({ icon, text }, idx) => (
        <li key={idx} className="list-item marker:mr-2">
          <div className="flex items-start gap-x-2">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span className="flex-1">
              <TranslateAnimation text={text} />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
