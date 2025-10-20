// src/components/portfolio/Experiences.tsx
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { experiencesData, studiesData } from "../../data/experiencesData";
import TimelineItem from "./TimelineItem";
import { motion } from "framer-motion";
import TranslateAnimation from "../TranslateAnimation";

export default function Experiences() {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState<"experiences" | "studies">("experiences");

  const selectedData = activeTab === "experiences" ? experiencesData : studiesData;

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      {/* Titre */}
      <p className="text-3xl md:text-5xl font-light text-[#d4d4d4] mb-5 tracking-widest text-center">
        <TranslateAnimation text={t("portfolio.navigation.career")} />
      </p>

      {/* Onglets */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="
          grid grid-cols-1 md:grid-cols-2
          w-full max-w-[1000px]
          bg-[#9233ea1e] text-gray-400 mb-2
          gap-2
          rounded-md
        "
      >
        {(["experiences", "studies"] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`
              inline-flex items-center justify-center whitespace-nowrap rounded-md border-none font-semibold
              transition-all duration-200 ease cursor-pointer
              text-lg md:text-2xl py-2 md:py-1 px-4 md:px-3 w-full md:w-auto
              ${
                activeTab === tab
                  ? "bg-[#9333ea33] text-[#a56fd8]"
                  : "bg-transparent text-[#a3a3a3] hover:text-[#ffffffcb]"
              }
            `}
          >
            <TranslateAnimation
              text={
                tab === "experiences"
                  ? t("portfolio.experiences.work_title")
                  : t("portfolio.experiences.studies_title")
              }
            />
          </button>
        ))}
      </div>

      {/* Contenu de la timeline */}
      <div
        role="tabpanel"
        key={activeTab}
        className="w-full max-w-[1000px] mt-2 p-4 rounded-md border-2 border-[#3E304F] bg-[#18181be1] text-white outline-none"
      >
        <motion.ul
          key={activeTab}
          className="list-none border-l border-[#ffffff66] ml-4 pl-4 md:border-[#ffffffa1] md:ml-10 md:pl-0"
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {selectedData.map((item, idx) => (
            <TimelineItem key={idx} item={item} t={t} variants={itemVariants} />
          ))}
        </motion.ul>
      </div>
    </>
  );
}
