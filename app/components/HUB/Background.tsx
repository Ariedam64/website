"use client"

import React from "react";
import HubBackground from "../../styles/HUB/background.module.css"

const gridItems = Array.from({ length: 2000 }, (_, i) => (
    <div key={i} className={HubBackground.gridItem}></div>
));

export default function Background(){
    
    return (
        <div className={HubBackground.gridContainer}>
            {gridItems}
        </div>    
    )
}