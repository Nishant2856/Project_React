import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AllJobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const companyName = searchParams.get("company");
    
    fetchData(companyName);
  }, [location.search]);

  const fetchData = async (companyName) => {
    setLoading(true);
    setError(null);
    
    try {
      if (companyName) {
        // Fetch all companies first
        const companyResponse = await axios.get(`http://localhost:5000/api/companies`);
        const allCompanies = companyResponse.data.companies;
        
        // Find the company by name
        const foundCompany = allCompanies.find(c => c.name.toLowerCase() === companyName.toLowerCase());
        
        if (foundCompany) {
          setCompany(foundCompany);
          
          // Fetch jobs for this company
          const jobsResponse = await axios.get(`http://localhost:5000/api/company-jobs`);
          const allJobs = jobsResponse.data.data;
          
          // Filter jobs for this company
          const companyJobs = allJobs.filter(job => job.company._id === foundCompany._id);
          setJobs(companyJobs);
        } else {
          setError("Company not found");
        }
      } else {
        // Fetch all jobs
        const jobsResponse = await axios.get(`http://localhost:5000/api/company-jobs`);
        setJobs(jobsResponse.data.data);
        
        // Set default company from the first job if available
        if (jobsResponse.data.data.length > 0) {
          const firstJobCompanyId = jobsResponse.data.data[0].company._id;
          
          // Fetch detailed company info
          const companyResponse = await axios.get(`http://localhost:5000/api/companies/${firstJobCompanyId}`);
          setCompany(companyResponse.data.company);
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load jobs data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-blue-50 min-h-screen p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-blue-50 min-h-screen p-6 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate("/all-jobs")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  if (!company || jobs.length === 0) {
    return (
      <div className="bg-blue-50 min-h-screen p-6 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">No Jobs Found</h2>
          <p>There are no jobs available at the moment.</p>
          <button 
            onClick={() => navigate("/all-jobs")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      {/* Background Section with Image */}
      <div className="relative w-full h-48 bg-gray-900 text-white overflow-hidden rounded-xl">
        <img 
          src="/show.jpg" 
          alt="Jobs Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Company Card */}
      <div className="relative bg-white shadow-lg rounded-lg -mt-16 p-6 max-w-6xl mx-auto flex items-center">
        <img
          src={company.logo ? (company.logo.startsWith('http') ? company.logo : `http://localhost:5000/${company.logo}`) : "/default-logo.png"}
          alt={company.name}
          className="w-20 h-20 rounded-full shadow-md border-2 border-gray-200 mr-4 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-logo.png";
          }}
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
          <p className="text-yellow-600 text-sm">⭐ {company.rating || "New"}</p>
          <p className="text-gray-600 text-sm">{company.industry || company.tagline}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-4">Jobs {jobs.length > 0 ? `(${jobs.length})` : ""}</h3>
          {jobs.map((job) => (
            <div
              key={job._id}
              className="relative bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition"
            >
              <h4 className="text-lg font-semibold">{job.title}</h4>
              <p className="text-gray-600">
                {job.company?.name || company.name} {company.rating && <span>⭐ {company.rating}</span>}
              </p>
              <p className="text-sm text-gray-500">📍 {job.location}</p>
              <p className="text-sm text-gray-500">
                💼 {job.years ? `${job.years} Yrs` : "Not specified"} | 
                💰 {job.salary || "Not disclosed"}
              </p>
              
              <div className="flex flex-wrap mt-2">
                {job.tags && job.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* New indicator based on creation date */}
              {job.createdAt && new Date(job.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                <span className="text-red-500 text-xs font-semibold">New</span>
              )}
              
              {/* View Details Button */}
              <div className="absolute bottom-3 right-3">
                <button
                  onClick={() => navigate(`/all-jobs-2?jobId=${job._id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* About Company Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="text-sm text-gray-600">
            {company.description || "No description available."}
          </p>
          <h3 className="text-lg font-semibold mt-4">More Information</h3>
          <ul className="text-sm text-gray-600">
            <li>
              <strong>Industry:</strong> {company.industry || company.companyType || "Not specified"}
            </li>
            <li>
              <strong>Company Size:</strong> {company.size || "Not specified"}
            </li>
            <li>
              <strong>Location:</strong> {company.location || company.headquarters || "Not specified"}
            </li>
            {company.website && (
              <li>
                <strong>Website:</strong>{" "}
                <a href={company.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  Visit
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
