/**
 * Navigation Bar Component
 *
 * The main navigation component that appears on all pages.
 * Features:
 * - Responsive design with mobile menu
 * - User authentication status display
 * - Credit balance display
 * - Profile dropdown with settings
 * - Dynamic navigation links
 * - Dark mode support
 *
 * State Management:
 * - Tracks mobile menu state
 * - Tracks profile dropdown state
 * - Manages auth context
 *
 * Accessibility:
 * - ARIA labels
 * - Keyboard navigation
 * - Focus management
 * - Screen reader friendly
 */

import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
  ]; // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[aria-label="Toggle menu"]')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(!isOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Handle credit check
  const handleCreateImage = () => {
    if (credit > 0) {
      navigate("/result");
      closeMobileMenu();
    } else {
      toast("You don't have enough credits to create new images.", {
        style: {
          background: "#1a1a1a",
          color: "#fff",
          borderRadius: "8px",
          fontSize: "14px",
          padding: "12px 16px",
          position: "relative",
          overflow: "hidden",
        },
        className: "toast-with-progress",
        icon: false,
        autoClose: 3000,
        progressStyle: { background: "rgba(255, 255, 255, 0.7)" },
        hideProgressBar: false,
      });
    }
  };

  return (
    <nav
      className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm transition-colors duration-200"
      id="nav-bar"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 group"
            aria-label="PicPrompt Home"
          >
            <img
              src={assets.logo_icon}
              alt="PicPrompt Logo"
              className="h-8 w-auto transition-transform group-hover:scale-110 duration-300"
            />
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              PicPrompt
            </span>
          </Link>

          {/* Center - Navigation Items */}
          <nav
            className="hidden md:flex items-center space-x-1"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  location.pathname === item.path
                    ? "text-blue-600 bg-blue-50/50"
                    : "text-white-600 hover:text-blue-600 hover:bg-gray-50/50"
                }`}
                aria-current={
                  location.pathname === item.path ? "page" : undefined
                }
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Auth & Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full border border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {credit} Credits
                  </span>
                </div>

                <button
                  onClick={handleCreateImage}
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
                  aria-label="Create new image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="text-sm font-medium">Create</span>
                </button>

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => setIsProfileOpen(!isProfileOpen))
                    }
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-50/50 transition-colors"
                    aria-label="User menu"
                    aria-expanded={isProfileOpen}
                  >
                    <img
                      src={user.avatar || assets.profile_icon}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <svg
                      className="hidden sm:block w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl py-1 shadow-lg ring-1 ring-black dark:ring-white/10 ring-opacity-5 transition-all duration-200 ${
                      isProfileOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                    role="menu"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-0.5">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors group"
                      role="menuitem"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors group"
                      role="menuitem"
                    >
                      <svg
                        className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  onKeyDown={(e) => handleKeyDown(e, () => setShowLogin(true))}
                  className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:shadow-md hover:scale-105"
                  aria-label="Login"
                >
                  Login
                </button>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                onKeyDown={(e) => handleKeyDown(e, toggleMobileMenu)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50/50 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                tabIndex={0}
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 max-h-screen"
              : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-blue-600 bg-blue-50/50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50/50"
                }`}
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {credit} Credits Available
                  </span>
                </div>
                <button
                  onClick={handleCreateImage}
                  className="w-full text-left px-3 py-2 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text hover:bg-blue-50/50 rounded-md transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create New Image
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true);
                  closeMobileMenu();
                }}
                className="w-full text-left px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50/50 rounded-md transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
