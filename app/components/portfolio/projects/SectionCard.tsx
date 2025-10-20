import { ReactNode } from "react";
import TranslateAnimation from "../../TranslateAnimation";

interface SectionCardProps {
  title: string;
  icon?: string;
  borderColor: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  icon,
  borderColor,
  children,
}: SectionCardProps) {
  return (
    <div className={`bg-[#27272A] border-l-4 ${borderColor} p-4 rounded-md space-y-2`}>
      <h4 className="text-xl font-semibold text-[#d4d4d4]">
        {icon} <TranslateAnimation text={title}/>
      </h4>
      <div className="text-base text-gray-300 p-2">
        {children}
      </div>
    </div>
  );
}
