 import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Retailer() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newOrder, setNewOrder] = useState({
    product: "",
    quantity: "",
    supplier: "",
    expectedDate: "",
    notes: ""
  });

  // Mock data for retailer dashboard
  const retailerData = {
    name: "Fresh Mart Delhi",
    location: "Delhi, India",
    rating: 4.6,
    totalProducts: 156,
    lowStockItems: 8,
    monthlyRevenue: 125000,
    activeSuppliers: 12
  };

  const inventory = [
    {
      id: "TOM001",
      product: "Organic Tomatoes",
      supplier: "Green Valley Farm",
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      costPrice: 45,
      sellingPrice: 65,
      margin: 44.4,
      status: "in_stock",
      lastRestocked: "2024-01-15",
      expiryDate: "2024-01-25",
      qualityScore: 92,
      category: "Vegetables"
    },
    {
      id: "CAR002",
      product: "Carrots",
      supplier: "Sunrise Organic Farm",
      currentStock: 12,
      minStock: 15,
      maxStock: 80,
      costPrice: 35,
      sellingPrice: 50,
      margin: 42.9,
      status: "low_stock",
      lastRestocked: "2024-01-14",
      expiryDate: "2024-01-22",
      qualityScore: 88,
      category: "Vegetables"
    },
    {
      id: "POT003",
      product: "Red Potatoes",
      supplier: "Mountain View Farm",
      currentStock: 78,
      minStock: 25,
      maxStock: 120,
      costPrice: 25,
      sellingPrice: 35,
      margin: 40.0,
      status: "in_stock",
      lastRestocked: "2024-01-16",
      expiryDate: "2024-02-01",
      qualityScore: 85,
      category: "Vegetables"
    },
    {
      id: "APP001",
      product: "Apples",
      supplier: "Hill Valley Orchards",
      currentStock: 0,
      minStock: 20,
      maxStock: 60,
      costPrice: 60,
      sellingPrice: 85,
      margin: 41.7,
      status: "out_of_stock",
      lastRestocked: "2024-01-10",
      expiryDate: "2024-01-20",
      qualityScore: 90,
      category: "Fruits"
    }
  ];

  const incomingOrders = [
    {
      id: "ORD001",
      product: "Organic Spinach",
      supplier: "Green Valley Farm",
      quantity: 30,
      expectedDate: "2024-01-18",
      status: "confirmed",
      orderDate: "2024-01-16",
      totalValue: 1800
    },
    {
      id: "ORD002",
      product: "Fresh Lettuce",
      supplier: "Sunrise Organic Farm",
      quantity: 25,
      expectedDate: "2024-01-19",
      status: "in_transit",
      orderDate: "2024-01-15",
      totalValue: 1500
    }
  ];

  const salesData = [
    { day: "Mon", sales: 8500 },
    { day: "Tue", sales: 9200 },
    { day: "Wed", sales: 7800 },
    { day: "Thu", sales: 10500 },
    { day: "Fri", sales: 12800 },
    { day: "Sat", sales: 15200 },
    { day: "Sun", sales: 9800 }
  ];

  const suppliers = [
    {
      id: "GVF001",
      name: "Green Valley Farm",
      location: "Punjab, India",
      rating: 4.8,
      specialties: ["Tomatoes", "Peppers", "Herbs"],
      totalOrders: 45,
      avgDeliveryTime: "18 hours",
      reliability: 98,
      lastOrder: "2024-01-15",
      image: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: "SOF002",
      name: "Sunrise Organic Farm",
      location: "Maharashtra, India",
      rating: 4.6,
      specialties: ["Root Vegetables", "Leafy Greens"],
      totalOrders: 32,
      avgDeliveryTime: "24 hours",
      reliability: 95,
      lastOrder: "2024-01-14",
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: "MVF003",
      name: "Mountain View Farm",
      location: "Himachal Pradesh, India",
      rating: 4.7,
      specialties: ["Potatoes", "Onions", "Garlic"],
      totalOrders: 28,
      avgDeliveryTime: "36 hours",
      reliability: 92,
      lastOrder: "2024-01-16",
      image: "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const qualityIssues = [
    {
      id: 1,
      product: "Organic Tomatoes",
      batchId: "TOM001",
      issue: "Quality below standard",
      reportedBy: "Store Manager",
      date: "2024-01-17",
      status: "investigating",
      priority: "high"
    },
    {
      id: 2,
      product: "Carrots",
      batchId: "CAR002",
      issue: "Packaging damaged",
      reportedBy: "Quality Inspector",
      date: "2024-01-16",
      status: "resolved",
      priority: "medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock": return "bg-green-100 text-green-800 border-green-200";
      case "low_stock": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "out_of_stock": return "bg-red-100 text-red-800 border-red-200";
      case "confirmed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_transit": return "bg-purple-100 text-purple-800 border-purple-200";
      case "investigating": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved": return "bg-green-100 text-green-800 border-green-200";
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

  const handleCreateOrder = () => {
    setShowOrderModal(true);
  };

  const handleUpdatePricing = (product: any) => {
    setSelectedProduct(product);
    setShowPricingModal(true);
  };

  const handleOrderSubmit = () => {
    console.log("Creating order:", newOrder);
    setShowOrderModal(false);
    setNewOrder({
      product: "",
      quantity: "",
      supplier: "",
      expectedDate: "",
      notes: ""
    });
  };

  const handlePricingUpdate = () => {
    console.log("Updating pricing for:", selectedProduct);
    setShowPricingModal(false);
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
              <span className="text-gray-600">Welcome, {retailerData.name}</span>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Retail Dashboard</h1>
              <p className="text-gray-600">{retailerData.location} • ⭐ {retailerData.rating}/5</p>
            </div>
            <button
              onClick={handleCreateOrder}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <span>➕</span>
              Place New Order
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
              <span className="text-gray-600 text-sm">Total Products</span>
              <span className="text-2xl">📦</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{retailerData.totalProducts}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Low Stock Items</span>
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">{retailerData.lowStockItems}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Monthly Revenue</span>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-2xl font-bold text-green-600">₹{retailerData.monthlyRevenue.toLocaleString()}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Active Suppliers</span>
              <span className="text-2xl">🤝</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{retailerData.activeSuppliers}</div>
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
              onClick={() => setActiveTab("inventory")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "inventory"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Inventory
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "orders"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("suppliers")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "suppliers"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Suppliers
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "analytics"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("quality")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "quality"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Quality Control
            </button>
          </div>
        </motion.div>

        {/* Inventory Tab */}
        {activeTab === "inventory" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {inventory.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{item.product}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                        {item.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">{item.category}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Supplier</p>
                        <p className="font-medium">{item.supplier}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Stock Level</p>
                        <p className="font-medium">{item.currentStock} / {item.maxStock} units</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              item.currentStock < item.minStock ? 'bg-red-500' : 
                              item.currentStock < item.minStock * 1.5 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(item.currentStock / item.maxStock) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Quality Score</p>
                        <p className="font-medium">{item.qualityScore}%</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>📅 Last restocked: {item.lastRestocked}</span>
                      <span>⏰ Expires: {item.expiryDate}</span>
                    </div>
                  </div>

                  <div className="lg:w-80">
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Cost Price</p>
                          <p className="font-medium">₹{item.costPrice}/kg</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Selling Price</p>
                          <p className="font-medium">₹{item.sellingPrice}/kg</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Margin</p>
                          <p className="font-medium text-green-600">{item.margin}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Min Stock</p>
                          <p className="font-medium">{item.minStock} units</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdatePricing(item)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Update Pricing
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Restock
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {incomingOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{order.product}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Supplier</p>
                        <p className="font-medium">{order.supplier}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Quantity</p>
                        <p className="font-medium">{order.quantity} units</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Order Date</p>
                        <p className="font-medium">{order.orderDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Expected Delivery</p>
                        <p className="font-medium">{order.expectedDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-48">
                    <div className="text-right mb-4">
                      <div className="text-2xl font-bold text-green-600">₹{order.totalValue}</div>
                      <div className="text-sm text-gray-500">Total Value</div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors">
                        Track Order
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Suppliers Tab */}
        {activeTab === "suppliers" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={supplier.image}
                    alt={supplier.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{supplier.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{supplier.location}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.floor(supplier.rating))}
                      </div>
                      <span className="text-sm text-gray-600">{supplier.rating}/5</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Orders</p>
                    <p className="font-medium">{supplier.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg Delivery</p>
                    <p className="font-medium">{supplier.avgDeliveryTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Reliability</p>
                    <p className="font-medium">{supplier.reliability}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Order</p>
                    <p className="font-medium">{supplier.lastOrder}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg text-sm hover:bg-green-200 transition-colors">
                    Place Order
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Sales Chart */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Sales</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {salesData.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center gap-2">
                    <div 
                      className="bg-green-500 rounded-t-lg w-12 transition-all duration-500 hover:bg-green-600"
                      style={{ height: `${(day.sales / 16000) * 200}px` }}
                    ></div>
                    <span className="text-sm text-gray-600">{day.day}</span>
                    <span className="text-xs text-gray-500">₹{day.sales.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Products</h3>
                <div className="space-y-3">
                  {inventory.slice(0, 5).map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium">{item.product}</span>
                      </div>
                      <span className="text-sm text-gray-600">₹{item.sellingPrice}/kg</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vegetables</span>
                    <span className="font-medium">₹85,000 (68%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fruits</span>
                    <span className="font-medium">₹25,000 (20%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Herbs</span>
                    <span className="font-medium">₹15,000 (12%)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quality Control Tab */}
        {activeTab === "quality" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {qualityIssues.map((issue) => (
              <div key={issue.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{issue.product}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(issue.status)}`}>
                        {issue.status.toUpperCase()}
                      </span>
                      <span className={`text-sm font-medium ${getPriorityColor(issue.priority)}`}>
                        {issue.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Batch ID</p>
                        <p className="font-medium">{issue.batchId}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Reported By</p>
                        <p className="font-medium">{issue.reportedBy}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Issue</p>
                        <p className="font-medium">{issue.issue}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Date</p>
                        <p className="font-medium">{issue.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-48">
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Investigate
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Create Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Place New Order</h2>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product *
                  </label>
                  <select
                    value={newOrder.product}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, product: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Product</option>
                    <option value="tomatoes">Organic Tomatoes</option>
                    <option value="carrots">Carrots</option>
                    <option value="potatoes">Red Potatoes</option>
                    <option value="apples">Apples</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, quantity: e.target.value }))}
                    placeholder="25"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supplier *
                  </label>
                  <select
                    value={newOrder.supplier}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, supplier: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Supplier</option>
                    <option value="gvf">Green Valley Farm</option>
                    <option value="sof">Sunrise Organic Farm</option>
                    <option value="mvf">Mountain View Farm</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Delivery Date *
                  </label>
                  <input
                    type="date"
                    value={newOrder.expectedDate}
                    onChange={(e) => setNewOrder(prev => ({ ...prev, expectedDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special requirements or notes..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setShowOrderModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleOrderSubmit}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Update Pricing Modal */}
      {showPricingModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Update Pricing</h2>
              <button
                onClick={() => setShowPricingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-bold text-gray-900">{selectedProduct.product}</h3>
                <p className="text-gray-600">Current: ₹{selectedProduct.sellingPrice}/kg</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Selling Price (₹/kg)
                </label>
                <input
                  type="number"
                  placeholder={selectedProduct.sellingPrice.toString()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  Cost Price: ₹{selectedProduct.costPrice}/kg
                </p>
                <p className="text-sm text-gray-600">
                  Current Margin: {selectedProduct.margin}%
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowPricingModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePricingUpdate}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Update Price
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Retailer;
