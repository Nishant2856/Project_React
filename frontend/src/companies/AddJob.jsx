import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [companyData, setCompanyData] = useState({
    name: "",
    logo: "/firstsource.gif" // Default logo
  });
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

  useEffect(() => {
    // Get company data from localStorage
    const companyString = localStorage.getItem("company");
    if (companyString) {
      try {
        const company = JSON.parse(companyString);
        setCompanyData({
          name: company.name || "Company",
          logo: company.logo ? (company.logo.startsWith("http") ? company.logo : `http://localhost:5000/${company.logo}`) : "/firstsource.gif"
        });
      } catch (error) {
        console.error("Error parsing company data:", error);
      }
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("You must be logged in to post a job");
        setLoading(false);
        return;
      }
      
      // Make the API call
      const response = await axios.post("http://localhost:5000/api/company-jobs", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Job Added Successfully:", response.data);
      alert("Job Added Successfully!");
      
      // Reset form after successful submission
      setFormData({
        title: "",
        years: "",
        salary: "",
        location: "",
        timeAvailability: "",
        contact: "",
        description: "",
        educationInfo: ""
      });
      
      // Navigate to manage jobs page
      navigate("/company/manage-jobs");
    } catch (err) {
      console.error("Error adding job:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 mb-4 overflow-hidden rounded-full">
            <img 
              src={companyData.logo} 
              alt={`${companyData.name} Logo`} 
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Add a New Job for {companyData.name}
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

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
            type="text"
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
            <button 
              type="submit" 
              className="w-40 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
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
