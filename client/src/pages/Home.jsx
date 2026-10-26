import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Description from "../components/Description";
import GenerateBtn from "../components/GenerateBtn";

const Home = () => {
  const { user, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    credits: 0,
    imagesGenerated: 0,
    favoriteStyles: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const base =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        const [creditsResponse, generationsResponse] = await Promise.all([
          axios.get(`${base}/api/v1/user/credits`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${base}/api/v1/images/user-generations`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (creditsResponse.data.success && generationsResponse.data.success) {
          setStats({
            credits: creditsResponse.data.credits || 0,
            imagesGenerated: generationsResponse.data.totalGenerations || 0,
            favoriteStyles: generationsResponse.data.uniqueStyles || 0,
          });
        }
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleGenerateClick = () => {
    navigate("/result");
  };

  return (
    <div>
      {user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section with Quick Stats */}
          <div className="bg-gradient-to-r from-teal-500 to-orange-500 rounded-xl shadow-sm p-8 text-white mb-8 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <h1 className="text-3xl font-bold mb-4 relative">
              <motion.span
                className="inline-block cursor-default relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
                whileHover={{
                  scale: 1.02,
                  textShadow: "0 0 8px rgba(255,255,255,0.3)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Welcome back,
              </motion.span>{" "}
              <motion.span
                className="inline-block cursor-pointer relative text-white font-bold"
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 12px rgba(255,255,255,0.5)",
                }}
              >
                {user?.name}
              </motion.span>
              !{" "}
              <motion.span
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                👋
              </motion.span>
            </h1>

            <motion.p
              className="text-lg opacity-90 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your creative journey continues...
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <p className="text-sm opacity-75">Available Credits</p>
                <p className="text-3xl font-bold">{stats.credits}</p>
              </motion.div>
              <motion.div
                className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <p className="text-sm opacity-75">Images Created</p>
                <p className="text-3xl font-bold">{stats.imagesGenerated}</p>
              </motion.div>
              <motion.div
                className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <p className="text-sm opacity-75">Styles Used</p>
                <p className="text-3xl font-bold">{stats.favoriteStyles}</p>
              </motion.div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={handleGenerateClick}
              className="bg-teal-500 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="font-semibold">New Creation</h3>
              <p className="text-sm opacity-90 mt-1">Start generating</p>
            </button>
            <Link
              to="/gallery"
              className="bg-orange-500 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              <div className="text-2xl mb-2">🖼️</div>
              <h3 className="font-semibold">Gallery</h3>
              <p className="text-sm opacity-90 mt-1">View your work</p>
            </Link>
          </div>
        </div>
      )}

      <Header />
      <Steps />
      <Description />
      <GenerateBtn />

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
