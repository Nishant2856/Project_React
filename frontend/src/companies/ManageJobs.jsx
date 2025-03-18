import React from "react";

const jobs = [
  {
    id: 1,
    title: "Senior AR Caller - Experienced",
    date: "28 Jan 2025",
  },
  {
    id: 2,
    title: "International Chat Process - Non Voice",
    date: "28 Jan 2025",
  },
  {
    id: 3,
    title: "Back Office Executive",
    date: "28 Jan 2025",
  },
];

const ManageJobs = () => {
  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
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
            key={job.id}
            className="grid grid-cols-6 bg-white shadow-md rounded-lg p-4 mt-3 items-center text-center"
          >
            {/* Job Logo */}
            <div className="flex justify-center">
              <img src="/firstsource.gif" alt="Logo" className="h-10 w-10" />
            </div>

            {/* Job Title */}
            <div className="font-semibold">{job.title}</div>

            {/* Date */}
            <div className="text-gray-500">{job.date}</div>

            {/* Visibility (Blue check) */}
            <div className="flex justify-center">
              <div className="h-8 w-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md">
                ✔
              </div>
            </div>

            {/* Update Button */}
            <button className="bg-blue-500 text-white px-2 py-2 rounded-md font-semibold hover:bg-blue-600 w-25 mx-15">
              UPDATE
            </button>

            {/* Delete Button */}
            <button className="bg-red-500 text-white px-2 py-2 rounded-md font-semibold hover:bg-red-600 w-25 mx-15">
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;
