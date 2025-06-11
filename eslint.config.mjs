import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "**/node_modules/",
      ".git/",
      ".vscode/",
      "dist/",
      "uni_modules/",
      "unpackage/",
      "public/"
    ]
  },
  pluginVue.configs["flat/essential"],
  {
    files: ["src/**/*.{js,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        uni: "readonly",
        plus: "readonly",
        wx: "readonly",
        getCurrentPages: "readonly",
        getApp: "readonly"
      }
    },
    rules: {
      "vue/multi-word-component-names": "off"
    }
  }
]);
