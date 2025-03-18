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

const AppContent = () => {
  const location = useLocation();
  const [isCompanyLoggedIn, setIsCompanyLoggedIn] = useState(localStorage.getItem("companyAuth") === "true");

  // Update state when localStorage changes
  useEffect(() => {
    setIsCompanyLoggedIn(localStorage.getItem("companyAuth") === "true");
  }, [location.pathname]);  // ✅ Re-check on route change

  const hideNavFooter = ["/login", "/register", "/company-login", "/company-signup"].includes(location.pathname);
  const excludeCompanyNavbarOnPages = ["/company/profile"];
  const excludeNavOnPages = ["/company/profile"]; // ✅ Hide both navbars on this page

  const showCompanyNavbar = isCompanyLoggedIn && location.pathname.startsWith("/company") && !excludeCompanyNavbarOnPages.includes(location.pathname);
  const showDefaultNavbar = !hideNavFooter && !showCompanyNavbar && !excludeNavOnPages.includes(location.pathname);

  return (
    <>
      {showDefaultNavbar && <Navbar />}
      {showCompanyNavbar && <CompanyNavbar />}
      
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/companies" element={<Navigate to="/company-login" replace />} />
        <Route path="/company-login" element={<CompanyLogin />} />
        <Route path="/company-signup" element={<CompanySignup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />

        {/* Redirect after Login */}
        <Route 
          path="/company-dashboard" 
          element={isCompanyLoggedIn ? <Navigate to="/company/add-job" replace /> : <Navigate to="/company-login" replace />} 
        />

        {/* Protect Company Pages */}
        <Route path="/company/add-job" element={isCompanyLoggedIn ? <AddJob /> : <Navigate to="/company-login" replace />} />
        <Route path="/company/manage-jobs" element={isCompanyLoggedIn ? <ManageJobs /> : <Navigate to="/company-login" replace />} />
        <Route path="/company/employee-list" element={isCompanyLoggedIn ? <EmployeeList /> : <Navigate to="/company-login" replace />} />
        <Route path="/company/profile" element={isCompanyLoggedIn ? <CompanyProfile setIsCompanyLoggedIn={setIsCompanyLoggedIn} /> : <Navigate to="/company-login" replace />} />
      </Routes>

      {!hideNavFooter && !excludeNavOnPages.includes(location.pathname) && <Footer />}
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
