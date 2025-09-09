import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Distributor() {
  const [activeTab, setActiveTab] = useState("active");
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [scanId, setScanId] = useState("");

  // Mock data for distributor dashboard
  const distributorData = {
    name: "Fresh Transport Co.",
    location: "Delhi Hub",
    rating: 4.7,
    totalDeliveries: 1247,
    activeRoutes: 8,
    onTimeRate: 96,
    avgDeliveryTime: "18 hours"
  };

  const activeBatches = [
    {
      id: "TOM001",
      product: "Organic Tomatoes",
      farmer: "Green Valley Farm",
      retailer: "Fresh Mart Delhi",
      weight: "25 kg",
      status: "In Transit",
      pickupDate: "2024-01-16 14:00",
      expectedDelivery: "2024-01-17 18:00",
      currentLocation: "Highway NH-1, 45km from Delhi",
      temperature: "4°C",
      route: "Punjab → Delhi",
      priority: "high",
      gpsTracking: true
    },
    {
      id: "CAR002",
      product: "Carrots",
      farmer: "Sunrise Organic Farm",
      retailer: "Organic Store Mumbai",
      weight: "30 kg",
      status: "Pickup Scheduled",
      pickupDate: "2024-01-17 10:00",
      expectedDelivery: "2024-01-18 16:00",
      currentLocation: "Maharashtra Farm",
      temperature: "N/A",
      route: "Maharashtra → Mumbai",
      priority: "medium",
      gpsTracking: false
    },
    {
      id: "POT003",
      product: "Red Potatoes",
      farmer: "Mountain View Farm",
      retailer: "City Market",
      weight: "50 kg",
      status: "Ready for Delivery",
      pickupDate: "2024-01-16 08:00",
      expectedDelivery: "2024-01-17 14:00",
      currentLocation: "Delhi Distribution Center",
      temperature: "6°C",
      route: "Himachal → Delhi",
      priority: "low",
      gpsTracking: true
    }
  ];

  const completedBatches = [
    {
      id: "APP001",
      product: "Apples",
      farmer: "Hill Valley Orchards",
      retailer: "Premium Fruits Store",
      weight: "40 kg",
      status: "Delivered",
      deliveredDate: "2024-01-15 16:30",
      deliveryTime: "16 hours",
      rating: 5,
      route: "Kashmir → Delhi"
    },
    {
      id: "BAN001",
      product: "Bananas",
      farmer: "Tropical Farm Co.",
      retailer: "Quick Mart",
      weight: "35 kg",
      status: "Delivered",
      deliveredDate: "2024-01-14 12:00",
      deliveryTime: "14 hours",
      rating: 4,
      route: "Kerala → Mumbai"
    }
  ];

  const pendingPickups = [
    {
      id: "GRA001",
      product: "Grapes",
      farmer: "Vineyard Farms",
      weight: "20 kg",
      pickupLocation: "Maharashtra",
      retailer: "Wine & Dine Store",
      deliveryLocation: "Pune",
      urgency: "high",
      estimatedDistance: "120 km",
      estimatedTime: "8 hours"
    },
    {
      id: "MAN001",
      product: "Mangoes",
      farmer: "Tropical Delights",
      weight: "45 kg",
      pickupLocation: "Andhra Pradesh",
      retailer: "Fruit Paradise",
      deliveryLocation: "Hyderabad",
      urgency: "medium",
      estimatedDistance: "200 km",
      estimatedTime: "12 hours"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pickup Scheduled": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Ready for Delivery": return "bg-green-100 text-green-800 border-green-200";
      case "Delivered": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const handleAcceptBatch = (batch: any) => {
    setSelectedBatch(batch);
    setShowAcceptModal(true);
  };

  const handleUpdateStatus = (batch: any) => {
    setSelectedBatch(batch);
    setShowUpdateModal(true);
  };

  const handleScanQR = () => {
    if (scanId.trim()) {
      // In a real app, this would fetch batch details
      console.log("Scanning batch:", scanId);
      setScanId("");
    }
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
              <span className="text-gray-600">Welcome, {distributorData.name}</span>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Transport Dashboard</h1>
              <p className="text-gray-600">{distributorData.location} • ⭐ {distributorData.rating}/5</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <input
                  type="text"
                  placeholder="Scan or enter batch ID"
                  value={scanId}
                  onChange={(e) => setScanId(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleScanQR}
                  className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  📱 Scan
                </button>
              </div>
            </div>
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
              <span className="text-gray-600 text-sm">Total Deliveries</span>
              <span className="text-2xl">📦</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{distributorData.totalDeliveries}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Active Routes</span>
              <span className="text-2xl">🚛</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{distributorData.activeRoutes}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">On-Time Rate</span>
              <span className="text-2xl">⏰</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{distributorData.onTimeRate}%</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Avg Delivery</span>
              <span className="text-2xl">🕐</span>
            </div>
            <div className="text-2xl font-bold text-amber-600">{distributorData.avgDeliveryTime}</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "active"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Active Shipments ({activeBatches.length})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "pending"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pending Pickups ({pendingPickups.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "completed"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Completed
            </button>
          </div>
        </motion.div>

        {/* Active Shipments Tab */}
        {activeTab === "active" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {activeBatches.map((batch) => (
              <div key={batch.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{batch.product}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                      <span className={`text-sm font-medium ${getPriorityColor(batch.priority)}`}>
                        {batch.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Route</p>
                        <p className="font-medium">{batch.route}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Weight</p>
                        <p className="font-medium">{batch.weight}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">From</p>
                        <p className="font-medium">{batch.farmer}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">To</p>
                        <p className="font-medium">{batch.retailer}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📍 {batch.currentLocation}</span>
                      {batch.temperature !== "N/A" && (
                        <span>🌡️ {batch.temperature}</span>
                      )}
                      {batch.gpsTracking && (
                        <span className="text-green-600">📡 GPS Active</span>
                      )}
                    </div>
                  </div>

                  <div className="lg:w-64">
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <div className="text-sm text-gray-600 mb-1">Pickup</div>
                      <div className="font-medium text-sm">{batch.pickupDate}</div>
                      <div className="text-sm text-gray-600 mt-2 mb-1">Expected Delivery</div>
                      <div className="font-medium text-sm">{batch.expectedDelivery}</div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(batch)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Update Status
                      </button>
                      <Link
                        to={`/trace/${batch.id}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                      >
                        Track
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Pending Pickups Tab */}
        {activeTab === "pending" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {pendingPickups.map((batch) => (
              <div key={batch.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{batch.product}</h3>
                      <span className={`text-sm font-medium ${batch.urgency === 'high' ? 'text-red-600' : 'text-yellow-600'}`}>
                        {batch.urgency.toUpperCase()} URGENCY
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">From</p>
                        <p className="font-medium">{batch.farmer}</p>
                        <p className="text-gray-500 text-sm">{batch.pickupLocation}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">To</p>
                        <p className="font-medium">{batch.retailer}</p>
                        <p className="text-gray-500 text-sm">{batch.deliveryLocation}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Weight</p>
                        <p className="font-medium">{batch.weight}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Distance</p>
                        <p className="font-medium">{batch.estimatedDistance}</p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      Estimated delivery time: {batch.estimatedTime}
                    </div>
                  </div>

                  <div className="lg:w-48">
                    <button
                      onClick={() => handleAcceptBatch(batch)}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors mb-2"
                    >
                      Accept Pickup
                    </button>
                    <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Completed Tab */}
        {activeTab === "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {completedBatches.map((batch) => (
              <div key={batch.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{batch.product}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Route</p>
                        <p className="font-medium">{batch.route}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Weight</p>
                        <p className="font-medium">{batch.weight}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Delivered</p>
                        <p className="font-medium">{batch.deliveredDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Delivery Time</p>
                        <p className="font-medium">{batch.deliveryTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Rating:</span>
                      <div className="flex text-yellow-400">
                        {"★".repeat(batch.rating)}
                      </div>
                      <span className="text-sm text-gray-600">({batch.rating}/5)</span>
                    </div>
                  </div>

                  <div className="lg:w-48">
                    <Link
                      to={`/trace/${batch.id}`}
                      className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                    >
                      View Journey
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Accept Batch Modal */}
      {showAcceptModal && selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Accept Pickup</h2>
              <button
                onClick={() => setShowAcceptModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-bold text-gray-900">{selectedBatch.product}</h3>
                <p className="text-gray-600">{selectedBatch.weight}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-medium">{selectedBatch.pickupLocation} → {selectedBatch.deliveryLocation}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Estimated Time</p>
                <p className="font-medium">{selectedBatch.estimatedTime}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowAcceptModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Accepting batch:", selectedBatch.id);
                  setShowAcceptModal(false);
                }}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Accept & Start Route
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Update Status Modal */}
      {showUpdateModal && selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Update Status</h2>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-bold text-gray-900">{selectedBatch.product}</h3>
                <p className="text-gray-600">ID: {selectedBatch.id}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Status
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Pickup Confirmed</option>
                  <option>In Transit</option>
                  <option>Arrived at Destination</option>
                  <option>Delivered</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Temperature (°C)
                </label>
                <input
                  type="number"
                  placeholder="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  placeholder="Add any notes about the shipment..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Updating status for:", selectedBatch.id);
                  setShowUpdateModal(false);
                }}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Update Status
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Distributor;