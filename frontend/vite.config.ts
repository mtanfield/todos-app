import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    host: true,
    cors: {
      origin: 'http://localhost:7778', // Replace with your backend's origin
    },
  },
});