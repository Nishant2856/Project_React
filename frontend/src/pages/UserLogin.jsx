import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Store authentication status in localStorage
    localStorage.setItem("applicantAuth", "true");
    navigate("/ajob");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="relative flex max-w-4xl w-full">
        {/* Left Section */}
        <div className="relative hidden md:flex flex-col items-center justify-center bg-gray-50 p-8 w-2/4 rounded-lg shadow-lg">
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

        {/* Right Section */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-8 w-1/2 rounded-lg shadow-lg">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          >
            <X size={24} />
          </button>

          <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 font-medium">Email ID / Username</label>
              <input
                type="email"
                placeholder="Enter Email / Username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="text-right text-blue-500 text-sm cursor-pointer mt-1">
                Forgot Password?
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

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