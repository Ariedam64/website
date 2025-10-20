// Origin.tsx
"use client";

import React from "react";
import TranslateAnimation from "../../TranslateAnimation";

export interface OriginSteps {
  icon?: string;
  title: string;
  desc: string;
}

export interface OriginProps {
  headerEmoji?: string;
  headerTitle: string;
  intro: string;
  steps: unknown;
  conclusion?: string;
}

export default function Origin({
  headerEmoji,
  headerTitle,
  intro,
  steps,
  conclusion,
}: OriginProps) {
  const stepArray: OriginSteps[] = Array.isArray(steps)
    ? (steps as OriginSteps[])
    : [];

  return (
    <section className="space-y-6 bg-zinc-800/50 p-6 rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white">
        <span className="mr-2">{headerEmoji}</span>
        <TranslateAnimation text={headerTitle}/>
      </h2>

      <p className="text-gray-300">
        <TranslateAnimation text={intro} />
      </p>

      <ul className="space-y-4">
        {stepArray.map(({ icon, title, desc }, i) => (
          <li className="flex items-start" key={i}>
            {icon && <span className="text-xl mr-3">{icon}</span>}
            <div>
              <p className="font-semibold text-white">
                <TranslateAnimation text={title} />
              </p>
              <p className="text-gray-300">
                <TranslateAnimation text={desc} />
              </p>
            </div>
          </li>
        ))}
      </ul>

      {conclusion && (
        <p className="mt-4 text-gray-300">
          <TranslateAnimation text={conclusion} />
        </p>
      )}
    </section>
  );
}
