module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:svelte/prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    extraFileExtensions: [".svelte"],
  },
  ignorePatterns: [
    ".eslintrc.cjs",
    "vite.config.ts",
    "tailwind.config.ts",
    "postcss.config.js",
  ],
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  plugins: ["@typescript-eslint"],
  root: true,
  globals: {
    NodeJS: true,
  },
  env: {
    browser: true,
    node: true,
  },
};
