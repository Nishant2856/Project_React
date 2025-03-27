import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminNavbar from "../admin/AdminNavbar";  
import ApplicantNavbar from "../Applicant/ApplicantNavbar";
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
import AJob from "../Applicant/AJob";  
import AAllCompanies from "../Applicant/AAllCompanies";
import AAllJobs from "../Applicant/AAlljobs";
import AAllJobs2 from "../Applicant/AAllJobs2";
import ApplicantProfile from "../Applicant/ApplicantProfile";

const AppContent = () => {
  const location = useLocation();
  const [isCompanyLoggedIn, setIsCompanyLoggedIn] = useState(() => {
    return localStorage.getItem("companyAuth") === "true";
  });
  const [isApplicantLoggedIn, setIsApplicantLoggedIn] = useState(() => {
    return localStorage.getItem("applicantAuth") === "true";
  });

  useEffect(() => {
    const companyAuthStatus = localStorage.getItem("companyAuth") === "true";
    const applicantAuthStatus = localStorage.getItem("applicantAuth") === "true";
    setIsCompanyLoggedIn(companyAuthStatus);
    setIsApplicantLoggedIn(applicantAuthStatus);
  }, [location]);

  const currentPath = location.pathname;

  // List of paths where NO navbar should show (excluding the specific pages we want it on)
  const noNavbarPaths = [
    '/login',
    '/register',
    '/company-login',
    '/company-signup',
    '/admin-login',
    '/company/profile',
    '/applicant-profile'
  ];

  // List of paths where we specifically WANT the default Navbar
  const defaultNavbarPaths = [
    '/all-companies',
    '/all-jobs',
    '/all-jobs-2'
  ];

  // List of paths where NO footer should show
  const noFooterPaths = [
    ...noNavbarPaths,
    '/admin'
  ];

  // Show Admin Navbar only for admin routes (except login)
  const showAdminNavbar = currentPath.startsWith('/admin') && !noNavbarPaths.includes(currentPath);

  // Show Company Navbar for company routes (except excluded paths)
  const showCompanyNavbar = 
    isCompanyLoggedIn && 
    currentPath.startsWith('/company') && 
    !noNavbarPaths.includes(currentPath);

  // Show Applicant Navbar for applicant routes (except profile page)
  const showApplicantNavbar = isApplicantLoggedIn && 
    currentPath.startsWith('/a') && 
    !noNavbarPaths.includes(currentPath);

  // Show Default Navbar only on specific paths or when none of the above apply
  const showDefaultNavbar = 
    defaultNavbarPaths.includes(currentPath) || (
      !noNavbarPaths.includes(currentPath) &&
      !currentPath.startsWith('/admin') &&
      !currentPath.startsWith('/company') &&
      !currentPath.startsWith('/a') &&
      !currentPath.startsWith('/applicant-profile')
    );

  return (
    <>
      {/* Conditionally Render Navbars */}
      {showDefaultNavbar && <Navbar />}
      {showCompanyNavbar && <CompanyNavbar />}
      {showAdminNavbar && <AdminNavbar />}
      {showApplicantNavbar && <ApplicantNavbar />}

      <Routes>
        {/* General Pages */}
        <Route path="/" element={<Jobs />} />
        <Route path="/companies" element={<Navigate to="/company-login" replace />} />
        <Route path="/company-login" element={<CompanyLogin setIsCompanyLoggedIn={setIsCompanyLoggedIn} />} />
        <Route path="/company-signup" element={<CompanySignup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin setIsApplicantLoggedIn={setIsApplicantLoggedIn} />} />
        <Route path="/all-companies" element={<AllCompanies />} />  
        <Route path="/all-jobs" element={<AllJobs />} />
        <Route path="/all-jobs-2" element={<AllJobs2 />} />
        
        {/* Protected Applicant Routes */}
        <Route 
          path="/ajob" 
          element={isApplicantLoggedIn ? <AJob /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/aall-companies" 
          element={isApplicantLoggedIn ? <AAllCompanies /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/aall-jobs" 
          element={isApplicantLoggedIn ? <AAllJobs /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/aall-jobs-2" 
          element={isApplicantLoggedIn ? <AAllJobs2 /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/applicant-profile" 
          element={isApplicantLoggedIn ? <ApplicantProfile setIsApplicantLoggedIn={setIsApplicantLoggedIn} /> : <Navigate to="/login" replace />} 
        />

        {/* Admin Pages */}
        <Route path="/admin-login" element={<AdminLogin />} /> 
        <Route path="/admin/applicant" element={<AdminApplicant />} /> 
        <Route path="/admin/companies" element={<AdminCompany />} /> 

        {/* Protect Company Pages */}
        <Route path="/company/add-job" element={isCompanyLoggedIn ? <AddJob /> : <Navigate to="/company-login" replace />} />
        <Route path="/company/manage-jobs" element={isCompanyLoggedIn ? <ManageJobs /> : <Navigate to="/company-login" replace />} />
        <Route path="/company/employee-list" element={isCompanyLoggedIn ? <EmployeeList /> : <Navigate to="/company-login" replace />} />
        <Route 
          path="/company/profile" 
          element={isCompanyLoggedIn ? <CompanyProfile setIsCompanyLoggedIn={setIsCompanyLoggedIn} /> : <Navigate to="/company-login" replace />} 
        />
        <Route path="/company/update-job/:jobId" element={isCompanyLoggedIn ? <CompanyUpdateJob /> : <Navigate to="/company-login" replace />} />
      </Routes>

      {/* Conditionally Render Footer */}
      {!noFooterPaths.includes(currentPath) && !currentPath.startsWith('/admin') && <Footer />}
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