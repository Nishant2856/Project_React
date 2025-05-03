import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaInfoCircle, FaSignOutAlt, FaPen, FaGlobe, FaIndustry, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import api from "../services/api";

const CompanyProfile = ({ setIsCompanyLoggedIn }) => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    mobile: "",
    logo: "",
    about: "",
    industry: "",
    size: "",
    location: "",
    website: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch company profile directly from the API
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.get('/companies/me/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        const company = response.data.company;
        
        // Update with full company data
        setCompanyData({
          name: company.name || "Company Name",
          email: company.user?.email || "company@example.com",
          mobile: company.user?.mobile || "Not provided",
          logo: company.logo || "/default-logo.png",
          about: company.description || "No description provided",
          industry: company.industry || "Technology",
          size: company.size || "1-10",
          location: company.location || "Remote",
          website: company.website || "https://example.com"
        });
        
        // Update localStorage with latest company data
        localStorage.setItem("company", JSON.stringify({
          id: company._id,
          name: company.name,
          logo: company.logo,
          user: company.user?._id
        }));
      } else {
        setError("Failed to load company profile");
        // If API call fails, fall back to localStorage
        fallbackToLocalStorage();
      }
    } catch (error) {
      console.error("Error fetching company profile:", error);
      setError("Error loading profile: " + (error.response?.data?.message || error.message));
      // Fall back to localStorage if API call fails
      fallbackToLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const fallbackToLocalStorage = () => {
    const companyString = localStorage.getItem("company");
    if (companyString) {
      try {
        const company = JSON.parse(companyString);
        setCompanyData({
          ...companyData,
          name: company.name || "Company Name",
          logo: company.logo || "/default-logo.png"
        });
      } catch (error) {
        console.error("Error parsing company data:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("companyAuth");
    localStorage.removeItem("company");
    localStorage.removeItem("token");
    setIsCompanyLoggedIn(false);

    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
      {error && (
        <div className="w-full max-w-3xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="w-full flex justify-between items-center p-4 bg-white shadow-md rounded-2xl">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">
            Welcome, <span className="text-black">{companyData.name}</span>
          </h1>
          <img 
            src={companyData.logo && companyData.logo.startsWith('http') ? companyData.logo : `http://localhost:5000/${companyData.logo}`}
            alt="Company Logo" 
            className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-md object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/firstsource.gif"; // Fallback image
            }}
          />
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold flex items-center hover:bg-red-600 ml-auto"
        >
          <FaSignOutAlt className="mr-2" /> Sign Out
        </button>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg mt-12 w-3/4 relative">
        <div className="flex flex-col md:flex-row items-start">
          <div className="mr-8 mb-6 md:mb-0 flex justify-center w-full md:w-auto">
            <img 
              src={companyData.logo && companyData.logo.startsWith('http') ? companyData.logo : `http://localhost:5000/${companyData.logo}`}
              alt="Company Logo" 
              className="h-44 w-44 rounded-full border-4 border-gray-300 shadow-lg object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/firstsource.gif"; // Fallback image
              }}
            />
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{companyData.name}</h2>
            <hr className="my-4 border-gray-300" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="flex items-center text-gray-700">
                  <FaPhone className="mr-3 text-blue-500" /> {companyData.mobile}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-3 text-blue-500" /> {companyData.email}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaGlobe className="mr-3 text-blue-500" /> {companyData.website}
                </p>
              </div>
              
              <div className="space-y-3">
                <p className="flex items-center text-gray-700">
                  <FaIndustry className="mr-3 text-blue-500" /> Industry: {companyData.industry}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaUsers className="mr-3 text-blue-500" /> Company Size: {companyData.size} employees
                </p>
                <p className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-3 text-blue-500" /> Location: {companyData.location}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold flex items-center mb-2">
                <FaInfoCircle className="mr-2 text-blue-500" /> About {companyData.name}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {companyData.about}
              </p>
            </div>
          </div>
        </div>
        
        <FaPen 
          className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl hover:text-blue-500" 
          onClick={() => navigate("/company/profile-update")}
        />
      </div>
    </div>
  );
};

export default CompanyProfile;
