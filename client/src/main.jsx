/**
 * Main Entry Point
 *
 * This is the main entry point for the PicPrompt application.
 * It sets up:
 * - React DOM rendering
 * - Browser Router for navigation
 * - Global app context for state management
 *
 * The application is wrapped with:
 * - BrowserRouter: For client-side routing
 * - AppContextProvider: For global state management
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
