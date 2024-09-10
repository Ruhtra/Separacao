import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  // server: {
  //   hmr: {
  //     overlay: false,
  //   },
  // },
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
      manifest: {
        orientation: "portrait",
        display: "standalone",
        lang: "pt-BR",
        name: "Separacao",
        short_name: "Separacao",
        start_url: "/",
        scope: "/",
        description: "Projeto para separação",
        theme_color: "#8936FF",
        background_color: "#ffcd01",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "/manifest/icon512_maskable.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "/manifest/icon512_rounded.png",
            type: "image/png",
          },
        ],
      },
    }),
    // mkcert(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
