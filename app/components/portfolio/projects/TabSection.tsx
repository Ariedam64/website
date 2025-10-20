// components/TabsSection.tsx
"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/Tabs";
import TranslateAnimation from "../../TranslateAnimation";

export interface TabItem<T> {
  key: string;
  label: string;
  content: T;
}

export interface TabsSectionProps<T> {
  items: TabItem<T>[]
  renderContent: (item: TabItem<T>) => React.ReactNode;
  className?: string;
  title?: string;
}

export default function TabsSection<T>({
  items,
  renderContent,
  className = "space-y-6",
  title,
}: TabsSectionProps<T>) {
  if (items.length === 0) return null;

  return (
    <section className={className}>
      {title && (
        <h2 className="text-3xl font-semibold text-center uppercase text-[#d4d4d4]">
          <TranslateAnimation text={title} />
        </h2>
      )}

      <Tabs defaultValue={items[0].key} className="w-full">
        <TabsList
          className="grid bg-[#9233ea1e] text-[#a3a3a3] rounded-lg mb-4 border-none"
          style={{
            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
          }}
        >
          {items.map((item) => (
            <TabsTrigger
              key={item.key}
              value={item.key}
              className="text-lg font-semibold py-2 rounded-md hover:text-white data-[state=active]:text-[#a56fd8] data-[state=active]:bg-[#9333ea33] border-none"
            >
              <TranslateAnimation text={item.label} />
            </TabsTrigger>
          ))}
        </TabsList>

        {items.map((item) => (
          <TabsContent key={item.key} value={item.key}>
            {renderContent(item)}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
