import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import api from "../services/api";

const UserLogin = ({ setIsApplicantLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    const applicantAuth = localStorage.getItem("applicantAuth");
    
    if (token && applicantAuth === "true") {
      navigate("/ajob");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // Call the backend API
      const response = await api.post('/users/login', formData);
      
      if (response.data.success) {
        // Store the token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("applicantAuth", "true");
        
        // Update the auth state
        setIsApplicantLoggedIn(true);
        
        // Redirect to the dashboard
        navigate("/ajob");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="relative flex max-w-4xl w-full">
        {/* Left Section */}
        <div className="relative hidden md:flex flex-col items-center justify-center bg-gray-50 p-8 w-2/4 rounded-lg shadow-lg">
          {/* Image at the top */}
          <img src="/login.jpeg" alt="Info" className="h-20 mb-4" />

          <h2 className="text-xl font-semibold">New to Job?</h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> One-click apply using Naukri profile.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Get relevant job recommendations.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Showcase profile to top companies.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Track application status.
            </li>
          </ul>
        </div>

        {/* Right Section (Overlapping) */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-8 w-1/2 rounded-lg shadow-lg">
          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          >
            <X size={24} />
          </button>

          <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 font-medium">Email ID / Username</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email / Username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <div className="text-right text-blue-500 text-sm cursor-pointer mt-1">
                Forgot Password?
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? 
            <span 
              className="text-blue-500 cursor-pointer hover:underline ml-1"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;