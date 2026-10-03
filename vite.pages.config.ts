import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
export default defineConfig({
 root: "pages", base: "/wedding/", publicDir: "../public",
 plugins: [react()],
 resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
 css: { postcss: fileURLToPath(new URL("./postcss.config.mjs", import.meta.url)) },
 build: { outDir: "../docs", emptyOutDir: true }
});
