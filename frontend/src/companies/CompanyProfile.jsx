import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaInfoCircle, FaSignOutAlt, FaPen } from "react-icons/fa";

const CompanyProfile = ({ setIsCompanyLoggedIn }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("companyAuth");  // ✅ Clear auth
    setIsCompanyLoggedIn(false);  // ✅ Update state

    setTimeout(() => {
      navigate("/");  // ✅ Navigate after state updates
    }, 100);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
      <div className="w-full flex justify-between items-center p-4 bg-white shadow-md rounded-2xl">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">
            Welcome, <span className="text-black">Firstsource</span>
          </h1>
          <img src="/firstsource.gif" alt="Company Logo" className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-md" />
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold flex items-center hover:bg-red-600 ml-auto"
        >
          <FaSignOutAlt className="mr-2" /> Sign Out
        </button>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg mt-12 flex items-center w-3/4 relative">
        <div className="mr-8">
          <img src="/firstsource.gif" alt="Company Logo" className="h-44 w-44 rounded-full border-4 border-gray-300 shadow-lg" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Firstsource</h2>
          <hr className="my-2 border-gray-300" />
          <div className="flex items-center space-x-8">
            <div className="text-lg">
              <p className="flex items-center text-gray-600 mb-2">
                <FaPhone className="mr-3 text-blue-500" /> 4512762145
              </p>
              <p className="flex items-center text-gray-600">
                <FaEnvelope className="mr-3 text-blue-500" />
                firstsource123@gmail.com
              </p>
            </div>
            <div className="border-l-2 border-gray-300 pl-6 text-lg">
              <p className="flex items-center text-gray-600">
                <FaInfoCircle className="mr-2 text-blue-500" />
                Firstsource is purpose-led and people-first. We create value for our global clients by elevating their customers’ experience at every interaction, be it a call, click, tap, message, or chat.
              </p>
            </div>
          </div>
        </div>
        <FaPen className="absolute top-4 right-4 text-gray-500 cursor-pointer text-xl hover:text-blue-500" />
      </div>
    </div>
  );
};

export default CompanyProfile;
