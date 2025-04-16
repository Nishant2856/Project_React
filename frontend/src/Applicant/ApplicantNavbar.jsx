import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const ApplicantNavbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "User",
    logo: "/profile.jpg"
  });

  useEffect(() => {
    // Get user data from localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserData({
          name: user.name || "User",
          logo: user.logo || "/profile.jpg"
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

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
        <Link to="/services2" className="text-lg font-semibold text-gray-700 hover:text-blue-600">
          Services
        </Link>
      </div>
      
      {/* User Profile Section */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 text-lg hidden md:block">Welcome, {userData.name}</span>
        
        {/* Profile Image/Icon that navigates to ApplicantProfile */}
        <button 
          onClick={() => navigate("/applicant-profile")}
          className="flex items-center justify-center"
        >
          <img 
            src={userData.logo && userData.logo.startsWith('http') 
              ? userData.logo 
              : userData.logo.startsWith('uploads') 
                ? `http://localhost:5000/${userData.logo}` 
                : "/profile.jpg"}
            alt="Profile" 
            className="h-10 w-10 rounded-full border-2 border-gray-200 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/profile.jpg"; // Fallback image
            }}
          />
        </button>
      </div>
    </nav>
  );
};

export default ApplicantNavbar;