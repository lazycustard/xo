import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import ParallaxFarmBackground from "../components/smthn";


interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}



// Glassmorphic panel component
function GlassPanel({ children, className = "" } :GlassPanelProps) {
  return (
    <div
      className={`bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 ${className}`}
      style={{
        boxShadow: "0 8px 32px 0 rgba(60, 40, 20, 0.18)",
        border: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      {children}
    </div>
  );
}

function Landing() {
  const [searchId, setSearchId] = useState("");

  const roles = [
    {
      id: "consumer",
      title: "Consumer",
      description: " your food from farm to table",
      icon: "🛒",
      color: "bg-green-100 hover:bg-green-200 border-green-300",
      textColor: "text-green-800"
    },
    {
      id: "farmer",
      title: "Farmer",
      description: "Upload produce and manage batches",
      icon: "🌾",
      color: "bg-amber-100 hover:bg-amber-200 border-amber-300",
      textColor: "text-amber-800"
    },
    {
      id: "distributor",
      title: "Distributor",
      description: "Track transportation and logistics",
      icon: "🚛",
      color: "bg-blue-100 hover:bg-blue-200 border-blue-300",
      textColor: "text-blue-800"
    },
    {
      id: "retailer",
      title: "Retailer",
      description: "Manage inventory and pricing",
      icon: "🏪",
      color: "bg-purple-100 hover:bg-purple-200 border-purple-300",
      textColor: "text-purple-800"
    },
    {
      id: "admin",
      title: "Admin",
      description: "Verify certifications and monitor",
      icon: "⚙️",
      color: "bg-gray-100 hover:bg-gray-200 border-gray-300",
      textColor: "text-gray-800"
    }
  ];

  const handleTrace = () => {
    if (searchId.trim()) {
      window.location.href = `/trace/${searchId}`;
    }
  };

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      <ParallaxFarmBackground />

      {/* Header */}
      <header className="shadow-sm border-b border-green-100 bg-wood relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌱</span>
              </div>
              <h1 className="text-2xl heading-font font-bold text-cream">FarmTrace</h1>
            </div>
            <Link to="/login" className="font-medium text-cream sign-hover">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <GlassPanel className="p-8 mb-8 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl heading-font font-bold text-deep-green mb-6">
                Trace Your Food's Journey
              </h2>
              <p className="text-xl text-deep-green/80 mb-8 max-w-2xl mx-auto">
                From farm to table, discover the complete story behind your food. 
                Transparent pricing, verified quality, and trusted sources.
              </p>
            </motion.div>
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl p-6 mb-4 mx-auto"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Trace Your Food
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter product ID or scan QR code"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleTrace}
                    className="px-6 py-3 btn-brown ripple transition-colors"
                  >
                    Trace
                  </button>
                  <button className="px-4 py-3 bg-cream text-deep-green rounded-lg hover:bg-white transition-colors sign-hover">
                    📱 Scan QR
                  </button>
                </div>
              </div>
            </motion.div>
          </GlassPanel>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 px-4 bg-cream relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role) => (
              <Link
                to={`/${role.id}`}
                key={role.id}
                className={`block p-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md ${role.color} ${role.textColor}`}
              >
                <div className="text-4xl mb-4">
                  {role.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {role.title}
                </h3>
                <p className="text-md">
                  {role.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-wood text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-gray-500">
            &copy; 2023 FarmTrace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;