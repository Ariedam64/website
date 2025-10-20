import TranslateAnimation from "../../TranslateAnimation";

interface InfoProps {
  emoji?: string;
  title: string;
  description: string;
}

export default function Info({
  emoji,
  title,
  description,
}: InfoProps) {
  return (
    <section className="space-y-4 bg-zinc-800/50 p-6 rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            <TranslateAnimation text={`${emoji ? `${emoji} ` : ""}${title}`} />
        </h2>
        <p className="text-gray-300">
            <TranslateAnimation text={description} />
        </p>
    </section>
  );
}
