import { defineConfig, globalIgnores } from "eslint/config";

// Taken from Kelsoncraft-NextJS

// TODO Fix this to work
// This command wouldn't work
// eslint "src/**/*.{.ts,astro}"

const eslintConfig = defineConfig([
    // Override default ignores of eslint-config-next.
    globalIgnores([
        "dist/**",
        "out/**",
        "build/**",
        "node_modules/**",
        ".idea/**",
        ".vscode/**",
        ".astro/**",
        ".gitea/**",
        ".github/**",
    ]),
]);

export default eslintConfig;
