import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const CompanyNavbar = () => {
  const location = useLocation();
  const [companyData, setCompanyData] = useState({
    name: "",
    logo: ""
  });

  useEffect(() => {
    // Get company data from localStorage
    const companyString = localStorage.getItem("company");
    if (companyString) {
      try {
        const company = JSON.parse(companyString);
        setCompanyData({
          name: company.name || "Company",
          logo: company.logo || "/default-logo.png"
        });
      } catch (error) {
        console.error("Error parsing company data:", error);
      }
    }
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo (Now Static, No Link) */}
      <img src="/logo1.png" alt="Job Vault Logo" className="h-10 w-auto" />

      {/* Menu Items */}
      <div className="flex space-x-8">
        <Link
          to="/company/add-job"
          className={`text-lg font-semibold ${
            location.pathname === "/company/add-job" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          ADD
        </Link>

        <Link
          to="/company/manage-jobs"
          className={`text-lg font-semibold ${
            location.pathname === "/company/manage-jobs" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          MANAGE
        </Link>

        <Link
          to="/company/employee-list"
          className={`text-lg font-semibold ${
            location.pathname === "/company/employee-list" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          APPLICANTS
        </Link>
      </div>

      {/* Welcome Message and Profile Redirect */}
      <div className="flex items-center text-gray-700 font-medium">
        <div className="mr-4">Welcome, {companyData.name}</div>
        {/* Company logo with navigation to profile */}
        <Link to="/company/profile">
          <img
            src={companyData.logo && companyData.logo.startsWith('http') ? companyData.logo : `http://localhost:5000/${companyData.logo}`}
            alt="Company Logo"
            className="h-10 w-10 object-cover rounded-full border-2 border-gray-300 shadow-sm"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/firstsource.gif"; // Fallback image if logo cannot be loaded
            }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default CompanyNavbar;
