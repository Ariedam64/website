"use client";

import { useTranslation } from "react-i18next";
import { snapscoreModule, ModuleData } from "@/app/data/projectsData"
import Background from "@/app/components/portfolio/Background";
import Caroussel from "@/app/components/portfolio/Caroussel";
import PageLayout from "@/app/components/portfolio/projects/PayeLayout";
import Header from "@/app/components/portfolio/projects/Header";
import Section from "@/app/components/portfolio/projects/Section";
import SectionCard from "@/app/components/portfolio/projects/SectionCard";
import StepsList, { Step } from "@/app/components/portfolio/projects/StepsList";
import ListSection from "@/app/components/portfolio/projects/ListSection";
import TechPills from "@/app/components/portfolio/projects/TechPills";
import TranslateAnimation from "@/app/components/TranslateAnimation";
import TabsSection, { TabItem } from "@/app/components/portfolio/projects/TabSection"
import { tList } from "@/utils/i18n";

export default function SnapscoreProjectPage() {
  const { t } = useTranslation("common");

      const projectTabs: TabItem<ModuleData>[] = snapscoreModule.map((m) => ({
          key: m.key,
          label: t(m.labelKey),
          content: m,
      }));

  return (
    <>
      <Background />
      <PageLayout>
          <Header emoji="🤖" title={t("portfolio.projects.snapscore.title")} subtitle={t("portfolio.projects.snapscore.subtitle")}/>
          <Section emoji="👻" title={t("portfolio.projects.snapscore.snapchat.title")}>
              <TranslateAnimation text={t("portfolio.projects.snapscore.snapchat.description")} />
              <StepsList steps={tList(t, "portfolio.projects.snapscore.snapchat.rules")} />
              <TranslateAnimation text={t("portfolio.projects.snapscore.snapchat.context")} />
          </Section>
          <Section emoji="🚀" title={t("portfolio.projects.snapscore.origin.title")}>
              <p><TranslateAnimation text={t("portfolio.projects.snapscore.origin.intro")} /></p>
              <StepsList steps={tList(t, "portfolio.projects.snapscore.origin.steps")}/>
          </Section>
          <TabsSection
              title={t("portfolio.sections.architecture")}
              items={projectTabs}
              renderContent={({ content: m }) => (
                  <div className="space-y-6 bg-zinc-800/40 p-6 rounded-lg">
                      <SectionCard title={t("portfolio.sections.objective")} icon="🎯" borderColor="border-[#9333ea]">
                          <p><TranslateAnimation text={t(m.objectiveKey)} /></p>
                      </SectionCard>
                      <SectionCard title={t("portfolio.sections.advantages")} icon="✔️" borderColor="border-green-500">
                          <ListSection items={tList(t, m.featuresKey) as string[]} textColor="text-gray-300"/>
                      </SectionCard>
                      <SectionCard title={t("portfolio.sections.limits")} icon="❌" borderColor="border-red-500" >
                          <ListSection items={tList(t, m.limitsKey) as string[]} textColor="text-gray-300"/>
                      </SectionCard>
                      <TechPills items={tList(t, m.techKey) as string[]} />
                      <Caroussel className="mx-auto" images={m.images} />
                      <div className="flex justify-center">
                          <a href={m.repoUrl} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:underline">
                          <TranslateAnimation text={t("portfolio.sections.viewCode")} />
                          </a>
                      </div>
                  </div>
              )}
          />
        
      </PageLayout>
    </>
  );
}
