import React from "react";

export interface TreeViewProps {
  /**
   * ASCII tree text. Indentation is based on spaces (recommended: 2 per level).
   * Lines may include inline comments after a `#` (e.g., "web/  # Next.js app").
   */
  treeText: string;
  /** Optional container className overrides */
  className?: string;
}

interface TreeNode {
  name: string;
  comment?: string;
  isDir: boolean;
  children: TreeNode[];
}

function parseTree(treeText: string): TreeNode[] {
  const lines = treeText
    .split(/\r?\n/)
    .map((l) => l.replace(/\t/g, "  ")) // normalize tabs to two spaces
    .filter((l) => l.trim().length > 0);

  const roots: TreeNode[] = [];
  const stack: { level: number; node: TreeNode }[] = [];

  for (const rawLine of lines) {
    const leadingSpaces = (rawLine.match(/^(\s*)/)?.[1] ?? "").length;
    // Consider 2 spaces per indent level by default
    const level = Math.floor(leadingSpaces / 2);

    const trimmed = rawLine.trim();

    // Extract inline comment starting at first '#'
    const hashIndex = trimmed.indexOf("#");
    const namePart = (hashIndex >= 0 ? trimmed.slice(0, hashIndex) : trimmed).trimEnd();
    const comment = hashIndex >= 0 ? trimmed.slice(hashIndex + 1).trim() : undefined;

    if (!namePart) continue;

    const isDir = namePart.endsWith("/");
    const name = isDir ? namePart.slice(0, -1) : namePart;

    const node: TreeNode = { name, comment, isDir, children: [] };

    // Maintain stack for nesting
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      roots.push(node);
    } else {
      stack[stack.length - 1].node.children.push(node);
    }

    stack.push({ level, node });
  }

  return roots;
}

function NodeRow({ node }: { node: TreeNode }) {
  const icon = node.isDir ? (
    <span className="text-yellow-300" aria-hidden>
      📁
    </span>
  ) : (
    <span className="text-blue-300" aria-hidden>
      📄
    </span>
  );

  return (
    <li className="leading-6">
      <div className="flex items-baseline gap-2">
        {icon}
        <span className={node.isDir ? "text-purple-200" : "text-gray-100"}>{node.name}{node.isDir ? "/" : ""}</span>
        {node.comment && (
          <span className="text-gray-400 italic"> — {node.comment}</span>
        )}
      </div>
      {node.children.length > 0 && (
        <ul className="pl-5 border-l border-zinc-700 ml-2 mt-1">
          {node.children.map((child, idx) => (
            <NodeRow key={idx} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function TreeView({ treeText, className }: TreeViewProps) {
  const nodes = React.useMemo(() => parseTree(treeText), [treeText]);

  return (
    <div
      className={[
        "font-mono text-sm bg-zinc-800/60 rounded-lg p-4 text-left",
        "overflow-x-auto border border-zinc-700",
        className ?? "",
      ].join(" ")}
    >
      <ul className="space-y-1">
        {nodes.map((node, idx) => (
          <NodeRow key={idx} node={node} />
        ))}
      </ul>
    </div>
  );
}

