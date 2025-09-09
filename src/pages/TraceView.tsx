import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

function TraceView() {
  const { id } = useParams();

  // Mock data for demonstration
  const traceData = {
    id: id || "TOM001",
    product: "Organic Tomatoes",
    variety: "Roma Tomatoes",
    weight: "25 kg",
    harvestDate: "2024-01-15",
    freshnessScore: 92,
    certifications: ["Organic", "Fair Trade", "Local"],
    farmer: {
      name: "Green Valley Farm",
      location: "Punjab, India",
      contact: "+91 98765 43210",
      rating: 4.8,
      photo: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    journey: [
      {
        stage: "Harvest",
        actor: "Green Valley Farm",
        date: "2024-01-15 06:30",
        location: "Punjab, India",
        status: "completed",
        notes: "Fresh harvest at dawn, optimal ripeness",
        photo: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400",
        temperature: "22°C"
      },
      {
        stage: "Pickup",
        actor: "Fresh Transport Co.",
        date: "2024-01-15 14:00",
        location: "Punjab, India",
        status: "completed",
        notes: "Quality check passed, loaded in refrigerated truck",
        photo: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400",
        temperature: "4°C"
      },
      {
        stage: "In Transit",
        actor: "Fresh Transport Co.",
        date: "2024-01-16 08:00",
        location: "Highway NH-1",
        status: "completed",
        notes: "Temperature maintained, ETA 18:00",
        temperature: "4°C"
      },
      {
        stage: "Delivery",
        actor: "Fresh Transport Co.",
        date: "2024-01-16 18:30",
        location: "Delhi Market Hub",
        status: "completed",
        notes: "Delivered to retailer, quality maintained",
        temperature: "4°C"
      },
      {
        stage: "Retail",
        actor: "Fresh Mart Delhi",
        date: "2024-01-17 09:00",
        location: "Delhi, India",
        status: "current",
        notes: "On shelf, premium quality section",
        temperature: "6°C"
      }
    ],
    pricing: {
      farmGate: 45,
      transport: 8,
      retailMarkup: 12,
      retail: 65,
      marketAverage: 70
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "current": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getFreshnessColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🌱</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FarmTrace</span>
            </Link>
            <button className="text-green-600 hover:text-green-700">
              Share
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Product Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={traceData.farmer.photo}
              alt={traceData.product}
              className="w-full md:w-48 h-48 object-cover rounded-xl"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {traceData.product}
                  </h1>
                  <p className="text-gray-600 mb-1">ID: {traceData.id}</p>
                  <p className="text-gray-600">{traceData.variety} • {traceData.weight}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getFreshnessColor(traceData.freshnessScore)}`}>
                    {traceData.freshnessScore}%
                  </div>
                  <p className="text-sm text-gray-600">Freshness Score</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {traceData.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Harvest Date</p>
                  <p className="font-medium">{traceData.harvestDate}</p>
                </div>
                <div>
                  <p className="text-gray-600">Current Price</p>
                  <p className="font-medium">₹{traceData.pricing.retail}/kg</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Farmer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">From the Farm</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌾</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{traceData.farmer.name}</h3>
              <p className="text-gray-600">{traceData.farmer.location}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-yellow-400">
                  {"★".repeat(Math.floor(traceData.farmer.rating))}
                </div>
                <span className="text-sm text-gray-600">{traceData.farmer.rating}/5</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
              Contact
            </button>
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Journey Timeline</h2>
          <div className="space-y-6">
            {traceData.journey.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${
                    step.status === 'completed' ? 'bg-green-500' : 
                    step.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  {index < traceData.journey.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{step.stage}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(step.status)}`}>
                      {step.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{step.actor} • {step.location}</p>
                  <p className="text-gray-500 text-sm mb-2">{step.date}</p>
                  {step.temperature && (
                    <p className="text-blue-600 text-sm mb-2">🌡️ {step.temperature}</p>
                  )}
                  <p className="text-gray-700 text-sm">{step.notes}</p>
                  {step.photo && (
                    <img
                      src={step.photo}
                      alt={step.stage}
                      className="w-24 h-24 object-cover rounded-lg mt-3"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Price Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Price Breakdown</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Farm Gate Price</span>
              <span className="font-medium">₹{traceData.pricing.farmGate}/kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transportation</span>
              <span className="font-medium">₹{traceData.pricing.transport}/kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Retail Markup</span>
              <span className="font-medium">₹{traceData.pricing.retailMarkup}/kg</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Final Price</span>
              <span className="text-green-600">₹{traceData.pricing.retail}/kg</span>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-700">
                💰 You're saving ₹{traceData.pricing.marketAverage - traceData.pricing.retail} compared to market average (₹{traceData.pricing.marketAverage}/kg)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-green-700 transition-colors">
            Save to Favorites
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Report Issue
          </button>
          <button className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors">
            Share
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default TraceView;