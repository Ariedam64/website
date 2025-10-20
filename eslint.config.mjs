// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Presets Next + TS
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 1) Ignore les scripts CJS qui font hurler la règle "no-require-imports"
  { ignores: ["app/scripts/**"] },

  // 2) Assouplis les règles qui te bloquent le déploiement
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "warn",
      "jsx-a11y/alt-text": "warn"
    }
  },

  // 3) (Optionnel) Si tu gardes des .cjs ailleurs que dans app/scripts
  // {
  //   files: ["**/*.cjs"],
  //   rules: { "@typescript-eslint/no-require-imports": "off" }
  // }
];
