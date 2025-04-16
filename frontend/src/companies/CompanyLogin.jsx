import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import api from "../services/api";

const CompanyLogin = ({ setIsCompanyLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    // Check if company is already logged in
    const token = localStorage.getItem("token");
    const companyAuth = localStorage.getItem("companyAuth");
    
    if (token && companyAuth === "true") {
      navigate("/company/add-job");
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
      const response = await api.post('/companies/login', formData);
      
      if (response.data.success) {
        // Store the token and company data
        localStorage.setItem("token", response.data.token);
        
        // Store complete company information
        const companyData = {
          id: response.data.company.id,
          name: response.data.company.name,
          logo: response.data.company.logo,
          user: response.data.company.user
        };
        
        localStorage.setItem("company", JSON.stringify(companyData));
        localStorage.setItem("companyAuth", "true");
        
        // Update the auth state
        setIsCompanyLoggedIn(true);
        
        // Redirect to the dashboard
        navigate("/company/add-job");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!resetEmail.trim()) {
      return;
    }
    
    try {
      // In a real application, you would call an API endpoint here
      // For now, let's simulate a successful password reset request
      setResetSuccess(true);
      
      // In a real app, this would be:
      // await api.post('/companies/request-password-reset', { email: resetEmail });
      
      // Reset the form after 3 seconds and close the modal
      setTimeout(() => {
        setResetSuccess(false);
        setResetEmail("");
        setShowForgotPasswordModal(false);
      }, 3000);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md relative">
        {/* Close Button */}
        <button onClick={() => navigate("/")} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/login.jpeg" alt="Logo" className="h-12" />
        </div>

        {/* Form Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">Company Login</h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-medium">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-blue-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button 
              type="button"
              onClick={() => setShowForgotPasswordModal(true)} 
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/company-signup")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Register here
            </button>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Reset Password</h3>
              <button 
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setResetEmail("");
                  setResetSuccess(false);
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>
            
            {resetSuccess ? (
              <div className="text-center py-4">
                <div className="text-green-600 mb-2">Password reset link sent!</div>
                <p className="text-gray-700">Please check your email for instructions to reset your password.</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  We'll send you a link to reset your password.
                </p>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyLogin;
