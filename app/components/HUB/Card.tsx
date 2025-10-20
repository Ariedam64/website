"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../styles/HUB/cards/card.module.css";
import TranslateAnimation from "../TranslateAnimation";

interface CardProps {
    title: string;
    icon: string;
    description: string;
    href: string;
}

export default function Card({ title, icon, description, href }: CardProps) {
    return (
        <Link href={href} className={styles.card}>
        <div className={styles.cardIcon}>
            <Image
              src={icon}
              alt={`${title} icon`}
              width={100}
              height={50}
              className="h-full w-full object-contain"
            />
        </div>
        <h2 className={styles.cardTitle}><TranslateAnimation text={title}/></h2> 
        </Link>
    );
}