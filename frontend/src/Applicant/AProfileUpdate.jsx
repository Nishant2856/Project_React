import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const AProfileUpdate = () => {
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    navigate("/applicant-profile");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="relative bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        {/* Close Button */}
        <button
          onClick={() => navigate("/applicant-profile")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Update Profile</h2>
        
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email ID</label>
            <input
              type="email"
              placeholder="Enter Email ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default AProfileUpdate;
