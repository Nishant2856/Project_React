import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AAllCompanies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch registered companies from API
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await api.get('/companies');
        if (response.data.success) {
          setCompanies(response.data.companies);
        } else {
          setError("Failed to fetch companies");
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Error loading companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Banner Section */}
      <div className="bg-blue-700 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Browse Companies</h1>
          <p className="text-xl">Discover great places to work</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center text-gray-500 p-4">
            No companies found. Be the first to register your company!
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Company Counter */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Available Companies</h2>
              <p className="text-gray-600">{companies.length} companies in our database</p>
            </div>

            {/* Company Cards Section */}
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div
                  key={company._id}
                  className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition transform hover:scale-105"
                >
                  <img 
                    src={company.logo && company.logo.startsWith('http') 
                      ? company.logo 
                      : `http://localhost:5000/${company.logo}`} 
                    alt={`${company.name} logo`} 
                    className="w-16 h-16 mx-auto mb-3 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-logo.png";
                    }}
                  />
                  <h4 className="text-lg font-semibold text-gray-800">{company.name}</h4>
                  <p className="text-yellow-600 font-semibold">⭐ 4.0 | New</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {company.description.length > 100 
                      ? company.description.substring(0, 100) + "..." 
                      : company.description}
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-1 mb-1">
                      {company.industry}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-1 mb-1">
                      {company.location}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/aall-jobs?company=${encodeURIComponent(company.name)}`)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    View Jobs
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AAllCompanies;
