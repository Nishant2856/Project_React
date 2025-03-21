import React from "react";
import { useNavigate } from "react-router-dom";

const AllCompanies = () => {
  const navigate = useNavigate();

  const companies = [
    {
      name: "Firstsource",
      rating: "3.7",
      reviews: "4.5k+",
      description: "Leading Provider of transformational solutions.",
      logo: "/firstsource.gif",
    },
    {
      name: "FIS",
      rating: "3.9",
      reviews: "5.5k+",
      description: "Hiring developers in C++ & Mumps.",
      logo: "/fis.gif",
    },
    {
      name: "Airtel",
      rating: "4.0",
      reviews: "13.5k+",
      description: "Leading global telecom company.",
      logo: "/airtel.gif",
    },
    {
      name: "Tata Consultancy Services",
      rating: "3.7",
      reviews: "88.4k+",
      description: "Exciting opportunities at TCS.",
      logo: "/tcs.gif",
    },
    {
      name: "Amazon",
      rating: "4.1",
      reviews: "24.9k+",
      description: "World’s largest Internet company.",
      logo: "/amazon.gif",
    },
    {
      name: "Apple",
      rating: "4.3",
      reviews: "534",
      description: "Join us. Be you.",
      logo: "apple.gif",
    },
    {
      name: "Avalara Technologies",
      rating: "3.5",
      reviews: "273",
      description: "We’re transforming tax through tech.",
      logo: "/avalara.gif",
    },
    {
      name: "Cardinal Health",
      rating: "4.7",
      reviews: "148",
      description: "Leading Provider of transformational solutions.",
      logo: "/cardinal.jpg",
    },
    {
      name: "Navi Technologies",
      rating: "4.3",
      reviews: "2.2k+",
      description: "Fastest growing financial services company in India.",
      logo: "/navi.gif",
    },
    {
      name: "Nagararoo",
      rating: "4.0",
      reviews: "4.1k+",
      description: "Leader in digital product engineering.",
      logo: "/nagaroo.gif",
    },
  ];

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Featured companies actively hiring
      </h2>
      <div className="flex gap-6 max-w-6xl mx-auto">
        {/* Sidebar Filters */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">All Filters</h3>
          <div className="mb-4">
            <h4 className="font-semibold">Sector</h4>
            {["IT Services", "Customer, Retail & Hospitality", "BFSI", "Technology", "BPM"].map((sector) => (
              <div key={sector} className="flex items-center space-x-2">
                <input type="checkbox" id={sector} className="cursor-pointer" />
                <label htmlFor={sector} className="text-sm cursor-pointer">
                  {sector}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Industry</h4>
            {["IT Services & Consulting", "Financial Services", "Telecom / ISP", "Internet", "Software Product", "Fintech / Payment"].map((industry) => (
              <div key={industry} className="flex items-center space-x-2">
                <input type="checkbox" id={industry} className="cursor-pointer" />
                <label htmlFor={industry} className="text-sm cursor-pointer">
                  {industry}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Company Cards Section */}
        <div className="w-3/4 grid grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.name}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition transform hover:scale-105"
            >
              <img src={company.logo} alt={`${company.name} logo`} className="w-16 h-16 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-gray-800">{company.name}</h4>
              <p className="text-yellow-600 font-semibold">⭐ {company.rating} | {company.reviews} reviews</p>
              <p className="text-sm text-gray-600 mt-2">{company.description}</p>
              <button
                onClick={() => navigate(`/all-jobs?company=${encodeURIComponent(company.name)}`)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                View Jobs
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCompanies;