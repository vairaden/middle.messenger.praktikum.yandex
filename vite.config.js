import handlebars from "vite-plugin-handlebars";
import {resolve} from "path";
import {defineConfig} from "vite";

const pageData = {
  "/index.html": {
    title: "Main Page",
  },
  "/pages/login.html": {
    title: "Login",
  },
  "/pages/register.html": {
    title: "Register",
  },
  "/pages/settings.html": {
    title: "Settings",
  },
  "/pages/404.html": {
    title: "404",
  },
  "/pages/500.html": {
    title: "500",
  },
};

export default defineConfig({
  publicDir: resolve(__dirname, "public"),
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
        login: resolve(__dirname, "/pages/login.html"),
        register: resolve(__dirname, "/pages/register.html"),
        settings: resolve(__dirname, "/pages/settings.html"),
        404: resolve(__dirname, "/pages/404.html"),
        500: resolve(__dirname, "/pages/500.html"),
      },
    },
  },
});
