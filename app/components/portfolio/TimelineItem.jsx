import React from "react";
import styles from "../../styles/portfolio/portfolio.module.css";
import { motion } from "framer-motion";
import TranslateAnimation from "../TranslateAnimation";

export default function TimelineItem({ item, t, variants }) {
    return (
      <motion.li
        className={styles.timelineItem}
        variants={variants} 
      >
        <div className={styles.timelineLogo}>
          <img src={item.logo} alt={t(item.companyKey)} width="48" height="48" />
        </div>
        <div className={styles.timelineContent}>
          <time className={styles.timelineDate}><TranslateAnimation text={t(item.dateKey)}/></time>
          <h2 className={styles.timelineTitle}><TranslateAnimation text={t(item.companyKey)}/></h2>
          <p className={styles.timelineRole}><TranslateAnimation text={t(item.roleKey)}/></p>
          <p className={styles.timelineDescription}><TranslateAnimation text={t(item.descriptionKey)}/></p>
        </div>
      </motion.li>
    );
    
  }
