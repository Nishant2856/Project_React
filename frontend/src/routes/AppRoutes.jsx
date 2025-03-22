import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminNavbar from "../admin/AdminNavbar";  
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
import AdminApplicant from "../admin/AdminApplicant";  
import AdminCompany from "../admin/AdminCompany";  
import AllCompanies from "../pages/AllCompanies"; 
import AllJobs from "../pages/AllJobs";  
import AllJobs2 from "../pages/AllJobs2";  

const AppContent = () => {
  const location = useLocation();
  const [isCompanyLoggedIn, setIsCompanyLoggedIn] = useState(() => {
    return localStorage.getItem("companyAuth") === "true";
  });

  useEffect(() => {
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

  // ✅ Show Admin Navbar for all `/admin/*` pages except `/admin-login`
  const showAdminNavbar = currentPath.startsWith("/admin") && currentPath !== "/admin-login";

  // ✅ Show Company Navbar if logged in and on relevant pages
  const showCompanyNavbar =
    isCompanyLoggedIn &&
    currentPath.startsWith("/company") &&
    !["/company/profile"].includes(currentPath);

  // ✅ Show Default Navbar only if it's not hidden & no other navbar is shown
  const showDefaultNavbar = !hideNavFooter && !showAdminNavbar && !showCompanyNavbar;

  return (
    <>
      {/* ✅ Conditionally Render Navbars */}
      {showDefaultNavbar && <Navbar />}
      {showCompanyNavbar && <CompanyNavbar />}
      {showAdminNavbar && <AdminNavbar />} 

      <Routes>
        {/* General Pages */}
        <Route path="/" element={<Jobs />} />
        <Route path="/companies" element={<Navigate to="/company-login" replace />} />
        <Route path="/company-login" element={<CompanyLogin setIsCompanyLoggedIn={setIsCompanyLoggedIn} />} />
        <Route path="/company-signup" element={<CompanySignup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/all-companies" element={<AllCompanies />} />  
        <Route path="/all-jobs" element={<AllJobs />} />  {/* ✅ Added AllJobs Route */}
        <Route path="/all-jobs-2" element={<AllJobs2 />} />  {/* ✅ Added AllJobs2 Route */}

        {/* ✅ Admin Pages */}
        <Route path="/admin-login" element={<AdminLogin />} /> 
        <Route path="/admin/applicant" element={<AdminApplicant />} /> 
        <Route path="/admin/companies" element={<AdminCompany />} /> 

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
      {!hideNavFooter && !showAdminNavbar && <Footer />}
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
