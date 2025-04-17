import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AAllJobs2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [applicationStatus, setApplicationStatus] = useState("not_applied");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [job, setJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicantId, setApplicantId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get applicant ID and token from localStorage
    const userStr = localStorage.getItem('user');
    const tokenStr = localStorage.getItem('token');
    const isApplicant = localStorage.getItem('applicantAuth') === 'true';
    
    if (userStr && tokenStr && isApplicant) {
      const user = JSON.parse(userStr);
      setApplicantId(user._id);
      setToken(tokenStr);
    }
    
    fetchJobData();
  }, [location.search]);

  const fetchJobData = async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams(location.search);
      const jobId = searchParams.get("jobId");

      if (!jobId) {
        setError("No job ID provided");
        setLoading(false);
        return;
      }

      console.log("Fetching job data for ID:", jobId);

      // Fetch job data using company-jobs endpoint
      const jobResponse = await axios.get(`http://localhost:5000/api/company-jobs/details/${jobId}`);
      
      console.log("Job API response:", jobResponse.data);
      
      if (jobResponse.data && jobResponse.data.success) {
        setJob(jobResponse.data.data);
      } else {
        setError("Job not found");
        setLoading(false);
        return;
      }

      // Check if the applicant has already applied for this job
      const userStr = localStorage.getItem('user');
      const tokenStr = localStorage.getItem('token');
      const isApplicant = localStorage.getItem('applicantAuth') === 'true';
      
      if (userStr && tokenStr && isApplicant) {
        try {
          const user = JSON.parse(userStr);
          
          console.log("Checking application status for user:", user._id, "and job:", jobId);
          
          const applicationResponse = await axios.get(
            `http://localhost:5000/api/applications/check/${user._id}/${jobId}`,
            { 
              headers: {
                Authorization: `Bearer ${tokenStr}`
              }
            }
          );
          
          console.log("Application check response:", applicationResponse.data);
          
          if (applicationResponse.data.hasApplied) {
            setApplicationStatus("applied");
          }
        } catch (err) {
          console.error("Error checking application status:", err);
          // Don't set error state here, as we want to show the job anyway
        }
      }
    } catch (err) {
      console.error("Error fetching job data:", err);
      setError("Failed to load job data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleApplicationStatus = async () => {
    // Check if user is authenticated as applicant
    const isApplicant = localStorage.getItem('applicantAuth') === 'true';
    const userStr = localStorage.getItem('user');
    const tokenStr = localStorage.getItem('token');
    
    // If not logged in as applicant, redirect to login
    if (!isApplicant || !userStr || !tokenStr) {
      navigate('/login');
      return;
    }

    // If already applied, don't do anything
    if (applicationStatus === "applied") {
      return;
    }

    setIsSubmitting(true);
    try {
      const user = JSON.parse(userStr);
      
      // Check user role first
      try {
        const roleCheckResponse = await axios.get(
          'http://localhost:5000/api/applications/debug-role',
          {
            headers: {
              Authorization: `Bearer ${tokenStr}`
            }
          }
        );
        
        console.log('User role check:', roleCheckResponse.data);
        
        if (roleCheckResponse.data.user.role !== 'user') {
          alert(`You are logged in as '${roleCheckResponse.data.user.role}', but need to be logged in as 'user' to apply for jobs.`);
          setIsSubmitting(false);
          return;
        }
      } catch (roleErr) {
        console.error("Error checking user role:", roleErr);
        // Continue with the application attempt even if role check fails
      }
      
      console.log("Sending application data:", {
        jobId: job._id,
        company: job.company._id
      });
      
      // Submit application to the server
      const response = await axios.post(
        'http://localhost:5000/api/applications/apply',
        {
          jobId: job._id,
          company: job.company._id
        },
        {
          headers: {
            Authorization: `Bearer ${tokenStr}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Application response:", response.data);

      if (response.data && response.data.success) {
        // Update local state to reflect the application
        setApplicationStatus("applied");
        
        // Show success message
        alert("Application submitted successfully!");
        
        // Store application success in localStorage to prevent issues with page reloads
        localStorage.setItem('applicationSubmitted', 'true');
        localStorage.setItem('applicantAuth', 'true');
        
        // No navigation to status page - just show "Applied"
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      
      if (err.response) {
        console.error("Error response:", err.response.data);
      }
      
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Failed to submit application: ${err.response.data.message}`);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-blue-50 min-h-screen w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-blue-50 min-h-screen w-full flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-6">{error || "Job not found"}</p>
          <button 
            onClick={() => navigate("/ajob")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  // Get company data from the job
  const company = job.company || {};

  return (
    <div className="bg-blue-50 min-h-screen w-full flex justify-center">
      <div className="p-6 w-full max-w-7xl"> 
        {/* Banner Section */}
        <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg">
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-800"></div>
        </div>  

        {/* Job Card */}
        <div className="mt-6 bg-white shadow-lg rounded-xl p-10 w-full">
          {/* Job Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <p className="text-gray-600 flex items-center">
                {company.name} {company.rating && <span>⭐ {company.rating}</span>}
              </p>
            </div>
            <img 
              src={company.logo ? `http://localhost:5000/${company.logo}` : "/default-logo.png"}
              alt="Company Logo" 
              className="w-14 h-14 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-logo.png";
              }}
            />
          </div>

          {/* Job Details */}
          <div className="mt-4 text-gray-600 text-lg">
            <p>💼 {job.years ? `${job.years} Yrs` : "Experience not specified"} | 💰 {job.salary || "Salary not disclosed"}</p>
            <p>📍 {job.location || "Location not specified"}</p>
            {job.timeAvailability && <p>⏱️ {job.timeAvailability}</p>}
            {job.educationInfo && <p>🎓 {job.educationInfo}</p>}
          </div>

          {/* Job Description Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Job Description</h3>
            <div className="space-y-4 text-gray-700 whitespace-pre-line">
              {job.description || "No description provided."}
            </div>
            
            {job.skills && job.skills.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold">Key Skills:</h4>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  {job.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {job.requirements && (
              <div className="mt-6">
                <h4 className="font-semibold">Requirements:</h4>
                <div className="whitespace-pre-line mt-2">
                  {job.requirements}
                </div>
              </div>
            )}
            
            {job.benefits && (
              <div className="mt-6">
                <h4 className="font-semibold">Benefits:</h4>
                <div className="whitespace-pre-line mt-2">
                  {job.benefits}
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            {job.contactPerson && <p className="mt-2">👤 Contact: {job.contactPerson}</p>}
            {job.contactEmail && (
              <p className="mt-1">
                📧 Email: <a href={`mailto:${job.contactEmail}`} className="text-blue-600">{job.contactEmail}</a>
              </p>
            )}
            {job.contactPhone && <p className="mt-1">📞 Phone: {job.contactPhone}</p>}
            {job.venue && <p className="mt-1">📍 Venue: {job.venue}</p>}
            {company.website && (
              <p className="mt-1">
                🌐 Website: <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  {company.website}
                </a>
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Posted: {new Date(job.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
            <button 
              className={`px-6 py-2 rounded-full shadow-md text-white ${
                applicationStatus === "applied" 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={toggleApplicationStatus}
              disabled={isSubmitting || applicationStatus === "applied"}
            >
              {isSubmitting ? "Submitting..." : applicationStatus === "applied" ? "Applied" : "I am interested"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AAllJobs2;