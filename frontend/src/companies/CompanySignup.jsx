import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const CompanySignup = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 py-10">
      <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-lg py-10">
        {/* Cut Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        {/* Form Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Create your Company profile
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Search & apply to jobs from India’s No.1 Job Site
        </p>

        {/* Form Fields */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Company Name</label>
            <input
              type="text"
              placeholder="What is your company name?"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email ID</label>
            <input
              type="email"
              placeholder="Tell us your Email ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">About</label>
            <textarea
              placeholder="Describe your jobs and yourself"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>
          </div>

          {/* Upload Logo */}
          <div>
            <label className="block text-gray-700 font-medium">Company Logo</label>
            <div className="flex items-center border rounded-lg p-2">
              <span className="text-gray-500 mr-2">📁</span>
              <input type="file" className="w-full text-gray-500 cursor-pointer" />
            </div>
          </div>

          {/* Register Button - Redirect to Company Login */}
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission refresh
              navigate("/company-login"); // Redirect to company login
            }}
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanySignup;
