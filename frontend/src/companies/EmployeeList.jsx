import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaFileAlt, FaDownload } from "react-icons/fa";
import axios from "axios";

const EmployeeList = () => {
  console.log("EmployeeList component rendering");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add console log for initial state
  console.log("Initial state:", { loading, applications: applications.length, error });
  
  useEffect(() => {
    console.log("Calling fetchApplications on mount");
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      
      console.log('User data from localStorage:', userString);
      
      // Try to parse user data
      let user = {};
      try {
        if (userString) {
          user = JSON.parse(userString);
          console.log('Parsed user data:', user);
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
      
      // Check if user is in a different format or location
      const companyAuth = localStorage.getItem('companyAuth');
      const applicantAuth = localStorage.getItem('applicantAuth');
      console.log('Auth flags:', { companyAuth, applicantAuth });
      
      const isCompanyUser = user.role === 'company' || companyAuth === 'true';
      console.log('Is company user:', isCompanyUser);
      
      if (!token) {
        setError('Authentication required. Please login.');
        setLoading(false);
        return;
      }
      
      if (!isCompanyUser) {
        // Instead of showing error, try to proceed with the request
        console.log('Warning: User role is not company, but proceeding with request');
      }
      
      // Use the new endpoint to fetch all applications for the company in one request
      console.log('Fetching company applications...');
      const applicationsResponse = await axios.get('http://localhost:5000/api/applicants/company-applications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!applicationsResponse.data.success) {
        throw new Error(applicationsResponse.data.message || 'Failed to fetch applications');
      }
      
      console.log(`Fetched ${applicationsResponse.data.count} applications for the company`);
      console.log('Applications data:', applicationsResponse.data.applications);
      setApplications(applicationsResponse.data.applications);
      console.log('State updated with applications');
    } catch (err) {
      console.error('Error fetching applications:', err);
      let errorMessage = 'Failed to load applicant data. Please try again.';
      
      if (err.response) {
        errorMessage = err.response.data.message || errorMessage;
        console.error('Response error:', err.response.data);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log('Loading state set to false');
    }
  };

  // Add effect to log state changes
  useEffect(() => {
    console.log('Applications state updated:', applications.length, 'applications');
  }, [applications]);

  useEffect(() => {
    console.log('Loading state updated:', loading);
  }, [loading]);

  useEffect(() => {
    console.log('Error state updated:', error);
  }, [error]);

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      console.log(`Updating application ${applicationId} status to ${newStatus}`);
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Authentication required. Please login again.');
        return;
      }
      
      // Add loading state for this specific application
      setApplications(applications.map(app => 
        app._id === applicationId ? {...app, isUpdating: true} : app
      ));
      
      const response = await axios.put(
        `http://localhost:5000/api/applicants/${applicationId}/status`, 
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Status update response:', response.data);
      
      // Update the status in local state
      setApplications(applications.map(app => 
        app._id === applicationId ? {...app, status: newStatus, isUpdating: false} : app
      ));
      
    } catch (err) {
      console.error('Error updating application status:', err);
      
      // Show the full error response for debugging
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        alert(`Failed to update status: ${err.response.data.message || 'Unknown error'}`);
      } else {
        alert('Failed to update application status. Network error.');
      }
      
      // Reset the updating state
      setApplications(applications.map(app => 
        app._id === applicationId ? {...app, isUpdating: false} : app
      ));
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
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-6">{error}</p>
          <button 
            onClick={fetchApplications}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen p-6 flex justify-center">
      <div className="w-7/8 lg:w-3/4">
        <h2 className="text-2xl font-bold mb-6 text-center">Applicants List</h2>
        
        {console.log('Rendering component with:', { loading, error, applications: applications.length })}

        {loading ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading applications...</p>
          </div>
        ) : error ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold mb-2 text-red-600">Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchApplications}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No Applicants Yet</h3>
            <p className="text-gray-600">There are no applications for your job postings.</p>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-gray-700">{applications.length} application(s) found</p>
            {applications.map((application) => {
              console.log('Rendering application:', application);
              return (
                <div
                  key={application._id}
                  className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center mb-6"
                >
                  {/* Profile Section */}
                  <div className="flex items-center space-x-20">
                    <img
                      src={application.applicant && application.applicant.logo 
                        ? `http://localhost:5000/${application.applicant.logo}` 
                        : "/profile.jpg"}
                      alt="User Avatar"
                      className="h-14 w-14 rounded-full border-2 border-blue-400"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/profile.jpg";
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-bold">
                        {application.applicant ? application.applicant.name : "Unknown User"}
                      </h3>
                      {application.applicant && (
                        <>
                          <div className="text-gray-600 flex items-center space-x-2">
                            <FaEnvelope className="text-gray-500" />
                            <span>{application.applicant.email}</span>
                          </div>
                          <div className="text-gray-600 flex items-center space-x-2">
                            <FaPhone className="text-gray-500" />
                            <span>{application.applicant.mobile || "Not provided"}</span>
                          </div>
                        </>
                      )}
                      {application.job && (
                        <div className="mt-2 text-sm">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Applied for: {application.job.title || "Job"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-20">
                    {/* Resume Button */}
                    <button
                      className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600"
                      onClick={() => setSelectedEmployee(application)}
                    >
                      Resume/Document
                    </button>

                    {/* Accept & Reject in the Same Column */}
                    <div className="flex flex-col space-y-3">
                      <button 
                        className={`${
                          application.status === 'accepted' 
                            ? 'bg-green-600' 
                            : application.isUpdating 
                              ? 'bg-blue-300 cursor-not-allowed'
                              : 'bg-blue-500 hover:bg-blue-600'
                        } text-white px-8 py-2 rounded-md font-semibold flex items-center justify-center`}
                        onClick={() => handleStatusUpdate(application._id, 'accepted')}
                        disabled={application.status === 'accepted' || application.isUpdating}
                      >
                        {application.isUpdating ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          application.status === 'accepted' ? 'Accepted' : 'Accept'
                        )}
                      </button>
                      <button 
                        className={`${
                          application.status === 'rejected' 
                            ? 'bg-gray-500' 
                            : application.isUpdating
                              ? 'bg-red-300 cursor-not-allowed'
                              : 'bg-red-500 hover:bg-red-600'
                        } text-white px-8 py-2 rounded-md font-semibold flex items-center justify-center`}
                        onClick={() => handleStatusUpdate(application._id, 'rejected')}
                        disabled={application.status === 'rejected' || application.isUpdating}
                      >
                        {application.isUpdating ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          application.status === 'rejected' ? 'Rejected' : 'Reject'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Show Profile Detail Modal */}
        {selectedEmployee && (
          <ProfileDetailsModal
            application={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
          />
        )}
      </div>
    </div>
  );
};

// Profile Details Modal Component
const ProfileDetailsModal = ({ application, onClose }) => {
  const [applicantProfile, setApplicantProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicantProfile = async () => {
      try {
        // Verify the application has a valid applicant property
        if (!application || !application.applicant || !application.applicant._id) {
          console.error('Invalid application data:', application);
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/applicant-profile/${application.applicant._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setApplicantProfile(response.data.profile);
          console.log('Applicant profile loaded:', response.data.profile);
        }
      } catch (err) {
        console.error('Error fetching applicant profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantProfile();
  }, [application?.applicant?._id]);

  // If the application data is invalid, show an error
  if (!application || !application.applicant) {
    return (
      <div className="fixed inset-0 bg-blue-50 bg-opacity-70 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="mb-4">Cannot display applicant details: Invalid data</p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-blue-50 bg-opacity-70 flex justify-center items-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-2/3 h-[90vh] p-8 relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 text-2xl font-bold hover:text-red-500"
        >
          ✖
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-600">
          Applicant Details
        </h2>

        {/* Profile Section */}
        <div className="flex items-center space-x-8 mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <img
            src={application.applicant.logo ? `http://localhost:5000/${application.applicant.logo}` : "/profile.jpg"}
            alt="User Avatar"
            className="h-24 w-24 rounded-full border-4 border-blue-400"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/profile.jpg";
            }}
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{application.applicant.name}</h3>
            <div className="text-gray-600 flex items-center space-x-2 mt-2">
              <FaEnvelope className="text-gray-500" />
              <span>{application.applicant.email}</span>
            </div>
            <div className="text-gray-600 flex items-center space-x-2 mt-2">
              <FaPhone className="text-gray-500" />
              <span>{application.applicant.mobile || "Not provided"}</span>
            </div>
            {application.job && (
              <div className="mt-2 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block">
                Applied for: {application.job.title || "Job"}
              </div>
            )}
          </div>
        </div>

        {/* Information Cards (One per Row) */}
        <div className="space-y-8 flex-grow overflow-y-auto px-2">
          {/* Resume Section */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold mb-3">Resume</h3>
            <hr className="border-gray-300 mb-4" />
            {application.resume ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaFileAlt className="text-blue-500 text-xl mr-2" />
                  <span>Applicant Resume</span>
                </div>
                <a 
                  href={`http://localhost:5000/${application.resume}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <FaDownload className="mr-1" />
                  Download
                </a>
              </div>
            ) : (
              <p>No resume provided</p>
            )}
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
              <h3 className="text-lg font-bold mb-3">Cover Letter</h3>
              <hr className="border-gray-300 mb-4" />
              <p className="whitespace-pre-line">{application.coverLetter}</p>
            </div>
          )}

          {/* Experience */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold mb-3">Experience</h3>
            <hr className="border-gray-300 mb-4" />
            <p className="whitespace-pre-line">{application.experience || "Not provided"}</p>
          </div>

          {/* Skills */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold mb-3">Skills</h3>
            <hr className="border-gray-300 mb-4" />
            {application.skills && application.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p>No skills provided</p>
            )}
          </div>

          {/* Loading applicant profile data */}
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"></div>
              <p className="mt-2 text-gray-600">Loading profile data...</p>
            </div>
          ) : (
            <>
              {/* Education - from profile */}
              {applicantProfile?.education && applicantProfile.education.length > 0 && (
                <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-bold mb-3">Education</h3>
                  <hr className="border-gray-300 mb-4" />
                  {applicantProfile.education.map((edu, index) => (
                    <div key={index} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
                      <h4 className="font-semibold">{edu.degree} - {edu.institution}</h4>
                      <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate || 'Present'}</p>
                      {edu.description && <p className="mt-1 text-gray-700">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* IT Skills - from profile */}
              {applicantProfile?.itSkills && applicantProfile.itSkills.length > 0 && (
                <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-bold mb-3">IT Skills</h3>
                  <hr className="border-gray-300 mb-4" />
                  {applicantProfile.itSkills.map((skill, index) => (
                    <div key={index} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
                      <h4 className="font-semibold">{skill.skillName}</h4>
                      <p className="text-sm text-gray-600">
                        Proficiency: {skill.proficiency} | Experience: {skill.yearsOfExperience} years
                      </p>
                      {skill.lastUsed && <p className="text-sm text-gray-600">Last used: {skill.lastUsed}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Projects - from profile */}
              {applicantProfile?.projects && applicantProfile.projects.length > 0 && (
                <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-bold mb-3">Projects</h3>
                  <hr className="border-gray-300 mb-4" />
                  {applicantProfile.projects.map((project, index) => (
                    <div key={index} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="text-sm text-gray-600">Role: {project.role}</p>
                      <p className="text-sm text-gray-600">
                        {project.startDate} - {project.isCurrentProject ? 'Present' : project.endDate}
                      </p>
                      {project.description && (
                        <p className="mt-1 text-gray-700">{project.description}</p>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Work Experience - from profile */}
              {applicantProfile?.workExperience && applicantProfile.workExperience.length > 0 && (
                <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300 mb-4">
                  <h3 className="text-lg font-bold mb-3">Work Experience</h3>
                  <hr className="border-gray-300 mb-4" />
                  {applicantProfile.workExperience.map((exp, index) => (
                    <div key={index} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
                      <h4 className="font-semibold">{exp.jobTitle} at {exp.company}</h4>
                      <p className="text-sm text-gray-600">
                        {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate}
                      </p>
                      {exp.description && <p className="mt-1 text-gray-700">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* If no profile data */}
              {!applicantProfile && (
                <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-bold mb-3">Applicant Profile</h3>
                  <hr className="border-gray-300 mb-4" />
                  <p>No detailed profile information available</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
