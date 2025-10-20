import TranslateAnimation from "../../TranslateAnimation";

interface TechPillsProps {
  items: string[];
}

export default function TechPills({ items }: TechPillsProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center mt-6" role="list" aria-label="Technologies utilisées">
      <span className="text-lg font-semibold text-[#d4d4d4] mr-2">🛠️ Technologies :</span>
      {items.map((tech) => (
        <span
          key={tech}
          role="listitem"
          className="inline-block px-3 py-1 text-xs font-medium border-2 border-gray-700 bg-[#27272A] text-gray-100 rounded-full"
        >
          <TranslateAnimation text={tech}/>
        </span>
      ))}
    </div>
  );
}
