/**
 * Main Application Component
 *
 * This is the root component of the Imagify application. It handles:
 * - Route configuration and protected routes
 * - Global layout structure (Navbar, Content, Footer)
 * - Authentication state management
 * - Theme configuration
 *
 * @component
 */

import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

import Home from "./pages/Home";
import Result from "./pages/Result";
import GenerationResult from "./pages/GenerationResult";
import BuyCredit from "./pages/BuyCredit";
import Gallery from "./pages/Gallery";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";
import Features from "./pages/Features";

const App = () => {
  const { showLogin, isAuthenticated } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {showLogin && <Login />}
      <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          closeButton={false}
          icon={false}
          theme="dark"
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Dashboard removed — replaced with Settings route */}
          <Route
            path="/settings"
            element={
              isAuthenticated ? <Settings /> : <Navigate to="/" replace />
            }
          />
          <Route path="/result" element={<Result />} />
          <Route
            path="/result/:id"
            element={
              isAuthenticated ? (
                <GenerationResult />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/buy" element={<BuyCredit />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/features" element={<Features />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
