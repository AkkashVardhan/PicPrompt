import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { showToast } from "../utils/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, token, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    avatar: user?.avatar || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await axios.put(`${base}/api/v1/user/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        showToast("Profile updated successfully");
        // Refresh the page or update user context
        window.location.reload();
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await axios.delete(`${base}/api/v1/user/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        showToast("Account deleted successfully");
        logout();
        navigate("/");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Error deleting account");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-colors duration-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your profile and account preferences
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Email Field (Read Only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-200"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                Email cannot be changed
              </p>
            </div>

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-50 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Avatar URL Field */}
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Avatar URL
              </label>
              <input
                type="url"
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          {/* Save Changes Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Danger Zone */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
            Danger Zone
          </h2>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              Delete Account
            </button>
          ) : (
            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg">
              <p className="text-red-600 dark:text-red-300 mb-4">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors"
                >
                  Yes, Delete My Account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
