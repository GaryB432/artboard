module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended",
    "plugin:gb/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "gb"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: ["rxjs", "rxjs/*"],
          },
        ],
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
      },
    },
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      rules: {
        "no-inner-declarations": "off",
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
      },
    },
  ],
  globals: {
    NodeJS: true,
    Animatable: true,
  },
};
