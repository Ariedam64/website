"use client";

import { useTranslation } from "react-i18next";
import { snapscoreModule, ModuleData } from "@/app/data/projectsData";
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
import TabsSection, { TabItem } from "@/app/components/portfolio/projects/TabSection";
import TreeView from "@/app/components/portfolio/projects/TreeView";
import { tList } from "@/utils/i18n";

export default function SnapscoreProjectPage() {
  const { t } = useTranslation("common");

  const projectTabs: TabItem<ModuleData>[] = snapscoreModule.map((module) => ({
    key: module.key,
    label: t(module.labelKey),
    content: module,
  }));

  const snapchatRules = tList(t, "portfolio.projects.snapscore.snapchat.rules");
  const originSteps = tList<Step>(t, "portfolio.projects.snapscore.origin.steps");
  const architectureComponents = tList(t, "portfolio.projects.snapscore.architecture.components");
  const architectureResourceRules = tList(t, "portfolio.projects.snapscore.architecture.resourceManagement");
  const architectureObservability = tList(t, "portfolio.projects.snapscore.architecture.observability");
  const architectureStack = tList(t, "portfolio.projects.snapscore.architecture.stack");
  const observationItems = tList(t, "portfolio.projects.snapscore.observation.items");
  const managementItems = tList(t, "portfolio.projects.snapscore.management.items");
  const monitoringItems = tList(t, "portfolio.projects.snapscore.monitoring.items");
  const rulesItems = tList(t, "portfolio.projects.snapscore.rules.items");
  const performanceItems = tList(t, "portfolio.projects.snapscore.performance.items");
  const codeModules = tList<Step>(t, "portfolio.projects.snapscore.code.modules");
  const codeWorkflow = tList(t, "portfolio.projects.snapscore.code.workflow");
  const learningsItems = tList(t, "portfolio.projects.snapscore.learnings.items");

  const architectureObjective = t("portfolio.projects.snapscore.architecture.objective");
  const remarkDescription = t("portfolio.projects.snapscore.remark.description");

  const originFocusKey = "portfolio.projects.snapscore.origin.focus";
  const originFocus = t(originFocusKey);
  const showOriginFocus = originFocus !== originFocusKey;

  return (
    <>
      <Background />
      <PageLayout>
        <Header
          emoji="⚙️"
          title={t("portfolio.projects.snapscore.title")}
          subtitle={t("portfolio.projects.snapscore.subtitle")}
        />

        <Section emoji="👻" title={t("portfolio.projects.snapscore.snapchat.title")}>
          <div className="space-y-4">
            <TranslateAnimation text={t("portfolio.projects.snapscore.snapchat.description")} />
            <ListSection items={snapchatRules} textColor="text-gray-300" />
            <TranslateAnimation text={t("portfolio.projects.snapscore.snapchat.context")} />
          </div>
        </Section>

        <Section emoji="🧭" title={t("portfolio.projects.snapscore.origin.title")}>
          <div className="space-y-4">
            <TranslateAnimation text={t("portfolio.projects.snapscore.origin.intro")} />
            <StepsList steps={originSteps} />
            {showOriginFocus && (
              <p className="text-gray-300">
                <TranslateAnimation text={originFocus} />
              </p>
            )}
          </div>
        </Section>

        <TabsSection
          title={t("portfolio.sections.architecture")}
          items={projectTabs}
          renderContent={({ content: module }) => (
            <div className="space-y-6 bg-zinc-800/40 p-6 rounded-lg">
              <SectionCard title={t("portfolio.sections.objective")} icon="🎯" borderColor="border-[#9333ea]">
                <p>
                  <TranslateAnimation text={t(module.objectiveKey)} />
                </p>
              </SectionCard>
              <SectionCard title={t("portfolio.sections.advantages")} icon="✔️" borderColor="border-green-500">
                <ListSection items={tList(t, module.featuresKey)} textColor="text-gray-300" />
              </SectionCard>
              <SectionCard title={t("portfolio.sections.limits")} icon="❌" borderColor="border-red-500">
                <ListSection items={tList(t, module.limitsKey)} textColor="text-gray-300" />
              </SectionCard>
              <TechPills items={tList(t, module.techKey)} />
              <Caroussel className="mx-auto" images={module.images} />
              {module.repoUrl && (
                <div className="flex justify-center">
                  <a
                    href={module.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:underline"
                  >
                    <TranslateAnimation text={t("portfolio.sections.viewCode")} />
                  </a>
                </div>
              )}
            </div>
          )}
        />

        <Section emoji="🧪" title={t("portfolio.projects.snapscore.observation.title")} titleColor="text-purple-300" borderColor="border-violet-500">
          <div className="space-y-4">
            <ListSection items={observationItems} textColor="text-gray-300" />
            <TranslateAnimation text={t("portfolio.projects.snapscore.observation.conclusion")} />
          </div>
        </Section>
                <Section emoji="💻" title={t("portfolio.projects.snapscore.code.title")} bodyClassName="space-y-6">
          <SectionCard
            title={t("portfolio.projects.snapscore.code.structureTitle")}
            icon="🗂️"
            borderColor="border-fuchsia-500"
          >
            <TreeView treeText={t("portfolio.projects.snapscore.code.structure")} />
          </SectionCard>
          <SectionCard
            title={t("portfolio.projects.snapscore.code.modulesTitle")}
            icon="🧱"
            borderColor="border-blue-500"
          >
            <StepsList steps={codeModules} titleColor="text-purple-200" descColor="text-gray-300" />
          </SectionCard>
        </Section>

        <Section emoji="⚙️" title={t("portfolio.projects.snapscore.operating_title")} bodyClassName="space-y-6">
          <SectionCard 
            icon="🧠" 
            title={t("portfolio.projects.snapscore.management.title")}
            borderColor="border-emerald-500">
            <ListSection items={managementItems} textColor="text-gray-300" />
          </SectionCard>

          <SectionCard 
            icon="📡" 
            title={t("portfolio.projects.snapscore.monitoring.title")}
            borderColor="border-cyan-500">
            <ListSection items={monitoringItems} textColor="text-gray-300" />
          </SectionCard>

          <SectionCard 
            icon="♻️" 
            title={t("portfolio.projects.snapscore.rules.title")}
            borderColor="border-amber-500">
            <ListSection items={rulesItems} textColor="text-gray-300" />
          </SectionCard>
          <SectionCard icon="📈" title={t("portfolio.projects.snapscore.performance.title")} borderColor="border-indigo-500">
            <ListSection items={performanceItems} textColor="text-gray-300" />
          </SectionCard>
        </Section>

      <Section emoji="📝" title={t("portfolio.projects.snapscore.learnings.title")}>
          <ListSection items={learningsItems} textColor="text-gray-300" />
        </Section>


        <Section emoji="💡" title={t("portfolio.projects.snapscore.remark.title")} titleColor="text-purple-300" borderColor="border-purple-500">
          <TranslateAnimation text={remarkDescription} />
        </Section>

      </PageLayout>
    </>
  );
}
