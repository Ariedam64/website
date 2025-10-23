// components/StepsList.tsx
"use client";

import React from "react";
import TranslateAnimation from "../../TranslateAnimation";

export interface Step {
  icon?: string;
  title: string;
  desc: string;
}

export interface StepsListProps {
  steps: unknown; // attend un tableau d'objets { icon?, title, desc }
  /** Classe Tailwind pour la couleur du titre, ex: "text-white" */
  titleColor?: string;
  /** Classe Tailwind pour la couleur de la description, ex: "text-gray-300" */
  descColor?: string;
}

export default function StepsList({
  steps,
  titleColor = "text-white",
  descColor = "text-gray-300",
}: StepsListProps) {
  const stepArray: Step[] = Array.isArray(steps)
    ? (steps as Step[])
    : [];

  return (
    <ul className="space-y-4">
      {stepArray.map(({ icon, title, desc }, index) => (
        <li className="flex items-start" key={index}>
          {icon && <span className="text-xl mr-3">{icon}</span>}
          <div>
            <p className={`font-semibold ${titleColor}`}>
              <TranslateAnimation text={title} />
            </p>
            <p className={descColor}>
              <TranslateAnimation text={desc} />
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}