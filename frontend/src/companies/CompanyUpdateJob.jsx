import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CompanyUpdateJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
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
    
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("You must be logged in to update jobs");
        setLoading(false);
        return;
      }
      
      const response = await axios.get(`http://localhost:5000/api/company-jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const jobData = response.data.data;
      setFormData({
        title: jobData.title || "",
        years: jobData.years || "",
        salary: jobData.salary || "",
        location: jobData.location || "",
        timeAvailability: jobData.timeAvailability || "",
        contact: jobData.contact || "",
        description: jobData.description || "",
        educationInfo: jobData.educationInfo || ""
      });
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching job details:", err);
      setError(err.response?.data?.message || "Error fetching job details");
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");
    
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("You must be logged in to update jobs");
        setUpdating(false);
        return;
      }
      
      await axios.put(`http://localhost:5000/api/company-jobs/${jobId}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      
      alert("Job Updated Successfully!");
      navigate("/company/manage-jobs");
    } catch (err) {
      console.error("Error updating job:", err);
      setError(err.response?.data?.message || "Error updating job. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-blue-50 min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold">Loading job details...</div>
      </div>
    );
  }

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
            Update Job for {companyData.name}
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
            placeholder="Enter everything about the job"
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

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => navigate("/company/manage-jobs")}
              className="bg-gray-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Job"}
            </button>
          </div>
        </form>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default CompanyUpdateJob;
