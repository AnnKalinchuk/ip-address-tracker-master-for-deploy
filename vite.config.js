import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ip-address-tracker-master-for-deploy/",
  plugins: [react()],
});
