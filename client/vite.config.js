import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let server = {};
  if (mode === "development") {
    server = {
      host: "localhost",
      port: 8081,
    };
  } else if (mode === "staging") {
    server = {
      host: "0.0.0.0",
      port: 8081,
    };
  } else if (mode === "production") {
    server = {
      host: true,
      port: 8081,
    };
  }
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    envDir: ".",
    server: server,
  };
});
