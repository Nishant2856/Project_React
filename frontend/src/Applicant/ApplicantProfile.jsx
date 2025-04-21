import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaInfoCircle, FaSignOutAlt, FaPen, FaTimes, FaCheck, FaMapMarkerAlt, FaPlus, FaTrash, FaSave } from "react-icons/fa";
import profileService from "../services/profileService";

const ApplicantProfile = ({ setIsApplicantLoggedIn }) => {  
  const navigate = useNavigate();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  
  // User data state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    logo: "",
    address: "",
    userType: ""
  });
  
  // Consolidated form states
  const [profileData, setProfileData] = useState({
    resume: null,
    skills: [],
    education: {
      degree: "",
      university: "",
      course: "",
      specialization: "",
      duration: "",
      type: "Full Time"
    },
    itSkills: {
      name: "",
      version: "",
      lastUsed: "",
      experience: ""
    },
    projects: [{
      title: "",
      client: "",
      status: "In Progress",
      workedFrom: "",
      details: ""
    }],
    profileSummary: ""
  });
  
  // For editing form
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Load user data from localStorage
        const userString = localStorage.getItem("user");
        if (userString) {
          try {
            const user = JSON.parse(userString);
            setUserData({
              name: user.name || "",
              email: user.email || "",
              mobile: user.mobile || "",
              logo: user.logo || "",
              address: user.address || "",
              userType: user.userType || "experienced"
            });
          } catch (error) {
            console.error("Error parsing user data:", error);
          }
        }
        
        // Fetch profile data from the backend
        const profileResponse = await profileService.getMyProfile();
        console.log("Fetched profile data:", profileResponse);
        
        if (profileResponse.success && profileResponse.profile) {
          const profile = profileResponse.profile;
          
          setProfileData({
            resume: profile.resume || null,
            skills: profile.skills || [],
            education: profile.education || {
              degree: "",
              university: "",
              course: "",
              specialization: "",
              duration: "",
              type: "Full Time"
            },
            itSkills: profile.itSkills || {
              name: "",
              version: "",
              lastUsed: "",
              experience: ""
            },
            projects: profile.projects && profile.projects.length > 0 
              ? profile.projects 
              : [{
                title: "",
                client: "",
                status: "In Progress",
                workedFrom: "",
                details: ""
              }],
            profileSummary: profile.profileSummary || ""
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("applicantAuth");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsApplicantLoggedIn(false);
    navigate("/");  
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || 
                file.type === "application/msword" || 
                file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
                file.type === "application/rtf")) {
      if (file.size <= 2 * 1024 * 1024) {
        setResumeFile(file);
        setIsFormDirty(true);
      } else {
        alert("File size should be less than 2MB");
      }
    } else {
      alert("Unsupported file format");
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      const updatedSkills = [...profileData.skills, newSkill.trim()];
      setProfileData({...profileData, skills: updatedSkills});
      setNewSkill("");
      setIsFormDirty(true);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = profileData.skills.filter(skill => skill !== skillToRemove);
    setProfileData({...profileData, skills: updatedSkills});
    setIsFormDirty(true);
  };

  const handleSaveProfile = async () => {
    try {
      setSaveLoading(true);
      console.log("Saving profile data:", profileData);
      
      if (resumeFile) {
        // If there's a resume file, upload it with the profile data
        const formData = new FormData();
        formData.append('resume', resumeFile);
        
        // Add other profile data to the form
        formData.append('skills', JSON.stringify(profileData.skills));
        formData.append('education', JSON.stringify(profileData.education));
        formData.append('itSkills', JSON.stringify(profileData.itSkills));
        formData.append('projects', JSON.stringify(profileData.projects));
        formData.append('profileSummary', profileData.profileSummary || '');
        
        const response = await profileService.uploadResume(formData);
        console.log("Profile updated with resume:", response);
      } else {
        // Otherwise, just update the profile data
        const response = await profileService.updateProfile({
          skills: profileData.skills,
          education: profileData.education,
          itSkills: profileData.itSkills,
          projects: profileData.projects,
          profileSummary: profileData.profileSummary || ''
        });
        console.log("Profile updated:", response);
      }
      
      alert("Profile updated successfully!");
      setShowProfileForm(false);
      setIsFormDirty(false);
      setSaveLoading(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile: " + (error.message || "Unknown error"));
      setSaveLoading(false);
    }
  };

  const handleInputChange = (e, section, field, index = null) => {
    const value = e.target.value;
    
    if (section === 'education' || section === 'itSkills') {
      setProfileData({
        ...profileData,
        [section]: {
          ...profileData[section],
          [field]: value
        }
      });
    } else if (section === 'projects' && index !== null) {
      const updatedProjects = [...profileData.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value
      };
      setProfileData({
        ...profileData,
        projects: updatedProjects
      });
    } else if (section === 'profileSummary') {
      setProfileData({
        ...profileData,
        profileSummary: value
      });
    }
    
    setIsFormDirty(true);
  };

  const addProject = () => {
    const newProject = {
      title: "",
      client: "",
      status: "In Progress",
      workedFrom: "",
      details: ""
    };
    
    setProfileData({
      ...profileData,
      projects: [...profileData.projects, newProject]
    });
    setIsFormDirty(true);
  };

  const removeProject = (index) => {
    const updatedProjects = [...profileData.projects];
    updatedProjects.splice(index, 1);
    
    setProfileData({
      ...profileData,
      projects: updatedProjects
    });
    setIsFormDirty(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-700">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-4 py-10">
      {/* Top Bar with Logout */}
      <div className="w-full flex justify-end mb-8 max-w-3xl px-4">
        <button
          onClick={() => navigate("/ajob")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold flex items-center hover:bg-blue-600 mr-4"
        >
          Back to Jobs
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold flex items-center hover:bg-red-600"
        >
          <FaSignOutAlt className="mr-2" /> Sign Out
        </button>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mt-12 flex items-center w-3/4 relative">
        <div className="mr-8">
          <img 
            src={userData.logo && userData.logo.startsWith('http') 
              ? userData.logo 
              : userData.logo.startsWith('uploads') 
                ? `http://localhost:5000/${userData.logo}` 
                : "/profile.jpg"}
            alt="Profile" 
            className="h-44 w-44 rounded-full border-4 border-gray-300 shadow-lg object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/profile.jpg"; // Fallback image
            }}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
          <hr className="my-2 border-gray-300" />
          <div className="flex flex-col space-y-2">
            <p className="flex items-center text-gray-600">
              <FaPhone className="mr-3 text-blue-500" /> {userData.mobile || "Not provided"}
            </p>
            <p className="flex items-center text-gray-600">
              <FaEnvelope className="mr-3 text-blue-500" /> {userData.email || "Not provided"}
            </p>
            {userData.address && (
              <p className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-3 text-blue-500" /> {userData.address}
              </p>
            )}
            <p className="flex items-center text-gray-600 mt-2">
              <FaInfoCircle className="mr-3 text-blue-500" /> 
              {userData.userType === "experienced" ? "Experienced Professional" : "Fresher"}
            </p>
          </div>
        </div>
        <FaPen 
          className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl hover:text-blue-500" 
          onClick={() => navigate("/applicant-profile-update")}
        />
      </div>

      {/* Applications Status Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 w-3/4 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Application Status</h2>
          <Link to="/applicant-status">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              View Applications
            </button>
          </Link>
        </div>
        <p className="text-gray-600 mb-4">Track and manage your job applications</p>
      </div>

      {/* Consolidated Profile Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 w-3/4 relative mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Resume & Documents</h2>
          <button
            onClick={() => setShowProfileForm(!showProfileForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
          >
            {showProfileForm ? (
              <>
                <FaTimes className="mr-2" /> Cancel
              </>
            ) : (
              <>
                <FaPen className="mr-2" /> Edit
              </>
            )}
          </button>
        </div>
        
        {!showProfileForm ? (
          <div className="space-y-8">
            {/* Display Resume Section */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">Resume</h3>
              <p className="text-gray-600">
                {profileData.resume ? (
                  <a 
                    href={profileService.getResumeUrl(userData._id || userData.id)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profileData.resume.originalName || "View Resume"}
                  </a>
                ) : "No resume uploaded yet"}
              </p>
            </div>
            
            {/* Display Key Skills Section */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">Key Skills</h3>
              {profileData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No skills added yet</p>
              )}
            </div>
            
            {/* Display Education Section */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              {profileData.education.degree ? (
                <div className="space-y-1">
                  <p><span className="font-semibold">Degree:</span> {profileData.education.degree}</p>
                  <p><span className="font-semibold">University:</span> {profileData.education.university}</p>
                  <p><span className="font-semibold">Course:</span> {profileData.education.course}</p>
                  <p><span className="font-semibold">Specialization:</span> {profileData.education.specialization}</p>
                  <p><span className="font-semibold">Duration:</span> {profileData.education.duration}</p>
                  <p><span className="font-semibold">Type:</span> {profileData.education.type}</p>
                </div>
              ) : (
                <p className="text-gray-600">No education details added yet</p>
              )}
            </div>
            
            {/* Display IT Skills Section */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">IT Skills</h3>
              {profileData.itSkills.name ? (
                <div className="space-y-1">
                  <p><span className="font-semibold">Skill/Software:</span> {profileData.itSkills.name}</p>
                  <p><span className="font-semibold">Version:</span> {profileData.itSkills.version}</p>
                  <p><span className="font-semibold">Last Used:</span> {profileData.itSkills.lastUsed}</p>
                  <p><span className="font-semibold">Experience:</span> {profileData.itSkills.experience}</p>
                </div>
              ) : (
                <p className="text-gray-600">No IT skills added yet</p>
              )}
            </div>
            
            {/* Display Projects Section */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">Projects</h3>
              {profileData.projects.length > 0 && profileData.projects[0].title ? (
                <div className="space-y-4">
                  {profileData.projects.map((project, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <h4 className="font-semibold">{project.title}</h4>
                      <p><span className="font-semibold">Client:</span> {project.client}</p>
                      <p><span className="font-semibold">Status:</span> {project.status}</p>
                      <p><span className="font-semibold">Worked From:</span> {project.workedFrom}</p>
                      <p><span className="font-semibold">Details:</span> {project.details}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No projects added yet</p>
              )}
            </div>
            
            {/* Display Profile Summary Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Profile Summary</h3>
              {profileData.profileSummary ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p>{profileData.profileSummary}</p>
                </div>
              ) : (
                <p className="text-gray-600">No profile summary added yet</p>
              )}
            </div>
          </div>
        ) : (
          /* Edit Form */
          <div className="space-y-8">
            {/* Resume Upload Form */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-3">Resume Upload</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload your resume</label>
                <input 
                  type="file" 
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx,.rtf"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX, RTF (Max 2MB)</p>
                {profileData.resume && !resumeFile && (
                  <p className="mt-2 text-green-600">
                    Current: {profileData.resume.originalName || "Resume already uploaded"}
                  </p>
                )}
                {resumeFile && (
                  <p className="mt-2 text-green-600">Selected: {resumeFile.name}</p>
                )}
              </div>
            </div>
            
            {/* Key Skills Form */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-3">Key Skills</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Add your skills</label>
                <div className="flex">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g. JavaScript, Project Management"
                    className="flex-1 p-2 border border-gray-300 rounded-l-md"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <button 
                    onClick={handleAddSkill}
                    className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Your Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                        {skill}
                        <button 
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Education Form */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-3">Education</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={profileData.education.degree}
                    onChange={(e) => handleInputChange(e, 'education', 'degree')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">University</label>
                  <input
                    type="text"
                    value={profileData.education.university}
                    onChange={(e) => handleInputChange(e, 'education', 'university')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Course</label>
                  <input
                    type="text"
                    value={profileData.education.course}
                    onChange={(e) => handleInputChange(e, 'education', 'course')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    value={profileData.education.specialization}
                    onChange={(e) => handleInputChange(e, 'education', 'specialization')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Course Duration</label>
                  <input
                    type="text"
                    value={profileData.education.duration}
                    onChange={(e) => handleInputChange(e, 'education', 'duration')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Course Type</label>
                  <select
                    value={profileData.education.type}
                    onChange={(e) => handleInputChange(e, 'education', 'type')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Distance Learning">Distance Learning</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* IT Skills Form */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-3">IT Skills</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Skill/Software Name</label>
                  <input
                    type="text"
                    value={profileData.itSkills.name}
                    onChange={(e) => handleInputChange(e, 'itSkills', 'name')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Software Version</label>
                  <input
                    type="text"
                    value={profileData.itSkills.version}
                    onChange={(e) => handleInputChange(e, 'itSkills', 'version')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Last Used</label>
                  <input
                    type="text"
                    value={profileData.itSkills.lastUsed}
                    onChange={(e) => handleInputChange(e, 'itSkills', 'lastUsed')}
                    placeholder="e.g. 2023 or Current"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={profileData.itSkills.experience}
                    onChange={(e) => handleInputChange(e, 'itSkills', 'experience')}
                    placeholder="e.g. 2 years"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Projects Form */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Projects</h3>
                <button 
                  onClick={addProject}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center text-sm"
                >
                  <FaPlus className="mr-1" /> Add Project
                </button>
              </div>
              
              {profileData.projects.map((project, index) => (
                <div key={index} className="mb-6 bg-gray-50 p-4 rounded-md relative">
                  <button 
                    onClick={() => removeProject(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    disabled={profileData.projects.length === 1}
                  >
                    <FaTrash />
                  </button>
                  
                  <h4 className="font-semibold mb-3">Project {index + 1}</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleInputChange(e, 'projects', 'title', index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Client</label>
                      <input
                        type="text"
                        value={project.client}
                        onChange={(e) => handleInputChange(e, 'projects', 'client', index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Project Status</label>
                      <select
                        value={project.status}
                        onChange={(e) => handleInputChange(e, 'projects', 'status', index)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Worked From</label>
                      <input
                        type="text"
                        value={project.workedFrom}
                        onChange={(e) => handleInputChange(e, 'projects', 'workedFrom', index)}
                        placeholder="e.g. Jan 2022 - Dec 2022"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Project Details</label>
                      <textarea
                        value={project.details}
                        onChange={(e) => handleInputChange(e, 'projects', 'details', index)}
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Profile Summary Form */}
            <div className="pb-6">
              <h3 className="text-lg font-semibold mb-3">Profile Summary</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">About You</label>
                <textarea
                  value={profileData.profileSummary}
                  onChange={(e) => handleInputChange(e, 'profileSummary')}
                  rows="6"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Write a summary highlighting your key skills, experience, and achievements..."
                />
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end">
              <button 
                onClick={handleSaveProfile}
                disabled={!isFormDirty || saveLoading}
                className={`px-6 py-3 rounded-md font-semibold flex items-center ${
                  isFormDirty && !saveLoading ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {saveLoading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" /> Save All Changes
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantProfile;