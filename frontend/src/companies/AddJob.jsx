import React, { useState } from "react";

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    years: "",
    salary: "",
    location: "",
    timeAvailability: "",
    contact: "",
    description: "",
    educationInfo: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Added:", formData);
    alert("Job Added Successfully!");
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Fill Details to Add Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your Job Title"
            className="w-full px-4 py-2 border bg-yellow-200 rounded-lg"
            required
          />

          <input
            type="number"
            name="years"
            value={formData.years}
            onChange={handleChange}
            placeholder="Enter years for hiring (eg: 1-4)"
            className="w-full px-4 py-2 border bg-yellow-200 rounded-lg"
            required
          />

          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter Payment (eg: 2-6.25 LPA)"
            className="w-full px-4 py-2 border bg-yellow-200 rounded-lg"
            required
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter full Job Location"
            className="w-full px-4 py-2 border bg-yellow-200 rounded-lg"
            required
          />

          <input
            type="text"
            name="timeAvailability"
            value={formData.timeAvailability}
            onChange={handleChange}
            placeholder="Enter time availability"
            className="w-full px-4 py-2 border bg-yellow-200 rounded-lg"
            required
          />

          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact details"
            className="w-full px-4 py-2 border bg-yellow-200 rounded-lg"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter everything about the job "
            className="w-full px-4 py-2 border bg-yellow-200 rounded-lg"
            rows="3"
            required
          ></textarea>

          <input
            type="text"
            name="educationInfo"
            value={formData.educationInfo}
            onChange={handleChange}
            placeholder="Education info"
            className="w-full px-4 py-2 border bg-yellow-200 rounded-lg"
            required
          />

          {/* Centered Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="w-40 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Adds spacing before footer */}
      <div className="h-20"></div>
    </div>
  );
};

export default AddJob;
