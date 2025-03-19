import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaTrash } from "react-icons/fa";

const applicants = [
  {
    id: 1,
    name: "NISHANT",
    email: "nkumar186@rku.ac.in",
    phone: "1234567809",
    timeAgo: "1 day ago",
  },
  {
    id: 2,
    name: "Zabed",
    email: "iinzmam655@rku.ac.in",
    phone: "1234567809",
    timeAgo: "1 day ago",
  },
  {
    id: 3,
    name: "Abdul",
    email: "aabubakar374@rku.ac.in",
    phone: "1234567809",
    timeAgo: "1 day ago",
  },
];

const AdminApplicant = () => {
  const [applicantsList, setApplicantsList] = useState(applicants);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Function to delete an applicant
  const handleDelete = (id) => {
    setApplicantsList(applicantsList.filter((applicant) => applicant.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="w-7/8 lg:w-3/4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Applicants List</h2>

        {applicantsList.length > 0 ? (
          applicantsList.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center mb-6"
            >
              {/* Profile Section */}
              <div className="flex items-center space-x-20">
                <img
                  src="/profile.jpg"
                  alt="User Avatar"
                  className="h-14 w-14 rounded-full border-2 border-blue-400"
                />
                <div>
                  <h3 className="text-lg font-bold">{applicant.name}</h3>
                  <div className="text-gray-600 flex items-center space-x-2">
                    <FaEnvelope className="text-gray-500" />
                    <span>{applicant.email}</span>
                  </div>
                  <div className="text-gray-600 flex items-center space-x-2">
                    <FaPhone className="text-gray-500" />
                    <span>{applicant.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-20">
                {/* Resume Button */}
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition"
                  onClick={() => setSelectedApplicant(applicant)}
                >
                  Resume/Document
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(applicant.id)}
                  className="p-3 rounded-full bg-red-100 hover:bg-red-200 transition shadow-md"
                >
                  <FaTrash className="text-red-600 text-lg" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No applicants found.</p>
        )}

        {/* Show Profile Detail Modal */}
        {selectedApplicant && (
          <ProfileDetailsModal
            applicant={selectedApplicant}
            onClose={() => setSelectedApplicant(null)}
          />
        )}
      </div>
    </div>
  );
};

// Profile Details Modal Component
const ProfileDetailsModal = ({ applicant, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-70 flex justify-center items-center overflow-y-auto">
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
          Profile Details
        </h2>

        {/* Profile Section */}
        <div className="flex items-center space-x-8 mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <img
            src="/profile.jpg"
            alt="User Avatar"
            className="h-24 w-24 rounded-full border-4 border-blue-400"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{applicant.name}</h3>
            <div className="text-gray-600 flex items-center space-x-2 mt-2">
              <FaEnvelope className="text-gray-500" />
              <span>{applicant.email}</span>
            </div>
            <div className="text-gray-600 flex items-center space-x-2 mt-2">
              <FaPhone className="text-gray-500" />
              <span>{applicant.phone}</span>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="space-y-8 flex-grow overflow-y-auto px-2">
          {/* Resume Section */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold mb-3">Resume</h3>
            <hr className="border-gray-300 mb-4" />
            <p>Here is the resume of {applicant.name}</p>
            <button className="mt-3 text-blue-600 underline hover:text-blue-800">
              SHOW
            </button>
          </div>

          {/* Key Skills */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold mb-3">Key Skills</h3>
            <hr className="border-gray-300 mb-4" />
            <p>Currently no data</p>
          </div>

          {/* Education */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold mb-3">Education</h3>
            <hr className="border-gray-300 mb-4" />
            <p>Currently no data</p>
          </div>

          {/* IT Skills */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold mb-3">IT Skills</h3>
            <hr className="border-gray-300 mb-4" />
            <p>Currently no data</p>
          </div>

          {/* Projects */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300">
            <h3 className="text-lg font-bold mb-3">Project</h3>
            <hr className="border-gray-300 mb-4" />
            <p>Currently no data</p>
          </div>

          {/* Profile Summary */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300 mb-4">
            <h3 className="text-lg font-bold mb-3">Profile Summary</h3>
            <hr className="border-gray-300 mb-4" />
            <p>Currently no data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicant;
