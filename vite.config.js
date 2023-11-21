import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
import { defineConfig } from "vite";

const pageData = {
  "/index.html": {
    title: "Main Page",
  },
  "/pages/login/index.html": {
    title: "Login",
  },
};

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
  root: resolve(__dirname, "src"),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "/index.html"),
        login: resolve(__dirname, "/pages/login/index.html"),
      },
    },
  },
});
