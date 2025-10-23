// components/StepsList.tsx
"use client";

import React from "react";
import TranslateAnimation from "../../TranslateAnimation";

export interface Step {
  icon?: string;
  title: string;
  desc?: string;
}

export type StepItem = Step | string | null | undefined;

export interface StepsListProps {
  steps: StepItem[] | StepItem;
  /** Classe Tailwind pour la couleur du titre, ex: "text-white" */
  titleColor?: string;
  /** Classe Tailwind pour la couleur de la description, ex: "text-gray-300" */
  descColor?: string;
}

function normalizeStep(item: StepItem): Step | null {
  if (item == null) {
    return null;
  }

  if (typeof item === "string") {
    const trimmed = item.trim();
    if (!trimmed) {
      return null;
    }
    return { title: trimmed };
  }

  if (typeof item === "object" && !Array.isArray(item)) {
    const icon =
      typeof item.icon === "string" && item.icon.trim().length > 0
        ? item.icon
        : undefined;
    const title = typeof item.title === "string" ? item.title : undefined;
    const desc = typeof item.desc === "string" ? item.desc : undefined;

    if (!title && desc) {
      return { icon, title: desc };
    }

    if (!title) {
      return null;
    }

    return { icon, title, desc };
  }

  return null;
}

export default function StepsList({
  steps,
  titleColor = "text-white",
  descColor = "text-gray-300",
}: StepsListProps) {
  const rawSteps = Array.isArray(steps) ? steps : [steps];
  const normalizedSteps = rawSteps
    .map(normalizeStep)
    .filter((step): step is Step => step !== null);

  return (
    <ul className="space-y-4">
      {normalizedSteps.map(({ icon, title, desc }, index) => (
        <li className="flex items-start" key={index}>
          {icon && <span className="text-xl mr-3">{icon}</span>}
          <div>
            <p className={`font-semibold ${titleColor}`}>
              <TranslateAnimation text={title} />
            </p>
            {desc && (
              <p className={descColor}>
                <TranslateAnimation text={desc} />
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
