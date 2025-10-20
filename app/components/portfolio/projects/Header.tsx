import TranslateAnimation from "../../TranslateAnimation";

interface HeaderSectionProps {
  emoji?: string;
  title: string;
  subtitle: string;
}

export default function HeaderSection({
  emoji,
  title,
  subtitle,
}: HeaderSectionProps) {
  return (
    <header className="mb-12 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-300">
        <TranslateAnimation text={`${emoji ? `${emoji} ` : ""}${title}`} />
      </h1>
      <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
        <TranslateAnimation text={subtitle} />
      </p>
    </header>
  );
}
