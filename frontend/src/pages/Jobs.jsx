import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Jobs = () => {
  const navigate = useNavigate();
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch registered companies from API for the featured section
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await api.get('/companies');
        if (response.data.success) {
          // Limit to 8 companies
          setFeaturedCompanies(response.data.companies.slice(0, 8));
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const popularTags = [
    "All Jobs",
    "Work from Home",
    "MNC",
    "Sales",
    "Fresher",
    "Engineering",
    "Data Science",
    "Software Developer",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50">
      {/* Hero Section */}
      <div className="w-full bg-blue-50 py-20 mb-16">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl font-bold text-black text-center px-4">
            Discover Your Dream Job Today
          </h1>
          <p className="text-blue-700 text-xl mt-6 text-center px-4 max-w-4xl">
            Find jobs, career guidance, and the perfect role for your skills and experience
          </p>
          
          {/* Search Bar */}
          <div className="mt-12 w-full max-w-4xl flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 px-4">
            <input
              type="text"
              placeholder="Job title, company, or keywords"
              className="flex-1 px-6 py-4 rounded-lg shadow-lg text-lg"
            />
            <button className="bg-blue-900 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-950 transition duration-300">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Popular Tags Section */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-16 w-full max-w-6xl px-4">
        {popularTags.map((tag) => (
          <span
            key={tag}
            className="bg-white text-gray-800 px-6 py-3 rounded-full shadow-md text-lg font-semibold cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Featured Companies Section */}
      <div className="mb-24 w-full">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold text-center mb-12">
            Featured companies actively hiring
          </h3>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
            </div>
          ) : featuredCompanies.length === 0 ? (
            <p className="text-center text-gray-500">No companies found yet. Be the first to register!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {featuredCompanies.map((company) => (
                <div 
                  key={company._id} 
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-300 transform"
                >
                  <div className="flex justify-center mb-4">
                    <img 
                      src={company.logo && company.logo.startsWith('http') 
                        ? company.logo 
                        : `http://localhost:5000/${company.logo}`}
                      alt={company.name} 
                      className="h-16 object-contain transition-all duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-logo.png";
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-center mb-2">{company.name}</h4>
                  <p className="text-sm text-gray-500 text-center mb-3">⭐ 4.0 | New</p>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    {company.description.length > 80 
                      ? company.description.substring(0, 80) + "..." 
                      : company.description}
                  </p>
                  <div className="flex justify-center">
                    <button 
                      className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                      onClick={() => navigate(`/all-jobs?company=${encodeURIComponent(company.name)}`)}
                    >
                      View Jobs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Button to navigate to AllCompanies */}
          <div className="text-center mt-16">
            <button
              className="bg-blue-600 text-white px-10 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 text-lg font-medium"
              onClick={() => navigate("/all-companies")}
            >
              View all companies →
            </button>
          </div>
        </div>
      </div>

      {/* Job Roles Section */}
      <div className="mb-24 w-full max-w-6xl mx-auto">
        <div className="relative flex flex-col md:flex-row items-center bg-white p-10 rounded-xl shadow-xl border border-gray-200">
          <img 
            src="/home1.jpeg" 
            alt="Job Roles" 
            className="w-64 h-48 rounded-lg object-cover md:mr-10 shadow-lg transition-all duration-300 hover:scale-105" 
          />
          <div className="text-left md:flex-1 mt-6 md:mt-0">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Discover Jobs Across Popular Roles
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Select a role and we'll show you relevant jobs for it!
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Browse Job Roles
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="w-full max-w-6xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-10 rounded-xl shadow-2xl flex flex-col md:flex-row items-center justify-between">
          <img 
            src="/home2.jpeg" 
            alt="Future Jobs" 
            className="w-64 h-48 rounded-lg object-cover shadow-lg mb-6 md:mb-0 transition-all duration-300 hover:scale-105" 
          />
          <div className="text-center md:text-left md:ml-10">
            <h3 className="text-3xl font-semibold mb-4">Create A Better Future For Yourself</h3>
            <button className="bg-white text-blue-600 px-10 py-3 rounded-lg shadow-lg text-lg font-medium hover:bg-gray-100 transition duration-300">
              🔍 Search Jobs Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;