import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [companyLogo, setCompanyLogo] = useState("/firstsource.gif"); // Default logo

  useEffect(() => {
    // Get company data from localStorage including the logo
    const companyString = localStorage.getItem("company");
    if (companyString) {
      try {
        const company = JSON.parse(companyString);
        if (company.logo) {
          setCompanyLogo(company.logo.startsWith("http") ? company.logo : `http://localhost:5000/${company.logo}`);
        }
      } catch (error) {
        console.error("Error parsing company data:", error);
      }
    }
    
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("You must be logged in to view your jobs");
        setLoading(false);
        return;
      }
      
      const response = await axios.get("http://localhost:5000/api/company-jobs/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setJobs(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.response?.data?.message || "Error fetching jobs");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      
      await axios.delete(`http://localhost:5000/api/company-jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Remove the deleted job from state
      setJobs(jobs.filter(job => job._id !== id));
      alert("Job deleted successfully");
    } catch (err) {
      console.error("Error deleting job:", err);
      alert(err.response?.data?.message || "Error deleting job");
    }
  };

  const toggleJobStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.put(`http://localhost:5000/api/company-jobs/${id}`, 
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      // Update job status in state
      setJobs(jobs.map(job => 
        job._id === id ? { ...job, isActive: !job.isActive } : job
      ));
    } catch (err) {
      console.error("Error updating job status:", err);
      alert(err.response?.data?.message || "Error updating job status");
    }
  };

  if (loading) {
    return (
      <div className="bg-blue-50 min-h-screen p-6 flex justify-center items-center">
        <div className="text-xl font-semibold">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {jobs.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No jobs found</h2>
            <p className="mb-4">You haven't posted any jobs yet.</p>
            <Link 
              to="/company/add-job" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600"
            >
              + Add New Job
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Your Jobs</h2>
              <Link 
                to="/company/add-job" 
                className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600"
              >
                + Add New Job
              </Link>
            </div>
            
            {/* Table Header */}
            <div className="grid grid-cols-6 bg-white shadow-md rounded-lg p-4 font-semibold text-gray-700 text-center">
              <div>Logo</div>
              <div>Job Title</div>
              <div>Date</div>
              <div>Visibility</div>
              <div>Update</div>
              <div>Delete</div>
            </div>

            {/* Job List */}
            {jobs.map((job) => (
              <div
                key={job._id}
                className="grid grid-cols-6 bg-white shadow-md rounded-lg p-4 mt-3 items-center text-center"
              >
                {/* Job Logo */}
                <div className="flex justify-center">
                  <img src={companyLogo} alt="Company Logo" className="h-10 w-10 object-cover rounded-full" />
                </div>

                {/* Job Title */}
                <div className="font-semibold">{job.title}</div>

                {/* Date */}
                <div className="text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString()}
                </div>

                {/* Visibility Toggle */}
                <div className="flex justify-center">
                  <button 
                    onClick={() => toggleJobStatus(job._id, job.isActive)}
                    className={`h-8 w-8 ${job.isActive ? 'bg-blue-500' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center shadow-md`}
                  >
                    {job.isActive ? '✔' : '✕'}
                  </button>
                </div>

                {/* Update Button with Link */}
                <Link to={`/company/update-job/${job._id}`}>
                  <button className="bg-blue-500 text-white px-2 py-2 rounded-md font-semibold hover:bg-blue-600 w-25 mx-15">
                    UPDATE
                  </button>
                </Link>

                {/* Delete Button */}
                <button 
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-2 py-2 rounded-md font-semibold hover:bg-red-600 w-25 mx-15"
                >
                  DELETE
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
