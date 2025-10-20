"use client"

import React from "react";
import styles from "../../styles/portfolio/background.module.css"

export default function Background(){
  
    return (
      <div className={styles.area} >
        <ul className={styles.circles}>
          {[...Array(10)].map((_, i) => <li key={i}></li>)}
        </ul>
      </div>  
    )
}