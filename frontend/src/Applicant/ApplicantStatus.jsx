import React from 'react';
import { Link } from 'react-router-dom'; 

const ApplicantStatus = () => {
  const applications = [
    {
      jobTitle: "Senior AR Caller - Experienced",
      logo: "/firstsource.gif",
      date: "Jan 27, 2025",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      jobTitle: "International Chat Process - Non Voice",
      logo: "/firstsource.gif",
      date: "Jan 27, 2025",
      status: "Accepted",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      jobTitle: "Back office Executive",
      logo: "/firstsource.gif",
      date: "Jan 27, 2025",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 pt-8 min-h-screen bg-gray-50 relative">
      {/* Close Button */}
      <Link 
        to="/applicant-profile" 
        className="absolute top-8 right-6 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <svg 
          className="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </Link>

      {/* Header Section */}
      <header className="text-center mb-10 pb-6 border-b border-gray-200 mt-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Application Status</h1>
        <div className="text-gray-600 bg-blue-50 px-6 py-4 rounded-lg text-lg my-6 mx-auto max-w-2xl">
          After acceptance, we sent further process details to your registered email.
        </div>
      </header>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-gray-800 text-white font-semibold p-5">
          <div className="col-span-5 pl-6">Company</div>
          <div className="col-span-4">Job Title</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-2">Status</div>
        </div>

        {/* Table Rows */}
        {applications.map((app, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-12 p-5 items-center ${index !== applications.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div className="col-span-5 pl-6">
              <img 
                src={app.logo} 
                alt="Company logo" 
                className="h-10 w-10 object-contain inline-block mr-3"
              />
              <span className="font-medium text-gray-800 align-middle">Firstsource</span>
            </div>
            <div className="col-span-4 font-medium text-gray-800">{app.jobTitle}</div>
            <div className="col-span-1 text-gray-500">{app.date}</div>
            <div className="col-span-2">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${app.statusColor}`}>
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-sm text-gray-500 mb-12">
        <p className="text-center">Note: Please check your email regularly for updates on your application status.</p>
      </div>
    </div>
  );
};

export default ApplicantStatus;