/**
 * Global Application Context
 *
 * This context provides global state management for the entire application.
 *
 * Features:
 * - User authentication state management
 * - Theme preferences (dark/light mode) with local storage persistence
 * - Credit system management for image generation
 * - API communication with backend services
 * - JWT token management
 *
 * Key Functions:
 * - User authentication (login/logout)
 * - Image generation with credit validation
 * - Theme toggling with system preference detection
 * - Credit balance management and updates
 * - Session persistence
 *
 * States Managed:
 * - user: Current user details
 * - showLogin: Login modal visibility
 * - token: JWT authentication token
 * - isDarkMode: Theme preference
 * - credit: User's credit balance
 *
 * Usage:
 * Wrap your app with AppContextProvider and use useContext(AppContext)
 * to access the global state and functions in any component.
 */

import React, { createContext, useEffect, useState } from "react";
import { showToast } from "../utils/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [credit, setCredit] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const isAuthenticated = !!token;

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      showToast(error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        // Handle credit check without showing error UI
        if (data.creditBalance === 0) {
          showToast("Not enough credits. Premium features coming soon!");
          return { success: false };
        }
        loadCreditsData();
        return null;
      }
    } catch (error) {
      console.log("Image generation error:", error);
      // Don't show error toast, just return null
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      // loadCreditsData();
    }
  }, [token]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
    isAuthenticated,
    isDarkMode,
    toggleTheme,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
