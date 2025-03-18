import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const employees = [
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

const EmployeeList = () => {
  return (
    <div className="bg-blue-50 min-h-screen p-6 flex justify-center">
      <div className="w-7/8 lg:w-3/4">
        <h2 className="text-2xl font-bold mb-6 text-center">Applicants List</h2>

        {employees.map((employee) => (
          <div
            key={employee.id}
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
                <h3 className="text-lg font-bold">{employee.name}</h3>
                <div className="text-gray-600 flex items-center space-x-2">
                  <FaEnvelope className="text-gray-500" />
                  <span>{employee.email}</span>
                </div>
                <div className="text-gray-600 flex items-center space-x-2">
                  <FaPhone className="text-gray-500" />
                  <span>{employee.phone}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-23">
              {/* Resume Button */}
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600">
                Resume/Document
              </button>

              {/* Accept & Reject in the Same Column */}
              <div className="flex flex-col  space-y-3">
                <button className="bg-blue-500 text-white px-8 py-2 rounded-md font-semibold hover:bg-blue-600">
                  Accept
                </button>
                <button className="bg-red-500 text-white px-8 py-2 rounded-md font-semibold hover:bg-red-600">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
