import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Farmer() {
  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [newBatch, setNewBatch] = useState({
    product: "",
    variety: "",
    weight: "",
    harvestDate: "",
    basePrice: "",
    certifications: [] as string[],
    photos: [] as string[]
  });

  // Mock data for farmer dashboard
  const farmerData = {
    name: "Green Valley Farm",
    location: "Punjab, India",
    rating: 4.8,
    totalBatches: 156,
    activeBatches: 12,
    totalEarnings: 245000,
    monthlyEarnings: 45000
  };

  const recentBatches = [
    {
      id: "TOM001",
      product: "Organic Tomatoes",
      variety: "Roma",
      weight: "25 kg",
      status: "In Transit",
      price: 45,
      buyer: "Fresh Mart Delhi",
      createdDate: "2024-01-15",
      qrGenerated: true
    },
    {
      id: "CAR002", 
      product: "Carrots",
      variety: "Orange",
      weight: "30 kg",
      status: "At Retailer",
      price: 35,
      buyer: "Organic Store Mumbai",
      createdDate: "2024-01-14",
      qrGenerated: true
    },
    {
      id: "POT003",
      product: "Potatoes",
      variety: "Red",
      weight: "50 kg", 
      status: "Ready for Pickup",
      price: 25,
      buyer: "City Market",
      createdDate: "2024-01-16",
      qrGenerated: true
    }
  ];

  const certificationOptions = ["Organic", "Fair Trade", "Local", "Pesticide Free", "Non-GMO"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready for Pickup": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Transit": return "bg-blue-100 text-blue-800 border-blue-200";
      case "At Retailer": return "bg-green-100 text-green-800 border-green-200";
      case "Sold": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCertificationToggle = (cert: string) => {
    setNewBatch(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  const handleCreateBatch = () => {
    // In a real app, this would submit to backend
    console.log("Creating batch:", newBatch);
    setShowCreateBatch(false);
    setNewBatch({
      product: "",
      variety: "",
      weight: "",
      harvestDate: "",
      basePrice: "",
      certifications: [],
      photos: []
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🌱</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FarmTrace</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {farmerData.name}</span>
              <button className="text-green-600 hover:text-green-700">
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Dashboard</h1>
              <p className="text-gray-600">{farmerData.location} • ⭐ {farmerData.rating}/5</p>
            </div>
            <button
              onClick={() => setShowCreateBatch(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <span>➕</span>
              Create New Batch
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Batches</span>
              <span className="text-2xl">📦</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{farmerData.totalBatches}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Active Batches</span>
              <span className="text-2xl">🚛</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{farmerData.activeBatches}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total Earnings</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-2xl font-bold text-green-600">₹{farmerData.totalEarnings.toLocaleString()}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">This Month</span>
              <span className="text-2xl">📈</span>
            </div>
            <div className="text-2xl font-bold text-amber-600">₹{farmerData.monthlyEarnings.toLocaleString()}</div>
          </div>
        </motion.div>

        {/* Recent Batches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Batches</h2>
            <button className="text-green-600 hover:text-green-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentBatches.map((batch) => (
              <div key={batch.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900">{batch.product}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">
                      ID: {batch.id} • {batch.variety} • {batch.weight}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Created: {batch.createdDate} • Buyer: {batch.buyer}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">₹{batch.price}/kg</div>
                      <div className="text-sm text-gray-500">Base Price</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link
                        to={`/trace/${batch.id}`}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                      >
                        Track
                      </Link>
                      {batch.qrGenerated && (
                        <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors">
                          Print QR
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Create Batch Modal */}
      {showCreateBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Batch</h2>
              <button
                onClick={() => setShowCreateBatch(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={newBatch.product}
                    onChange={(e) => setNewBatch(prev => ({ ...prev, product: e.target.value }))}
                    placeholder="e.g., Organic Tomatoes"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variety *
                  </label>
                  <input
                    type="text"
                    value={newBatch.variety}
                    onChange={(e) => setNewBatch(prev => ({ ...prev, variety: e.target.value }))}
                    placeholder="e.g., Roma"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    value={newBatch.weight}
                    onChange={(e) => setNewBatch(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="25"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Price (₹/kg) *
                  </label>
                  <input
                    type="number"
                    value={newBatch.basePrice}
                    onChange={(e) => setNewBatch(prev => ({ ...prev, basePrice: e.target.value }))}
                    placeholder="45"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harvest Date *
                </label>
                <input
                  type="date"
                  value={newBatch.harvestDate}
                  onChange={(e) => setNewBatch(prev => ({ ...prev, harvestDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Certifications
                </label>
                <div className="flex flex-wrap gap-2">
                  {certificationOptions.map((cert) => (
                    <button
                      key={cert}
                      onClick={() => handleCertificationToggle(cert)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        newBatch.certifications.includes(cert)
                          ? "bg-green-100 text-green-800 border-2 border-green-300"
                          : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      {newBatch.certifications.includes(cert) ? "✓ " : ""}{cert}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Photos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-gray-600 mb-2">Click to upload photos</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowCreateBatch(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateBatch}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                >
                  Create Batch & Generate QR
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Farmer;