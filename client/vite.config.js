/**
 * Vite Configuration
 *
 * This file configures the Vite build tool for the project.
 *
 * Configuration includes:
 * - React plugin for JSX support
 * - Build optimization settings
 * - Development server configuration
 * - Plugin configuration
 *
 * @see https://vite.dev/config/
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
