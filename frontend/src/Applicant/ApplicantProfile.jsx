import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaInfoCircle, FaSignOutAlt, FaPen, FaTimes, FaCheck } from "react-icons/fa";

const ApplicantProfile = ({ setIsApplicantLoggedIn }) => {  
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  
  // Form states
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [education, setEducation] = useState({
    degree: "",
    university: "",
    course: "",
    specialization: "",
    duration: "",
    type: "Full Time"
  });
  const [itSkills, setItSkills] = useState({
    name: "",
    version: "",
    lastUsed: "",
    experience: ""
  });
  const [project, setProject] = useState({
    title: "",
    client: "",
    status: "In Progress",
    workedFrom: "",
    details: ""
  });
  const [profileSummary, setProfileSummary] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("applicantAuth");  
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
      } else {
        alert("File size should be less than 2MB");
      }
    } else {
      alert("Unsupported file format");
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = (section) => {
    console.log(`Saved ${section} data`);
    setActivePopup(null);
  };

  // Fixed the input issue by properly handling onChange events
  const handleInputChange = (e, setter, field, isNested = false) => {
    const value = e.target.value;
    if (isNested) {
      setter(prev => ({ ...prev, [field]: value }));
    } else {
      setter(value);
    }
  };

  const Popup = ({ title, children, onSave }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <button 
              onClick={() => setActivePopup(null)} 
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          {children}
          <div className="flex justify-end space-x-4 mt-6">
            <button 
              onClick={() => setActivePopup(null)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button 
              onClick={onSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
            >
              <FaCheck className="mr-2" /> Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center p-4 bg-white shadow-md rounded-2xl">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">
            Welcome, <span className="text-black">Nishant</span>
          </h1>
          <img src="/profile.jpg" alt="Profile" className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-md" />
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold flex items-center hover:bg-red-600 ml-auto"
        >
          <FaSignOutAlt className="mr-2" /> Sign Out
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mt-12 flex items-center w-3/4 relative">
        <div className="mr-8">
          <img src="/firstsource.gif" alt="Profile" className="h-44 w-44 rounded-full border-4 border-gray-300 shadow-lg" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Nishant</h2>
          <hr className="my-2 border-gray-300" />
          <div className="flex items-center space-x-8">
            <div className="text-lg">
              <p className="flex items-center text-gray-600 mb-2">
                <FaPhone className="mr-3 text-blue-500" /> 4512762145
              </p>
              <p className="flex items-center text-gray-600">
                <FaEnvelope className="mr-3 text-blue-500" />
                nishant@gmail.com
              </p>
            </div>
            <div className="border-l-2 border-gray-300 pl-6 text-lg">
              <p className="flex items-center text-gray-600">
                <FaInfoCircle className="mr-2 text-blue-500" />
                Welcome to my profile page
              </p>
            </div>
          </div>
        </div>
        <FaPen 
          className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl hover:text-blue-500" 
          onClick={() => setActivePopup('profile')}
        />
      </div>

      {/* Resume Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 w-3/4 relative">
        <h2 className="text-xl font-bold mb-4">Resume</h2>
        <p className="text-gray-600 mb-4">
          {resumeFile ? `Uploaded: ${resumeFile.name}` : "Already have a resume? Upload resume"}
        </p>
        <p className="text-sm text-gray-500 mb-4">Supported Formats: doc, docx, rtf, pdf, upto 2 MB</p>
        <FaPen 
          className="absolute top-6 right-6 text-gray-500 cursor-pointer text-xl hover:text-blue-500" 
          onClick={() => setActivePopup('resume')}
        />
      </div>

      {/* Key Skills Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 w-3/4 relative">
        <h2 className="text-xl font-bold mb-4">Key skills ✅</h2>
        <p className="text-gray-600 mb-4">Your skills details will help recruiters understand your experience</p>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        )}
        <FaPen 
          className="absolute top-6 right-6 text-gray-500 cursor-pointer text-xl hover:text-blue-500" 
          onClick={() => setActivePopup('skills')}
        />
      </div>

      {/* Education Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 w-3/4 relative">
        <h2 className="text-xl font-bold mb-4">Education ✅</h2>
        <p className="text-gray-600 mb-4">Your qualifications help employers know your educational background</p>
        {education.degree && (
          <div className="space-y-2">
            <p><span className="font-semibold">Degree:</span> {education.degree}</p>
            <p><span className="font-semibold">University:</span> {education.university}</p>
            <p><span className="font-semibold">Course:</span> {education.course}</p>
            <p><span className="font-semibold">Specialization:</span> {education.specialization}</p>
            <p><span className="font-semibold">Duration:</span> {education.duration}</p>
            <p><span className="font-semibold">Type:</span> {education.type}</p>
          </div>
        )}
        <FaPen 
          className="absolute top-6 right-6 text-gray-500 cursor-pointer text-xl hover:text-blue-500" 
          onClick={() => setActivePopup('education')}
        />
      </div>

      {/* IT Skills Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 w-3/4 relative">
        <h2 className="text-xl font-bold mb-4">IT skills ✅</h2>
        <p className="text-gray-600 mb-4">Show your technical expertise by mentioning softwares and skills you know</p>
        {itSkills.name && (
          <div className="space-y-2">
            <p><span className="font-semibold">Skill/Software:</span> {itSkills.name}</p>
            <p><span className="font-semibold">Version:</span> {itSkills.version}</p>
            <p><span className="font-semibold">Last Used:</span> {itSkills.lastUsed}</p>
            <p><span className="font-semibold">Experience:</span> {itSkills.experience}</p>
          </div>
        )}
        <FaPen 
          className="absolute top-6 right-6 text-gray-500 cursor-pointer text-xl hover:text-blue-500" 
          onClick={() => setActivePopup('itSkills')}
        />
      </div>

      {/* Project Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 w-3/4 relative">
        <h2 className="text-xl font-bold mb-4">Project ✅</h2>
        <p className="text-gray-600 mb-4">Stand out to employers by adding details about projects that you have done so far</p>
        {project.title && (
          <div className="space-y-2">
            <p><span className="font-semibold">Title:</span> {project.title}</p>
            <p><span className="font-semibold">Client:</span> {project.client}</p>
            <p><span className="font-semibold">Status:</span> {project.status}</p>
            <p><span className="font-semibold">Worked From:</span> {project.workedFrom}</p>
            <p><span className="font-semibold">Details:</span> {project.details}</p>
          </div>
        )}
        <FaPen 
          className="absolute top-6 right-6 text-gray-500 cursor-pointer text-xl hover:text-blue-500" 
          onClick={() => setActivePopup('project')}
        />
      </div>

      {/* Profile Summary Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 w-3/4 relative mb-12">
        <h2 className="text-xl font-bold mb-4">Profile Summary ✅</h2>
        <p className="text-gray-600 mb-4">Highlight your key career achievements to help employers know your potential</p>
        {profileSummary && (
          <div className="bg-gray-50 p-4 rounded-md">
            <p>{profileSummary}</p>
          </div>
        )}
        <FaPen 
          className="absolute top-6 right-6 text-gray-500 cursor-pointer text-xl hover:text-blue-500" 
          onClick={() => setActivePopup('profileSummary')}
        />
      </div>

      {/* Resume Upload Popup */}
      {activePopup === 'resume' && (
        <Popup title="Upload Resume" onSave={() => handleSave('resume')}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Upload your resume</label>
            <input 
              type="file" 
              onChange={handleResumeUpload}
              accept=".pdf,.doc,.docx,.rtf"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX, RTF (Max 2MB)</p>
          </div>
        </Popup>
      )}

      {/* Skills Popup */}
      {activePopup === 'skills' && (
        <Popup title="Edit Key Skills" onSave={() => handleSave('skills')}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Add your skills</label>
            <div className="flex">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g. JavaScript, Project Management"
                className="flex-1 p-2 border border-gray-300 rounded-l-md"
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
                {skills.map((skill, index) => (
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
        </Popup>
      )}

      {/* Education Popup */}
      {activePopup === 'education' && (
        <Popup title="Edit Education" onSave={() => handleSave('education')}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => handleInputChange(e, setEducation, 'degree', true)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">University</label>
              <input
                type="text"
                value={education.university}
                onChange={(e) => handleInputChange(e, setEducation, 'university', true)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Course</label>
              <input
                type="text"
                value={education.course}
                onChange={(e) => handleInputChange(e, setEducation, 'course', true)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Specialization</label>
              <input
                type="text"
                value={education.specialization}
                onChange={(e) => handleInputChange(e, setEducation, 'specialization', true)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Course Duration</label>
              <input
                type="text"
                value={education.duration}
                onChange={(e) => handleInputChange(e, setEducation, 'duration', true)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Course Type</label>
              <select
                value={education.type}
                onChange={(e) => handleInputChange(e, setEducation, 'type', true)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Distance Learning">Distance Learning</option>
              </select>
            </div>
          </div>
        </Popup>
      )}

      {/* IT Skills Popup */}
      {activePopup === 'itSkills' && (
        <Popup title="Edit IT Skills" onSave={() => handleSave('itSkills')}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Skill/Software Name</label>
              <input
                type="text"
                value={itSkills.name}
                onChange={(e) => handleInputChange(e, setItSkills, 'name', true)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Software Version</label>
              <input
                type="text"
                value={itSkills.version}
                onChange={(e) => handleInputChange(e, setItSkills, 'version', true)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last Used</label>
              <input
                type="text"
                value={itSkills.lastUsed}
                onChange={(e) => handleInputChange(e, setItSkills, 'lastUsed', true)}
                placeholder="e.g. 2023 or Current"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Experience</label>
              <input
                type="text"
                value={itSkills.experience}
                onChange={(e) => handleInputChange(e, setItSkills, 'experience', true)}
                placeholder="e.g. 2 years"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </Popup>
      )}

      {/* Project Popup */}
      {activePopup === 'project' && (
        <Popup title="Edit Project" onSave={() => handleSave('project')}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleInputChange(e, setProject, 'title', true)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Client</label>
              <input
                type="text"
                value={project.client}
                onChange={(e) => handleInputChange(e, setProject, 'client', true)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Project Status</label>
              <select
                value={project.status}
                onChange={(e) => handleInputChange(e, setProject, 'status', true)}
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
                onChange={(e) => handleInputChange(e, setProject, 'workedFrom', true)}
                placeholder="e.g. Jan 2022 - Dec 2022"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Project Details</label>
              <textarea
                value={project.details}
                onChange={(e) => handleInputChange(e, setProject, 'details', true)}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </Popup>
      )}

      {/* Profile Summary Popup */}
      {activePopup === 'profileSummary' && (
        <Popup title="Edit Profile Summary" onSave={() => handleSave('profileSummary')}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">About You</label>
            <textarea
              value={profileSummary}
              onChange={(e) => setProfileSummary(e.target.value)}
              rows="8"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Write a summary highlighting your key skills, experience, and achievements..."
            />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ApplicantProfile;