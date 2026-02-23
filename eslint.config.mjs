import js from "@eslint/js";
import globals from "globals";
import {defineConfig} from "eslint/config";

export default defineConfig([
    // Config ESLint config file (ESM)
    {
        files: ["eslint.config.mjs"],
        languageOptions: {
            sourceType: "module"
        }
    },

    // Config Node CommonJS
    {
        files: ["**/*.js"],
        plugins: {js},
        extends: ["js/recommended"],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2021
            },
            sourceType: "commonjs"
        },
        rules: {
            "no-unused-vars": "off"
        }
    },

    // Config pour les tests Jest
    {
        files: ["tests/**/*.js"], // ou "**/*.test.js"
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2021,
                ...globals.jest
            }
        }
    }
]);