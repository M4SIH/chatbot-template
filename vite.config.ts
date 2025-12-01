import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React and React DOM
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // MUI Core
          "mui-vendor": [
            "@mui/material",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled",
          ],
          // Form validation
          "joi-vendor": ["joi"],
          // TSS styling
          "tss-vendor": ["tss-react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
