"use client";

import { useTranslation } from "react-i18next";
import HubStyles from "./styles/HUB/hub.module.css"
import HubCard from "./components/HUB/Card";
import Background from "./components/HUB/Background"
import TranslateAnimation from "./components/TranslateAnimation";
import "./styles/globals.css";

export default function Hub() {
  
  const { t } = useTranslation('common');

  return (
     <>
      <Background />
      <div className={HubStyles.hubContent}>
        <div className={HubStyles.hubWrapper}>
          
          <h1 className={HubStyles.heading}>
            <TranslateAnimation text={t('hub.welcome')}/>
          </h1>

          <div className={HubStyles.cardContainer}>

            <HubCard
              title={t('hub.portfolio.title')}
              icon= "/img/i_portfolio.png"
              description={t('hub.portfolio.description')}
              href="/portfolio"
            />
            <HubCard
              title={t('hub.tools.title')} 
              icon= "/img/i_toolbox.png"
              description={t('hub.tools.description')}
              href="/outils"
            />
          </div>
        </div>
      </div>
    </>
  );
}