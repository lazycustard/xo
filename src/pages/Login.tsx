import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || (activeTab === "signup" && !name)) {
      setError("Please fill out all required fields.");
      return;
    }

    // Placeholder auth flow: store a basic token and redirect home
    const fakeToken = btoa(`${email}:${Date.now()}`);
    localStorage.setItem("auth_token", fakeToken);
    localStorage.setItem("auth_email", email);
    if (activeTab === "signup") {
      localStorage.setItem("auth_name", name);
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌱</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">FarmTrace</h1>
          </div>
          <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
            Home
          </Link>
        </div>
      </header>

      <main className="px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
            <div className="flex">
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "login" ? "bg-green-50 text-green-700" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "signup" ? "bg-green-50 text-green-700" : "text-gray-600"
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {activeTab === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600">{error}</div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                {activeTab === "login" ? "Log In" : "Create Account"}
              </button>

              {activeTab === "login" && (
                <p className="text-sm text-center text-gray-600">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="text-green-700 font-medium hover:underline"
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign up
                  </button>
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
