import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import api from "../services/api";

const CompanySignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    about: "",
    industry: "Technology",
    location: "Remote",
    website: "",
    size: "1-10",
    role: "company", 
    logo: null
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const companySizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
  const industries = ["Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing", "Other"];

  useEffect(() => {
    // Check if company is already logged in
    const token = localStorage.getItem("token");
    const companyAuth = localStorage.getItem("companyAuth");
    
    if (token && companyAuth === "true") {
      navigate("/company/add-job");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      // Make sure it's an image
      if (!e.target.files[0].type.match('image.*')) {
        setError('Please upload an image file');
        return;
      }
      
      // Check file size (max 2MB)
      if (e.target.files[0].size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
      }
      
      setFormData({
        ...formData,
        logo: e.target.files[0]
      });
      
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.mobile) {
      setError("All fields marked with * are required");
      return false;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Basic website validation (optional field)
    if (formData.website && !formData.website.includes('.')) {
      setError("Please enter a valid website URL");
      return false;
    }
    
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // For handling file uploads, we need to use FormData
      const signupData = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          signupData.append(key, formData[key]);
        }
      });
      
      // Call the backend API
      const response = await api.post('/companies/signup', signupData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        // Store the token and company data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("company", JSON.stringify(response.data.company));
        localStorage.setItem("companyAuth", "true");
        
        // Redirect to the dashboard
        navigate("/company/add-job");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 py-10">
      <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-lg py-10">
        {/* Cut Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        {/* Form Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Create your Company profile
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Connect with top applicants to find the best talent
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-gray-700 font-medium">Company Name *</label>
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
            <label className="block text-gray-700 font-medium">Email ID *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Company email address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Mobile Number *</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Contact number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium">Company Size</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {companySizes.map(size => (
                  <option key={size} value={size}>{size} employees</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Company location"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Company website URL"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Describe your company and its culture"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>
          </div>

          {/* Upload Logo */}
          <div>
            <label className="block text-gray-700 font-medium">Company Logo</label>
            <div className="flex items-center space-x-4">
              {logoPreview && (
                <div className="w-16 h-16 overflow-hidden rounded-lg border border-gray-300">
                  <img 
                    src={logoPreview} 
                    alt="Logo Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center border rounded-lg p-2">
                  <span className="text-gray-500 mr-2">📁</span>
                  <input 
                    type="file" 
                    className="w-full text-gray-500 cursor-pointer"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Max 2MB, image files only (.jpg, .png, .gif)</p>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/company-login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySignup;
