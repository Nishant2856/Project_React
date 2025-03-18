import React from "react";
import { Link, useLocation } from "react-router-dom";

const CompanyNavbar = ({ companyName }) => {
  const location = useLocation();

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
        <div className="mr-4">Welcome, Firstsource {companyName}</div>
        {/* ✅ Clicking firstsource.gif will now navigate to /company/profile */}
        <Link to="/company/profile">
          <img
            src="/firstsource.gif"
            alt="Company Logo"
            className="h-10 w-10 object-contain cursor-pointer"
          />
        </Link>
      </div>
    </nav>
  );
};

export default CompanyNavbar;
