import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/projeto-calculadora-investimentos/",
  plugins: [tailwindcss()],
});
