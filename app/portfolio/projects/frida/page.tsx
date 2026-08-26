"use client";

import { useTranslation } from "react-i18next";
import { fridaImages, fridaDofusImages } from "@/app/data/projectsData";
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
import TreeView from "@/app/components/portfolio/projects/TreeView";
import { tList } from "@/utils/i18n";

const BASE = "portfolio.projects.frida";
const REPO_URL = "https://github.com/Ariedam64/FridaIL2CPPToolkit";

export default function FridaToolkitProjectPage() {
  const { t } = useTranslation("common");

  const originSteps = tList<Step>(t, `${BASE}.origin.steps`);
  const workflowSteps = tList<Step>(t, `${BASE}.workflow.steps`);
  const learningsItems = tList(t, `${BASE}.learnings.items`);

  return (
    <>
      <Background />
      <PageLayout>
        <Header
          emoji="🔬"
          title={t(`${BASE}.title`)}
          subtitle={t(`${BASE}.subtitle`)}
        />

        <Section emoji="🎮" title={t(`${BASE}.about.title`)}>
          <div className="space-y-4">
            <p>
              <TranslateAnimation text={t(`${BASE}.about.description`)} />
            </p>
            <p>
              <TranslateAnimation text={t(`${BASE}.about.frida`)} />
            </p>
          </div>
        </Section>

        <Section emoji="🚀" title={t(`${BASE}.origin.title`)}>
          <div className="space-y-4">
            <TranslateAnimation text={t(`${BASE}.origin.intro`)} />
            <StepsList steps={originSteps} />
          </div>
        </Section>

        <Section emoji="🛠️" title={t(`${BASE}.workflow.title`)}>
          <div className="space-y-4">
            <TranslateAnimation text={t(`${BASE}.workflow.intro`)} />
            <StepsList steps={workflowSteps} />
          </div>
        </Section>

        {/* La cle partagee porte deja son emoji, on n'en ajoute pas un second. */}
        <Section title={t("portfolio.sections.architecture")}>
          <div className="space-y-6 bg-zinc-800/40 p-6 rounded-lg">
            <SectionCard title={t(`${BASE}.structure_title`)} icon="🗂️" borderColor="border-fuchsia-500">
              <TreeView treeText={t(`${BASE}.structure`)} />
            </SectionCard>

            <SectionCard title={t(`${BASE}.features_title`)} icon="⚙️" borderColor="border-green-500">
              <ListSection items={tList(t, `${BASE}.features`)} textColor="text-gray-300" />
            </SectionCard>

            <SectionCard title={t(`${BASE}.limits_title`)} icon="❌" borderColor="border-red-500">
              <ListSection items={tList(t, `${BASE}.limits`)} textColor="text-gray-300" />
            </SectionCard>

            <TechPills items={tList(t, `${BASE}.tech`)} />
            {fridaImages.length > 0 && (
              <Caroussel className="mx-auto" images={fridaImages} frameHeight="wide" />
            )}
            <div className="flex justify-center">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:underline"
              >
                <TranslateAnimation text={t("portfolio.sections.viewCode")} />
              </a>
            </div>
          </div>
        </Section>

        <Section
          emoji="🎯"
          title={t(`${BASE}.dofus.title`)}
          titleColor="text-purple-300"
          borderColor="border-purple-500"
        >
          <div className="space-y-6">
            <TranslateAnimation text={t(`${BASE}.dofus.description`)} />
            {fridaDofusImages.length > 0 && (
              <Caroussel className="mx-auto" images={fridaDofusImages} frameHeight="wide" />
            )}
          </div>
        </Section>

        <Section emoji="📝" title={t(`${BASE}.learnings.title`)}>
          <ListSection items={learningsItems} textColor="text-gray-300" />
        </Section>
      </PageLayout>
    </>
  );
}
