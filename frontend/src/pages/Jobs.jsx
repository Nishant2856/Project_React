import React from "react";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen p-8 flex flex-col items-center">
      {/* Title & Subtitle */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Find Your Dream Job Now
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          5 Lakh+ jobs waiting for you!
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-16 w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <input
          type="text"
          placeholder="Enter skills, designation, or company name..."
          className="p-4 w-2/3 border-none outline-none text-gray-700 text-lg"
        />
        <button className="w-1/3 bg-blue-600 text-white text-lg font-semibold px-6 py-4 hover:bg-blue-700 transition duration-300">
          🔍 Search
        </button>
      </div>

      {/* Job Category Tags */}
      <div className="mb-20 flex flex-wrap justify-center gap-4">
        {[
          "Remote",
          "MNC",
          "Analytics",
          "Data Science",
          "Engineering",
          "HR",
          "Marketing",
          "Project Manager",
        ].map((tag) => (
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {[
              { name: "Firstsource", logo: "firstsource.gif", rating: 3.7, reviews: "4.5k+", description: "Leading Provider of transformational solutions." },
              { name: "FIS", logo: "fis.gif", rating: 3.9, reviews: "5.5k+", description: "FIS is hiring 3 to 10yrs exp. in C++ & Mumps developer." },
              { name: "Airtel", logo: "airtel.gif", rating: 4.0, reviews: "13.5k+", description: "Leading global telecom company." },
              { name: "Reliance Retail", logo: "reliance.gif", rating: 3.9, reviews: "22.1k+", description: "Building India's largest retail company." },
              { name: "TCS", logo: "tcs.gif", rating: 3.7, reviews: "88.4k+", description: "Explore challenging and exciting opportunities at TCS." },
              { name: "Amazon", logo: "amazon.gif", rating: 4.1, reviews: "29.4k+", description: "World's largest Internet company." },
              { name: "Apple", logo: "apple.gif", rating: 4.3, reviews: "534+", description: "Join us. Be you." },
              { name: "Jio", logo: "jio.gif", rating: 3.9, reviews: "22.3k+", description: "True 5G is here to unlock the limitless era." },
            ].map((company) => (
              <div 
                key={company.name} 
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 transition-all duration-300 transform"
              >
                <div className="flex justify-center mb-4">
                  <img 
                    src={`/${company.logo}`} 
                    alt={company.name} 
                    className="h-16 object-contain transition-all duration-300 hover:scale-110" 
                  />
                </div>
                <h4 className="text-xl font-semibold text-center mb-2">{company.name}</h4>
                <p className="text-sm text-gray-500 text-center mb-3">⭐ {company.rating} | {company.reviews} reviews</p>
                <p className="text-sm text-gray-600 text-center mb-4">{company.description}</p>
                <div className="flex justify-center">
                  <button 
                    className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={() => navigate("/all-jobs")}
                  >
                    View Jobs
                  </button>
                </div>
              </div>
            ))}
          </div>

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