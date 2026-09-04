const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals["shared-node-browser"],
      },
    },
  },
  {
    files: ["src/**/*.test.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["functions/**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
];
