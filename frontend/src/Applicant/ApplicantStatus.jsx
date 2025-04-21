import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import applicationService from '../services/applicationService';
import { format } from 'date-fns';

const ApplicantStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await applicationService.getMyApplications();
        setApplications(response.applications || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err.message || "Failed to load applications");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Helper function to determine status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format the date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md my-6 text-center">
          {error}. Please try again later.
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && applications.length === 0 && (
        <div className="text-center py-10">
          <div className="text-gray-500 mb-4 text-xl">You haven't applied to any jobs yet.</div>
          <Link to="/aall-jobs-2">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
              Browse Jobs
            </button>
          </Link>
        </div>
      )}

      {/* Applications Table */}
      {!loading && !error && applications.length > 0 && (
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
              key={app._id} 
              className={`grid grid-cols-12 p-5 items-center ${index !== applications.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="col-span-5 pl-6">
                <img 
                  src={app.job?.company?.logo 
                    ? app.job.company.logo.startsWith('http') 
                      ? app.job.company.logo 
                      : app.job.company.logo.startsWith('uploads') 
                        ? `http://localhost:5000/${app.job.company.logo}` 
                        : "/default-company.png"
                    : "/default-company.png"} 
                  alt="Company logo" 
                  className="h-10 w-10 object-contain inline-block mr-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-company.png";
                  }}
                />
                <span className="font-medium text-gray-800 align-middle">
                  {app.job?.company?.name || "Unknown Company"}
                </span>
              </div>
              <div className="col-span-4 font-medium text-gray-800">{app.job?.title || "Unknown Position"}</div>
              <div className="col-span-1 text-gray-500">{formatDate(app.createdAt)}</div>
              <div className="col-span-2">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-6 text-sm text-gray-500 mb-12">
        <p className="text-center">Note: Please check your email regularly for updates on your application status.</p>
      </div>
    </div>
  );
};

export default ApplicantStatus;