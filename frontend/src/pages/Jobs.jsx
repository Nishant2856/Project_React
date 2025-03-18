import React from "react";

const Jobs = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen p-8 flex flex-col items-center">
      {/* Title & Subtitle */}
      <h2 className="text-4xl font-extrabold text-gray-900 text-center">
        Find Your Dream Job Now
      </h2>
      <p className="text-lg text-gray-700 mt-2 text-center">
        5 Lakh+ jobs waiting for you!
      </p>

      {/* Search Bar */}
      <div className="mt-8 flex w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Enter skills, designation, or company name..."
          className="p-3 w-2/3 border-none outline-none text-gray-700"
        />
        <button className="w-1/3 bg-blue-500 text-white text-lg font-semibold px-6 py-3 hover:bg-blue-600 transition duration-300">
          🔍 Search
        </button>
      </div>

      {/* Job Category Tags */}
      <div className="mt-10 flex flex-wrap justify-center gap-6">
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
      className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full shadow-lg text-lg font-semibold cursor-pointer hover:bg-gray-300 transition duration-300"
    >
      {tag}
    </span>
  ))}
</div>


      {/* Featured Companies Section */}
      <div className="mt-10 bg-blue-50 py-10 px-8 lg:px-16 w-full">
        <h3 className="text-2xl font-semibold text-center">
          Featured companies actively hiring
        </h3>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6">
          {[
            { name: "Firstsource", logo: "firstsource.gif", rating: 3.7, reviews: "4.5k+", description: "Leading Provider of transformational solutions." },
            { name: "FIS", logo: "fis.gif", rating: 3.9, reviews: "5.5k+", description: "FIS is hiring 3 to 10yrs exp. in C++ & Mumps developer." },
            { name: "Airtel", logo: "airtel.gif", rating: 4.0, reviews: "13.5k+", description: "Leading global telecom company." },
            { name: "Reliance Retail", logo: "reliance.gif", rating: 3.9, reviews: "22.1k+", description: "Building India's largest retail company." },
            { name: "TCS", logo: "tcs.gif", rating: 3.7, reviews: "88.4k+", description: "Explore challenging and exciting opportunities at TCS." },
            { name: "Amazon", logo: "amazon.gif", rating: 4.1, reviews: "29.4k+", description: "World’s largest Internet company." },
            { name: "Apple", logo: "apple.gif", rating: 4.3, reviews: "534+", description: "Join us. Be you." },
            { name: "Jio", logo: "jio.gif", rating: 3.9, reviews: "22.3k+", description: "True 5G is here to unlock the limitless era." },
          ].map((company) => (
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
              <p className="text-sm text-gray-500">
                ⭐ {company.rating} | {company.reviews} reviews
              </p>
              <p className="text-sm text-gray-600 mt-2">{company.description}</p>
              <button className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600">
                View Jobs
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-600">
            View all companies
          </button>
        </div>
      </div>

     {/* Job Roles Section */}
<div className="relative mt-12 flex flex-col md:flex-row items-center bg-gray-100 p-8 rounded-xl shadow-lg w-full max-w-5xl mx-auto">
  {/* Image Placeholder */}
  <img 
    src="/home1.jpeg" 
    alt="Job Roles" 
    className="w-56 h-40 rounded-lg object-cover md:mr-6 shadow-md"
  />
  
  {/* Text Content */}
  <div className="text-left md:flex-1">
    <h3 className="text-2xl font-semibold text-gray-800">
      Discover Jobs Across Popular Roles
    </h3>
    <p className="text-gray-600 text-lg mt-2">
      Select a role and we'll show you relevant jobs for it!
    </p>
  </div>
</div>

{/* Job Role List (Overlapping Effect) */}
<div className="relative -mt-10 bg-white p-8 rounded-xl shadow-xl max-w-5xl w-full mx-auto z-10">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[
      { role: "Full Stack Developer", jobs: "20.2K+ jobs" },
      { role: "Front End Developer", jobs: "5.2K+ jobs" },
      { role: "Mobile / App Developer", jobs: "3.1K+ jobs" },
      { role: "DevOps Engineer", jobs: "3K+ jobs" },
      { role: "Engineering Manager", jobs: "1.5K+ jobs" },
      { role: "Technical Lead", jobs: "10.1K+ jobs" },
    ].map((job) => (
      <div 
        key={job.role} 
        className="border border-gray-300 p-6 rounded-lg text-center shadow-lg bg-gray-50 hover:bg-gray-100 transition duration-300 transform hover:scale-105"
      >
        <h4 className="text-lg font-semibold text-gray-800">{job.role}</h4>
        <p className="text-md text-gray-600 mt-1">{job.jobs} ›</p>
      </div>
    ))}
  </div>
</div>

{/* Call to Action Section */}
<div className="mt-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-xl text-center w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
  {/* Image Placeholder */}
  <img 
    src="/home2.jpeg" 
    alt="Future Jobs" 
    className="w-56 h-40 rounded-lg object-cover shadow-lg"
  />

  {/* Text & Button */}
  <div className="text-center md:text-left md:ml-6">
    <h3 className="text-2xl font-semibold">Create A Better Future For Yourself</h3>
    <button className="mt-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-gray-800 transition duration-300">
      🔍 Search Jobs
    </button>
  </div>
</div>



    </div>
  );
};

export default Jobs;
