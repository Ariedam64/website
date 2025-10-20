"use client";

import React, { ReactNode } from "react";

export interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-justify text-white leading-loose space-y-20">
      {children}
    </main>
  );
}
