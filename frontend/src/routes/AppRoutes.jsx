import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Jobs from "../pages/Jobs";
import Services from "../pages/Services";
import UserSignup from "../pages/Usersignup";
import UserLogin from "../pages/UserLogin";
import CompanyLogin from "../companies/CompanyLogin";
import CompanySignup from "../companies/CompanySignup";
import CompanyNavbar from "../companies/CompanyNavbar";
import AddJob from "../companies/AddJob"; 
import ManageJobs from "../companies/ManageJobs"; 
import EmployeeList from "../companies/EmployeeList"; 
import CompanyProfile from "../companies/CompanyProfile"; 
import CompanyUpdateJob from "../companies/CompanyUpdateJob"; 
import AdminLogin from "../admin/AdminLogin";

const AppContent = () => {
  const location = useLocation();
  const [isCompanyLoggedIn, setIsCompanyLoggedIn] = useState(() => {
    return localStorage.getItem("companyAuth") === "true";
  });

  useEffect(() => {
    // ✅ Track changes in localStorage and update state
    const authStatus = localStorage.getItem("companyAuth") === "true";
    setIsCompanyLoggedIn(authStatus);
  }, []);

  const currentPath = location.pathname.trim().toLowerCase();

  // ✅ Hide Navbar & Footer on login/signup pages
  const hideNavFooter = [
    "/login", 
    "/register", 
    "/company-login", 
    "/company-signup", 
    "/admin-login"
  ].includes(currentPath);

  // ✅ Hide Company Navbar on certain pages
  const excludeCompanyNavbarOnPages = ["/company/profile"];

  // ✅ Hide both navbars on specific pages
  const excludeNavOnPages = [
    "/company/profile", 
    "/admin-login", 
    "/company-login", 
    "/company-signup"
  ];

  // ✅ Show Company Navbar if logged in and on relevant pages
  const showCompanyNavbar =
    isCompanyLoggedIn &&
    currentPath.startsWith("/company") &&
    !excludeCompanyNavbarOnPages.includes(currentPath);

  // ✅ Show Default Navbar only if it's not hidden & not showing Company Navbar
  const showDefaultNavbar = !hideNavFooter && !showCompanyNavbar && !excludeNavOnPages.includes(currentPath);

  return (
    <>
      {/* ✅ Debugging Output */}
      {console.log("showDefaultNavbar:", showDefaultNavbar)}
      {console.log("showCompanyNavbar:", showCompanyNavbar)}

      {/* ✅ Conditionally Render Navbars */}
      {showDefaultNavbar && <Navbar />}
      {showCompanyNavbar && <CompanyNavbar />}
      
      <Routes>
        {/* General Pages */}
        <Route path="/" element={<Jobs />} />
        <Route path="/companies" element={<Navigate to="/company-login" replace />} />
        <Route path="/company-login" element={<CompanyLogin setIsCompanyLoggedIn={setIsCompanyLoggedIn} />} />
        <Route path="/company-signup" element={<CompanySignup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />

        {/* ✅ Admin Login (No Navbar & Footer) */}
        <Route path="/admin-login" element={<AdminLogin />} /> 

        {/* ✅ Redirect after Login */}
        <Route 
          path="/company-dashboard" 
          element={isCompanyLoggedIn ? <Navigate to="/company/add-job" replace /> : <Navigate to="/company-login" replace />} 
        />

        {/* ✅ Protect Company Pages */}
        <Route path="/company/add-job" element={isCompanyLoggedIn ? <AddJob /> : <Navigate to="/company-login" replace />} />
        <Route path="/company/manage-jobs" element={isCompanyLoggedIn ? <ManageJobs /> : <Navigate to="/company-login" replace />} />
        <Route path="/company/employee-list" element={isCompanyLoggedIn ? <EmployeeList /> : <Navigate to="/company-login" replace />} />
        <Route path="/company/profile" element={isCompanyLoggedIn ? <CompanyProfile setIsCompanyLoggedIn={setIsCompanyLoggedIn} /> : <Navigate to="/company-login" replace />} />
        
        {/* ✅ New Route for Updating Jobs */}
        <Route path="/company/update-job/:jobId" element={isCompanyLoggedIn ? <CompanyUpdateJob /> : <Navigate to="/company-login" replace />} />
      </Routes>

      {/* ✅ Conditionally Render Footer */}
      {!hideNavFooter && !excludeNavOnPages.includes(currentPath) && <Footer />}
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default AppRoutes;
