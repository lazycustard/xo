import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<any>(null);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);

  // Mock data for admin dashboard
  const adminData = {
    name: "Admin Panel",
    totalUsers: 1247,
    activeUsers: 892,
    totalTransactions: 15678,
    platformRevenue: 245000,
    pendingCertifications: 23,
    activeDisputes: 8,
    systemHealth: 99.2
  };

  const pendingCertifications = [
    {
      id: "CERT001",
      farmName: "Sunrise Organic Farm",
      location: "Maharashtra, India",
      certificationType: "Organic",
      submittedDate: "2024-01-15",
      status: "pending_review",
      documents: 5,
      inspector: "Dr. Rajesh Kumar",
      priority: "high",
      estimatedReviewTime: "3 days"
    },
    {
      id: "CERT002",
      farmName: "Green Valley Farm",
      location: "Punjab, India",
      certificationType: "Fair Trade",
      submittedDate: "2024-01-14",
      status: "under_review",
      documents: 8,
      inspector: "Dr. Priya Sharma",
      priority: "medium",
      estimatedReviewTime: "2 days"
    },
    {
      id: "CERT003",
      farmName: "Mountain View Farm",
      location: "Himachal Pradesh, India",
      certificationType: "Pesticide Free",
      submittedDate: "2024-01-16",
      status: "pending_review",
      documents: 6,
      inspector: "Dr. Amit Singh",
      priority: "low",
      estimatedReviewTime: "5 days"
    }
  ];

  const activeDisputes = [
    {
      id: "DISP001",
      type: "Quality Issue",
      reportedBy: "Fresh Mart Delhi",
      reportedAgainst: "Green Valley Farm",
      product: "Organic Tomatoes",
      batchId: "TOM001",
      reportedDate: "2024-01-17",
      status: "investigating",
      priority: "high",
      description: "Customer complaints about quality below standard",
      evidence: 3
    },
    {
      id: "DISP002",
      type: "Delivery Delay",
      reportedBy: "Organic Store Mumbai",
      reportedAgainst: "Fresh Transport Co.",
      product: "Carrots",
      batchId: "CAR002",
      reportedDate: "2024-01-16",
      status: "under_review",
      priority: "medium",
      description: "Delivery delayed by 2 days causing product spoilage",
      evidence: 2
    },
    {
      id: "DISP003",
      type: "Pricing Dispute",
      reportedBy: "City Market",
      reportedAgainst: "Mountain View Farm",
      product: "Red Potatoes",
      batchId: "POT003",
      reportedDate: "2024-01-15",
      status: "resolved",
      priority: "low",
      description: "Disagreement over final pricing after quality assessment",
      evidence: 1
    }
  ];

  const userManagement = [
    {
      id: "USER001",
      name: "Green Valley Farm",
      type: "Farmer",
      email: "contact@greenvalley.com",
      location: "Punjab, India",
      status: "active",
      joinDate: "2023-06-15",
      totalOrders: 156,
      rating: 4.8,
      lastActive: "2024-01-17",
      verificationStatus: "verified"
    },
    {
      id: "USER002",
      name: "Fresh Mart Delhi",
      type: "Retailer",
      email: "orders@freshmart.com",
      location: "Delhi, India",
      status: "active",
      joinDate: "2023-08-22",
      totalOrders: 89,
      rating: 4.6,
      lastActive: "2024-01-17",
      verificationStatus: "verified"
    },
    {
      id: "USER003",
      name: "Fresh Transport Co.",
      type: "Distributor",
      email: "logistics@freshtransport.com",
      location: "Delhi, India",
      status: "suspended",
      joinDate: "2023-09-10",
      totalOrders: 234,
      rating: 3.2,
      lastActive: "2024-01-10",
      verificationStatus: "pending"
    }
  ];

  const platformMetrics = [
    {
      name: "Total Users",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: "👥"
    },
    {
      name: "Active Users",
      value: "892",
      change: "+8%",
      changeType: "positive",
      icon: "🟢"
    },
    {
      name: "Transactions",
      value: "15,678",
      change: "+23%",
      changeType: "positive",
      icon: "💳"
    },
    {
      name: "Platform Revenue",
      value: "₹2,45,000",
      change: "+18%",
      changeType: "positive",
      icon: "💰"
    },
    {
      name: "Pending Certifications",
      value: "23",
      change: "-5%",
      changeType: "negative",
      icon: "📋"
    },
    {
      name: "Active Disputes",
      value: "8",
      change: "+2%",
      changeType: "negative",
      icon: "⚠️"
    }
  ];

  const systemHealth = [
    { service: "API Gateway", status: "healthy", uptime: "99.9%", responseTime: "45ms" },
    { service: "Database", status: "healthy", uptime: "99.8%", responseTime: "12ms" },
    { service: "File Storage", status: "healthy", uptime: "99.7%", responseTime: "89ms" },
    { service: "Notification Service", status: "degraded", uptime: "98.2%", responseTime: "156ms" },
    { service: "Payment Gateway", status: "healthy", uptime: "99.9%", responseTime: "234ms" }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "certification_approved",
      message: "Organic certification approved for Sunrise Organic Farm",
      timestamp: "2024-01-17 14:30",
      user: "Dr. Rajesh Kumar"
    },
    {
      id: 2,
      type: "dispute_resolved",
      message: "Quality dispute resolved between Fresh Mart and Green Valley Farm",
      timestamp: "2024-01-17 11:15",
      user: "Admin Panel"
    },
    {
      id: 3,
      type: "user_suspended",
      message: "Fresh Transport Co. suspended due to multiple delivery delays",
      timestamp: "2024-01-16 16:45",
      user: "Admin Panel"
    },
    {
      id: 4,
      type: "new_user",
      message: "New retailer 'Organic Store Mumbai' registered",
      timestamp: "2024-01-16 09:20",
      user: "System"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_review": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "under_review": return "bg-blue-100 text-blue-800 border-blue-200";
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      case "investigating": return "bg-orange-100 text-orange-800 border-orange-200";
      case "resolved": return "bg-green-100 text-green-800 border-green-200";
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "suspended": return "bg-red-100 text-red-800 border-red-200";
      case "healthy": return "bg-green-100 text-green-800 border-green-200";
      case "degraded": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "down": return "bg-red-100 text-red-800 border-red-200";
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

  const handleReviewCertification = (cert: any) => {
    setSelectedCertification(cert);
    setShowCertificationModal(true);
  };

  const handleReviewDispute = (dispute: any) => {
    setSelectedDispute(dispute);
    setShowDisputeModal(true);
  };

  const handleCertificationDecision = (decision: string) => {
    console.log(`Certification ${selectedCertification.id} ${decision}`);
    setShowCertificationModal(false);
  };

  const handleDisputeDecision = (decision: string) => {
    console.log(`Dispute ${selectedDispute.id} ${decision}`);
    setShowDisputeModal(false);
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
              <span className="text-gray-600">Admin Panel</span>
              <button className="text-green-600 hover:text-green-700">
                Settings
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Platform Management & Monitoring</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                System Health: {adminData.systemHealth}%
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                Emergency Mode
              </button>
            </div>
          </div>
        </motion.div>

        {/* Platform Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {platformMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">{metric.name}</span>
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className={`text-sm ${metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last month
              </div>
            </div>
          ))}
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
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "certifications"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Certifications
            </button>
            <button
              onClick={() => setActiveTab("disputes")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "disputes"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Disputes
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "users"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "system"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              System Health
            </button>
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">{activity.message}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{activity.timestamp}</span>
                        <span>•</span>
                        <span>{activity.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-bold text-gray-900 mb-2">Review Certifications</h3>
                <p className="text-gray-600 text-sm">{adminData.pendingCertifications} pending</p>
              </button>
              
              <button className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
                <div className="text-3xl mb-3">⚠️</div>
                <h3 className="font-bold text-gray-900 mb-2">Handle Disputes</h3>
                <p className="text-gray-600 text-sm">{adminData.activeDisputes} active</p>
              </button>
              
              <button className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="font-bold text-gray-900 mb-2">Manage Users</h3>
                <p className="text-gray-600 text-sm">{adminData.totalUsers} total users</p>
              </button>
              
              <button className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
                <div className="text-3xl mb-3">⚙️</div>
                <h3 className="font-bold text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-600 text-sm">Configure platform</p>
              </button>
            </div>
          </motion.div>
        )}

        {/* Certifications Tab */}
        {activeTab === "certifications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {pendingCertifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{cert.farmName}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(cert.status)}`}>
                        {cert.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`text-sm font-medium ${getPriorityColor(cert.priority)}`}>
                        {cert.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Location</p>
                        <p className="font-medium">{cert.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Certification Type</p>
                        <p className="font-medium">{cert.certificationType}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Submitted Date</p>
                        <p className="font-medium">{cert.submittedDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Documents</p>
                        <p className="font-medium">{cert.documents} files</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Inspector</p>
                        <p className="font-medium">{cert.inspector}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Est. Review Time</p>
                        <p className="font-medium">{cert.estimatedReviewTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-48">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReviewCertification(cert)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Review
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Documents
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Disputes Tab */}
        {activeTab === "disputes" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {activeDisputes.map((dispute) => (
              <div key={dispute.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{dispute.type}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(dispute.status)}`}>
                        {dispute.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`text-sm font-medium ${getPriorityColor(dispute.priority)}`}>
                        {dispute.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Reported By</p>
                        <p className="font-medium">{dispute.reportedBy}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Reported Against</p>
                        <p className="font-medium">{dispute.reportedAgainst}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Product</p>
                        <p className="font-medium">{dispute.product} ({dispute.batchId})</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Reported Date</p>
                        <p className="font-medium">{dispute.reportedDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Evidence</p>
                        <p className="font-medium">{dispute.evidence} files</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 text-sm">Description</p>
                      <p className="font-medium">{dispute.description}</p>
                    </div>
                  </div>

                  <div className="lg:w-48">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReviewDispute(dispute)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Review
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Evidence
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* User Management Tab */}
        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {userManagement.map((user) => (
              <div key={user.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user.status)}`}>
                        {user.status.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.verificationStatus.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Type</p>
                        <p className="font-medium">{user.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Location</p>
                        <p className="font-medium">{user.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Join Date</p>
                        <p className="font-medium">{user.joinDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Total Orders</p>
                        <p className="font-medium">{user.totalOrders}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Rating</p>
                        <p className="font-medium">⭐ {user.rating}/5</p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      Last Active: {user.lastActive}
                    </div>
                  </div>

                  <div className="lg:w-48">
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      <button className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        user.status === 'active' 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}>
                        {user.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* System Health Tab */}
        {activeTab === "system" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">System Health Status</h3>
              <div className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'healthy' ? 'bg-green-500' : 
                        service.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{service.service}</h4>
                        <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Response Time</p>
                      <p className="font-medium">{service.responseTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">System Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-600">⚠️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Notification Service Degraded</p>
                      <p className="text-xs text-gray-600">Response time increased by 50%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600">✅</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">All Systems Operational</p>
                      <p className="text-xs text-gray-600">Last checked 2 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">CPU Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memory Usage</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Disk Usage</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Network I/O</span>
                    <span className="font-medium">12 MB/s</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Certification Review Modal */}
      {showCertificationModal && selectedCertification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Review Certification</h2>
              <button
                onClick={() => setShowCertificationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{selectedCertification.farmName}</h3>
                <p className="text-gray-600">{selectedCertification.location}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Certification Type</p>
                  <p className="font-medium">{selectedCertification.certificationType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Inspector</p>
                  <p className="font-medium">{selectedCertification.inspector}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Documents Submitted</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span>📄</span>
                    <span>Soil Test Report</span>
                    <button className="ml-auto text-blue-600 hover:text-blue-700">View</button>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span>📄</span>
                    <span>Water Quality Report</span>
                    <button className="ml-auto text-blue-600 hover:text-blue-700">View</button>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span>📄</span>
                    <span>Farm Inspection Report</span>
                    <button className="ml-auto text-blue-600 hover:text-blue-700">View</button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Notes
                </label>
                <textarea
                  placeholder="Add your review notes here..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setShowCertificationModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCertificationDecision('reject')}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => handleCertificationDecision('approve')}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Approve
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Dispute Review Modal */}
      {showDisputeModal && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Review Dispute</h2>
              <button
                onClick={() => setShowDisputeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{selectedDispute.type}</h3>
                <p className="text-gray-600">Between {selectedDispute.reportedBy} and {selectedDispute.reportedAgainst}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Product</p>
                  <p className="font-medium">{selectedDispute.product} ({selectedDispute.batchId})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <p className="font-medium">{selectedDispute.priority.toUpperCase()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="font-medium">{selectedDispute.description}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Evidence Files</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span>📄</span>
                    <span>Customer Complaint Report</span>
                    <button className="ml-auto text-blue-600 hover:text-blue-700">View</button>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <span>📷</span>
                    <span>Product Photos</span>
                    <button className="ml-auto text-blue-600 hover:text-blue-700">View</button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Notes
                </label>
                <textarea
                  placeholder="Add your resolution notes here..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setShowDisputeModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDisputeDecision('escalate')}
                className="px-6 py-3 bg-yellow-600 text-white rounded-xl font-medium hover:bg-yellow-700 transition-colors"
              >
                Escalate
              </button>
              <button
                onClick={() => handleDisputeDecision('resolve')}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Resolve
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Admin;
