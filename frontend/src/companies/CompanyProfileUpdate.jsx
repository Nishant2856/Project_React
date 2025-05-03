import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import api from "../services/api";

const CompanyProfileUpdate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    about: "",
    industry: "",
    size: "",
    location: "",
    website: "",
    logo: null
  });

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await api.get('/companies/me/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        const company = response.data.company;
        setFormData({
          name: company.name || "",
          email: company.user?.email || "",
          mobile: company.user?.mobile || "",
          about: company.description || "",
          industry: company.industry || "",
          size: company.size || "",
          location: company.location || "",
          website: company.website || "",
          logo: null
        });
      }
    } catch (error) {
      setError("Error loading profile: " + (error.response?.data?.message || error.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      logo: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Log the form data for debugging
      console.log('Sending form data:', Object.fromEntries(formDataToSend));

      const response = await api.put('/companies/me/profile', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Update localStorage with new company data
        const companyString = localStorage.getItem("company");
        if (companyString) {
          const company = JSON.parse(companyString);
          company.name = formData.name;
          if (response.data.company.logo) {
            company.logo = response.data.company.logo;
          }
          localStorage.setItem("company", JSON.stringify(company));
        }
        
        navigate("/company/profile");
      } else {
        setError("Failed to update profile");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError("Error updating profile: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 py-10">
      <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-lg py-10">
        {/* Close Button */}
        <button
          onClick={() => navigate("/company/profile")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        {/* Form Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Update your Company profile
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Keep your company details up-to-date
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Company Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="What is your company name?"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tell us your Email ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="What industry is your company in?"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Company Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="How many employees?"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where is your company located?"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Your company website"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Describe your company"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Upload Logo */}
          <div>
            <label className="block text-gray-700 font-medium">Company Logo</label>
            <div className="flex items-center border rounded-lg p-2">
              <span className="text-gray-500 mr-2">📁</span>
              <input 
                type="file" 
                name="logo"
                onChange={handleFileChange}
                className="w-full text-gray-500 cursor-pointer" 
                accept="image/*"
              />
            </div>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfileUpdate;
