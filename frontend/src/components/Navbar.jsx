import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Menu icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // ✅ Hook for navigation

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCompaniesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-10 flex items-center justify-between relative">
      {/* Logo - Clicking redirects to Admin Login ✅ */}
      <img 
        src="/logo1.png" 
        alt="Job Vault Logo" 
        className="h-10 w-auto cursor-pointer" 
        onClick={() => navigate("/admin-login")} // ✅ Redirects to Admin Login
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/" className="text-lg font-semibold text-gray-700 hover:text-blue-600">
          Jobs
        </Link>

        {/* Companies with Clickable Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setCompaniesOpen(!companiesOpen)}
            className="text-lg font-semibold text-gray-700 hover:text-blue-600"
          >
            Companies
          </button>

          {/* Dropdown Content */}
          {companiesOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">
              <Link 
                to="/company-login"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Company Login
              </Link>
              <Link 
                to="/company-signup"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Company Signup
              </Link>
            </div>
          )}
        </div>

        <Link to="/services" className="text-lg font-semibold text-gray-700 hover:text-blue-600">
          Services
        </Link>
      </div>

      {/* Buttons (Login/Register) */}
      <div className="hidden md:flex space-x-4">
        <Link 
          to="/login" 
          className="border border-blue-500 text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-600 transition"
        >
          Register
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Jobs</Link>
            
            {/* Companies Dropdown in Mobile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCompaniesOpen(!companiesOpen)}
                className="text-gray-700 hover:text-blue-600 flex justify-between w-full"
              >
                Companies
              </button>
              {companiesOpen && (
                <div className="mt-2 bg-white border shadow-md rounded-lg">
                  <Link to="/company-login" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Company Login</Link>
                  <Link to="/company-signup" className="block px-4 py-2 text-gray-700 hover:bg-blue-100">Company Signup</Link>
                </div>
              )}
            </div>

            <Link to="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
            <Link to="/login" className="border border-blue-500 text-blue-500 px-4 py-1 rounded-lg text-center hover:bg-blue-500 hover:text-white transition">Login</Link>
            <Link to="/register" className="bg-orange-500 text-white px-4 py-1 rounded-lg text-center hover:bg-orange-600 transition">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
