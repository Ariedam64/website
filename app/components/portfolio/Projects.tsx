"use client";

import React from "react";
import styles from "../../styles/portfolio/portfolio.module.css";
import { useTranslation } from "react-i18next";
import TranslateAnimation from "../TranslateAnimation";
import { ProjectCard } from "../portfolio/ProjectCard";

export default function Projects() {
  const { t } = useTranslation("common");

  const projects = [
  {
    images: ['/img/mayaya_nodegif.gif','/img/mayaya_python1.png','/img/mayaya_node1.png', '/img/mayaya_overlay3.png', '/img/mayaya_python5.png' ],
    title: 'Mayaya',
    description: t("portfolio.projects.mayaya.description"),
    technologies: ['Node.js', 'JavaScript', 'Python', 'PostgreSQL', 'jQuery', 'Socket.IO','OpenAI API'],
    detailsUrl: 'portfolio/projects/mayaya',
    sourceUrl: 'https://github.com/Ariedam64/Bombparty-Bot'
  },
  {
    images: [ "/img/arie.gif",
              "/img/arie1.png",
              "/img/arie2.png",
              "/img/arie3.png",
              "/img/arie4.png",
              "/img/arie5.png", ],
    title: 'Arie',
    description: t("portfolio.projects.arie.description"),
    technologies: ['Node.js', 'Discord.js', 'Express', 'PostgreSQL', 'YTDL-Core', 'OpenAI', 'DALL-E', 'Heroku'],
    detailsUrl: 'portfolio/projects/arie',
    sourceUrl: 'https://github.com/Ariedam64/Discord-Bot'
  },
  {
    images: ['https://i.imgur.com/FZFjoxR.jpeg','https://i.imgur.com/lA6ksli.jpeg', 'https://i.imgur.com/a1sAejB.jpeg', 'https://i.imgur.com/2ewg9PU.jpeg','https://i.imgur.com/00zeDe1.jpeg', 'https://i.imgur.com/WeYJQID.jpeg', 'https://i.imgur.com/h20nCh1.jpeg', 'https://i.imgur.com/KkISaCy.jpeg' ],
    title: 'BAH',
    description: t("portfolio_project3_description"),
    technologies: ['Next.js','Next UI','Tailwind','React Query','TipTap Editor','Prism.js','MongoDB','NextAuth.js'],
    detailsUrl: 'https://dev-blog-chi.vercel.app/',
    sourceUrl: 'https://github.com/DeepsEffect/DevBlog'
  },
  {
    images: ['https://i.imgur.com/FZFjoxR.jpeg','https://i.imgur.com/lA6ksli.jpeg', 'https://i.imgur.com/a1sAejB.jpeg', 'https://i.imgur.com/2ewg9PU.jpeg','https://i.imgur.com/00zeDe1.jpeg', 'https://i.imgur.com/WeYJQID.jpeg', 'https://i.imgur.com/h20nCh1.jpeg', 'https://i.imgur.com/KkISaCy.jpeg' ],
    title: 'Snapscore+',
    description: t("portfolio_project4_description"),
    technologies: ['Next.js','Next UI','Tailwind','React Query','TipTap Editor','Prism.js','MongoDB','NextAuth.js'],
    detailsUrl: 'https://dev-blog-chi.vercel.app/',
    sourceUrl: 'https://github.com/DeepsEffect/DevBlog'
  },
  {
    images: ['https://i.imgur.com/FZFjoxR.jpeg','https://i.imgur.com/lA6ksli.jpeg', 'https://i.imgur.com/a1sAejB.jpeg', 'https://i.imgur.com/2ewg9PU.jpeg','https://i.imgur.com/00zeDe1.jpeg', 'https://i.imgur.com/WeYJQID.jpeg', 'https://i.imgur.com/h20nCh1.jpeg', 'https://i.imgur.com/KkISaCy.jpeg' ],
    title: 'Albion Tools',
    description: t("portfolio_project5_description"),
    technologies: ['Next.js','Next UI','Tailwind','React Query','TipTap Editor','Prism.js','MongoDB','NextAuth.js'],
    detailsUrl: 'https://dev-blog-chi.vercel.app/',
    sourceUrl: 'https://github.com/DeepsEffect/DevBlog'
  },
  {
    images: ['https://i.imgur.com/FZFjoxR.jpeg','https://i.imgur.com/lA6ksli.jpeg', 'https://i.imgur.com/a1sAejB.jpeg', 'https://i.imgur.com/2ewg9PU.jpeg','https://i.imgur.com/00zeDe1.jpeg', 'https://i.imgur.com/WeYJQID.jpeg', 'https://i.imgur.com/h20nCh1.jpeg', 'https://i.imgur.com/KkISaCy.jpeg' ],
    title: 'Portfolio',
    description: t("portfolio_project6_description"),
    technologies: ['Next.js','Next UI','Tailwind','React Query','TipTap Editor','Prism.js','MongoDB','NextAuth.js'],
    detailsUrl: 'https://dev-blog-chi.vercel.app/',
    sourceUrl: 'https://github.com/DeepsEffect/DevBlog'
  },
  ];

  return (
    <>
      <p className={styles.projectTitle}>
        <TranslateAnimation text={t("portfolio.navigation.projects")} />
      </p>

      <div className={`
        w-full lg:max-w-7xl mx-auto
        grid grid-cols-1
        md:grid-cols-2 
        xl:grid-cols-3 
        gap-y-7 gap-x-40
        justify-center justify-items-center
      `}>
        {projects.map((proj, i) => (
          <div key={i}>
            <ProjectCard {...proj} />
          </div>
        ))}

      </div>
      <div className="col-span-full h-16" />
    </>
  );
}
