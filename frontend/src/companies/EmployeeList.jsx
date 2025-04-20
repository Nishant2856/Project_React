import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaFileAlt, FaDownload } from "react-icons/fa";
import axios from "axios";

const EmployeeList = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please login.');
        setLoading(false);
        return;
      }
      
      // Fetch all jobs for the company
      const jobsResponse = await axios.get('http://localhost:5000/api/jobs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!jobsResponse.data.success) {
        throw new Error('Failed to fetch jobs');
      }
      
      // For each job, fetch applications
      const jobIds = jobsResponse.data.jobs.map(job => job._id);
      
      // Array to store all applications
      let allApplications = [];
      
      // Fetch applications for each job
      for (const jobId of jobIds) {
        const applicationsResponse = await axios.get(`http://localhost:5000/api/applicants/job/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (applicationsResponse.data.success) {
          allApplications = [...allApplications, ...applicationsResponse.data.applications];
        }
      }
      
      setApplications(allApplications);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applicant data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.put(`http://localhost:5000/api/applicants/${applicationId}`, 
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update the status in local state
      setApplications(applications.map(app => 
        app._id === applicationId ? {...app, status: newStatus} : app
      ));
      
    } catch (err) {
      console.error('Error updating application status:', err);
      alert('Failed to update application status');
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

        {applications.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No Applicants Yet</h3>
            <p className="text-gray-600">There are no applications for your job postings.</p>
          </div>
        ) : (
          applications.map((application) => (
            <div
              key={application._id}
              className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center mb-6"
            >
              {/* Profile Section */}
              <div className="flex items-center space-x-20">
                <img
                  src={application.applicant.logo ? `http://localhost:5000/${application.applicant.logo}` : "/profile.jpg"}
                  alt="User Avatar"
                  className="h-14 w-14 rounded-full border-2 border-blue-400"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/profile.jpg";
                  }}
                />
                <div>
                  <h3 className="text-lg font-bold">{application.applicant.name}</h3>
                  <div className="text-gray-600 flex items-center space-x-2">
                    <FaEnvelope className="text-gray-500" />
                    <span>{application.applicant.email}</span>
                  </div>
                  <div className="text-gray-600 flex items-center space-x-2">
                    <FaPhone className="text-gray-500" />
                    <span>{application.applicant.mobile || "Not provided"}</span>
                  </div>
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
                        : 'bg-blue-500 hover:bg-blue-600'
                    } text-white px-8 py-2 rounded-md font-semibold`}
                    onClick={() => handleStatusUpdate(application._id, 'accepted')}
                    disabled={application.status === 'accepted'}
                  >
                    {application.status === 'accepted' ? 'Accepted' : 'Accept'}
                  </button>
                  <button 
                    className={`${
                      application.status === 'rejected' 
                        ? 'bg-gray-500' 
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white px-8 py-2 rounded-md font-semibold`}
                    onClick={() => handleStatusUpdate(application._id, 'rejected')}
                    disabled={application.status === 'rejected'}
                  >
                    {application.status === 'rejected' ? 'Rejected' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          ))
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
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/applicant-profile/${application.applicant._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setApplicantProfile(response.data.profile);
        }
      } catch (err) {
        console.error('Error fetching applicant profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantProfile();
  }, [application.applicant._id]);

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
            <div className="mt-2 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block">
              Applied for: {application.job.title}
            </div>
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
