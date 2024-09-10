import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    VitePWA({
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      manifest: {
        theme_color: "#f69435",
        background_color: "#f69435",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "Vite PWA",
        description: "Vite PWA Demo",
        name: "Vite PWA",
        icons: [
          {
            src: "/manifest/icon512_maskable.png",
            sizes: "512x512",
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
