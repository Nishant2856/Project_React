import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const CompanyLogin = ({ setIsCompanyLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "company.com" && password === "123456") {
      localStorage.setItem("companyAuth", "true");
      setIsCompanyLoggedIn(true);  // ✅ Update login state before navigating

      setTimeout(() => {
        navigate("/company/add-job"); // ✅ Navigate after state updates
      }, 100);
    } else {
      alert("Invalid credentials");
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

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-medium">Email ID / Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email / Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
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
    </div>
  );
};

export default CompanyLogin;
