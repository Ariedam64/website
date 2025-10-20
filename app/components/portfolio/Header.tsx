"use client";

import { useTranslation } from "react-i18next";
import TranslateAnimation from "../TranslateAnimation";
import useActiveSection from "../../../utils/useActiveSection";

export default function Header() {
  const { t } = useTranslation("common");
  const sectionIds = [
    "section-about",
    "section-career",
    "section-skills",
    "section-projects",
  ];
  const active = useActiveSection(sectionIds);
  const labels = [
    t("portfolio.navigation.about"),
    t("portfolio.navigation.career"),
    t("portfolio.navigation.skills"),
    t("portfolio.navigation.projects"),
  ];
  const activeIndex = sectionIds.findIndex((id) => id === active);

  return (
    <header className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-full md:w-auto">
      <nav>
        <ul className="
         relative grid grid-cols-2 md:grid-cols-4
         items-center justify-center
         px-0
         bg-black/20        /* fond semi-transparent */
         backdrop-blur-lg    /* flou uniquement sur la liste */
         border border-purple-200/10
         rounded-full
         shadow-lg shadow-purple-700/30
         transition-all duration-200 ease-in-out
         mx-2 md:mx-0
         overflow-hidden     /* clippe le flou au bord arrondi */
       ">
          <div
            className="absolute top-0 h-full w-1/4 bg-purple-600/20 rounded-full pointer-events-none hidden md:block transition-transform duration-500 ease-out transform"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
          {sectionIds.map((id, idx) => (
            <li key={id} className="relative z-10">
              <a
                href={`#${id}`}
                className={`block px-4 py-3 text-center rounded-full cursor-pointer transition-colors ${
                  active === id
                    ? "text-purple-400 bg-purple-600/20 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <TranslateAnimation text={labels[idx]} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
