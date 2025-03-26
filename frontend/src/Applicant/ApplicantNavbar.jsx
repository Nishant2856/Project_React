import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const ApplicantNavbar = () => {
  const navigate = useNavigate();
  const userName = "Nishant"; // You can make this dynamic later

  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-10 flex items-center justify-between">
      {/* Logo */}
      <Link to="/ajob" className="flex items-center">
        <img src="/logo1.png" alt="Job Vault Logo" className="h-10 w-auto" />
      </Link>
      
      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/ajob" className="text-lg font-semibold text-gray-700 hover:text-blue-600">
          Jobs
        </Link>
        <Link to="/services" className="text-lg font-semibold text-gray-700 hover:text-blue-600">
          Services
        </Link>
      </div>
      
      {/* User Profile Section */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 text-lg hidden md:block">Welcome, {userName}</span>
        
        {/* Profile Image/Icon that navigates to ApplicantProfile */}
        <button 
          onClick={() => navigate("/applicant-profile")}
          className="flex items-center justify-center"
        >
          {/* You can use either an image or an icon */}
          {/* Option 1: Using an image from your files */}
          <img 
            src="/profile.jpg" // Replace with your actual profile image path
            alt="Profile" 
            className="h-10 w-10 rounded-full border-2 border-gray-200 object-cover"
          />
          
          {/* Option 2: Using an icon (if you don't have an image) */}
          {/* <div className="h-10 w-10 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
            <FiUser className="text-gray-600 text-xl" />
          </div> */}
        </button>
      </div>
    </nav>
  );
};

export default ApplicantNavbar;