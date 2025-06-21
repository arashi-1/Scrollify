import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: "localhost", // ensures consistent hostname
    port: 5173, // default Vite port
    strictPort: true, // prevent auto-switching ports
    hmr: {
      protocol: "ws", // use WebSocket explicitly
      host: "localhost",
    },
  },
});
