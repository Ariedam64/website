"use client";

import "@assistant-ui/react-markdown/styles/dot.css";

import {
  type CodeHeaderProps,
  MarkdownTextPrimitive,
  unstable_memoizeMarkdownComponents as memoizeMarkdownComponents,
  useIsMarkdownCodeBlock,
} from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";
import { type FC, memo, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { TooltipIconButton } from "@/app/components/assistant-ui/tooltip-icon-button";
import { cn } from "@/app/lib/utils";

const MarkdownTextImpl = () => {
  return (
    <MarkdownTextPrimitive
      remarkPlugins={[remarkGfm]}
      className="aui-md w-full rounded-3xl border border-[#3e304f] bg-gradient-to-br from-[#130f1f]/90 via-[#1a1428]/90 to-[#120b1a]/90 px-5 py-6 text-[#f6f2ff] text-sm sm:text-base shadow-[0_35px_60px_rgba(6,4,12,0.8)] backdrop-blur"
      components={defaultComponents}
    />
  );
};

export const MarkdownText = memo(MarkdownTextImpl);

const CodeHeader: FC<CodeHeaderProps> = ({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const onCopy = () => {
    if (!code || isCopied) return;
    copyToClipboard(code);
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-t-xl bg-[#0c0a16] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#c3b8ff]">
      <span className="capitalize">{language || "code"}</span>
      <TooltipIconButton tooltip="Copy" onClick={onCopy}>
        {!isCopied && <CopyIcon />}
        {isCopied && <CheckIcon />}
      </TooltipIconButton>
    </div>
  );
};

const useCopyToClipboard = ({
  copiedDuration = 3000,
}: {
  copiedDuration?: number;
} = {}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), copiedDuration);
    });
  };

  return { isCopied, copyToClipboard };
};

const defaultComponents = memoizeMarkdownComponents({
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight text-[#fdf3ff] sm:text-5xl",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mb-4 mt-8 scroll-m-20 text-3xl font-semibold tracking-tight text-[#f3e7ff] sm:text-4xl",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mb-4 mt-6 scroll-m-20 text-2xl font-semibold tracking-tight text-[#eedcff]",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mb-3 mt-6 text-xl font-semibold tracking-wide text-[#f0d7ff]",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5 className={cn("mb-3 text-lg font-semibold text-[#f4e3ff]", className)} {...props} />
  ),
  h6: ({ className, ...props }) => (
    <h6 className={cn("mb-3 text-base font-semibold text-[#f7efff]", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "mb-5 leading-7 text-[#ddd9ff] first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "text-[#fcd5ff] font-semibold underline underline-offset-4 transition-colors duration-150 hover:text-[#f472b6]",
        className,
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "border-l-2 border-[#f472b6]/70 bg-[#1c1527]/90 px-6 py-4 italic text-[#c4b7ff]",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "mb-5 ml-6 list-disc space-y-2 text-[#d7d2ff]",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "mb-5 ml-6 list-decimal space-y-2 text-[#d7d2ff]",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr
      className={cn("my-6 border-t border-[#3e304f] opacity-70", className)}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="overflow-hidden rounded-2xl border border-[#3e304f] shadow-[0_20px_40px_rgba(5,4,12,0.6)]">
      <table
        className={cn(
          "w-full border-collapse bg-[#120d1f]/40 text-[#f2edff]",
          className,
        )}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "bg-[#1a1428] px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em] text-[#f2e3ff]",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border-t border-[#2d233c] px-4 py-3 text-sm text-[#dbd5ff]",
        className,
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }) => (
    <tr className={cn("even:bg-[#1c1328]/70 odd:bg-transparent", className)} {...props} />
  ),
  sup: ({ className, ...props }) => (
    <sup className={cn("text-sm text-[#f0d7ff]", className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "overflow-x-auto rounded-b-xl border border-[#3e304f] bg-[#0a0816] p-4 text-sm font-mono text-[#f5f2ff]",
        className,
      )}
      {...props}
    />
  ),
  code: function Code({ className, ...props }) {
    const isCodeBlock = useIsMarkdownCodeBlock();
    return (
      <code
        className={cn(
          !isCodeBlock && "rounded-md border border-[#3e304f] bg-[#12101d] px-1 py-0.5 font-semibold text-[#f6f4ff]",
          className,
        )}
        {...props}
      />
    );
  },
  CodeHeader,
});
