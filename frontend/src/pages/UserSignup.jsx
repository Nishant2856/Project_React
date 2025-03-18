import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const UserSignup = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4 py-8">
      <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl flex gap-6">
        {/* Cut Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        {/* Left Card - Compact Info */}
        <div className="bg-white shadow-md rounded-lg p-4 w-72 flex flex-col items-center text-center">
          <img src="/login.jpeg" alt="Info" className="h-50 mb-2" />
          <h3 className="text-md font-semibold text-gray-800 mb-1">
            New to Job?
          </h3>
          <ul className="text-sm text-gray-600 space-y-1 leading-tight">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> One-click apply
              using Naukri profile.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Get relevant job
              recommendations.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Showcase profile
              to top companies.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Track application
              status.
            </li>
          </ul>
        </div>

        {/* Right Section - Signup Form */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Create your Job profile
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Search & apply to jobs from India’s No.1 Job Site
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="What is your name?"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Email ID
              </label>
              <input
                type="email"
                placeholder="Tell us your Email ID"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Address</label>
              <input
                type="text"
                placeholder="Enter Your Address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="border p-3 rounded-lg flex-1 text-center cursor-pointer hover:bg-gray-200">
                <p className="text-sm font-medium">I’m experienced</p>
                <span className="text-xs text-gray-500">
                  I have work experience
                </span>
              </div>
              <div className="border p-3 rounded-lg flex-1 text-center cursor-pointer hover:bg-gray-200">
                <p className="text-sm font-medium">I’m fresher</p>
                <span className="text-xs text-gray-500">
                  No work experience
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-gray-700 text-sm">
              <input type="checkbox" className="cursor-pointer" />
              <label>
                Send me important updates & promotions via SMS, email, and
                WhatsApp
              </label>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Register Now
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
