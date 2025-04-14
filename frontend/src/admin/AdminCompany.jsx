import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const initialCompanies = [
  { name: "Firstsource", logo: "firstsource.gif", rating: 3.7, reviews: "4.5k+", description: "Leading Provider of transformational solutions." },
  { name: "FIS", logo: "fis.gif", rating: 3.9, reviews: "5.5k+", description: "FIS is hiring 3 to 10yrs exp. in C++ & Mumps developer." },
  { name: "Airtel", logo: "airtel.gif", rating: 4.0, reviews: "13.5k+", description: "Leading global telecom company." },
  { name: "Reliance Retail", logo: "reliance.gif", rating: 3.9, reviews: "22.1k+", description: "Building India's largest retail company." },
  { name: "TCS", logo: "tcs.gif", rating: 3.7, reviews: "88.4k+", description: "Explore challenging and exciting opportunities at TCS." },
  { name: "Amazon", logo: "amazon.gif", rating: 4.1, reviews: "29.4k+", description: "World’s largest Internet company." },
  { name: "Apple", logo: "apple.gif", rating: 4.3, reviews: "534+", description: "Join us. Be you." },
  { name: "Jio", logo: "jio.gif", rating: 3.9, reviews: "22.3k+", description: "True 5G is here to unlock the limitless era." },
];

const AdminCompany = () => {
  const [companies, setCompanies] = useState(initialCompanies);

  const handleDelete = (companyName) => {
    setCompanies(companies.filter((company) => company.name !== companyName));
  };

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-8 lg:px-16"> 
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {companies.map((company) => (
          <div
            key={company.name}
            className="bg-white p-6 rounded-xl shadow-xl text-center border border-gray-200"
          >
            <img
              src={`/${company.logo}`}
              alt={company.name}
              className="h-14 mx-auto mb-3"
            />
            <h4 className="text-lg font-semibold">{company.name}</h4>
            <p className="text-sm text-gray-500">⭐ {company.rating} | {company.reviews} reviews</p>
            <p className="text-sm text-gray-600 mt-2">{company.description}</p>
            
            <div className="flex justify-center mt-4 space-x-4">
              <button className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600">
                View Jobs
              </button>
              
              <button
                onClick={() => handleDelete(company.name)}
                className="p-3 rounded-full bg-red-100 hover:bg-red-200 transition shadow-md"
              >
                <FaTrash className="text-red-600 text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCompany;
