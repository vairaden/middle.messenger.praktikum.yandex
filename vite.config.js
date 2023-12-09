import handlebars from "vite-plugin-handlebars";
import {resolve} from "path";
import {defineConfig} from "vite";

const pageData = {
  "/pages/main/main.html": {
    title: "Main Page",
  },
  "/pages/auth/login.html": {
    title: "Login",
  },
  "/pages/auth/register.html": {
    title: "Register",
  },
  "/pages/profile/settings.html": {
    title: "Settings",
  },
  "/pages/profile/profile.html": {
    title: "Profile",
  },
  "/pages/error/404.html": {
    title: "404",
  },
  "/pages/error/500.html": {
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
        index: resolve(__dirname, "/index.html"),
        main: resolve(__dirname, "/pages/main/main.html"),
        login: resolve(__dirname, "/pages/auth/login.html"),
        register: resolve(__dirname, "/pages/auth/register.html"),
        settings: resolve(__dirname, "/pages/profile/settings.html"),
        profile: resolve(__dirname, "/pages/profile/profile.html"),
        404: resolve(__dirname, "/pages/error/404.html"),
        500: resolve(__dirname, "/pages/error/500.html"),
      },
    },
  },
});
