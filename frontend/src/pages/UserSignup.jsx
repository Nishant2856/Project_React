import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import api from "../services/api";

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    role: "user", // Default role for applicants
    logo: null
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("experienced"); // Default to experienced
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    const applicantAuth = localStorage.getItem("applicantAuth");
    
    if (token && applicantAuth === "true") {
      navigate("/ajob");
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

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.mobile) {
      setError("All fields are required");
      return false;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
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
      
      // Explicitly add each field to FormData to ensure they are included
      signupData.append('name', formData.name);
      signupData.append('email', formData.email);
      signupData.append('password', formData.password);
      signupData.append('mobile', formData.mobile);
      signupData.append('address', formData.address || '');
      signupData.append('role', 'user');
      signupData.append('userType', userType);
      
      // Add logo if exists
      if (formData.logo) {
        signupData.append('logo', formData.logo);
      }
      
      // Debug: Log the form data being sent
      console.log("Form data:", {
        name: formData.name,
        email: formData.email,
        password: formData.password ? "***" : "missing",
        mobile: formData.mobile,
        userType: userType
      });
      
      // We can't directly log FormData contents, so let's log each key
      const formDataEntries = {};
      for (let [key, value] of signupData.entries()) {
        formDataEntries[key] = value instanceof File ? value.name : (key === 'password' ? "***" : value);
      }
      console.log("FormData entries:", formDataEntries);
      
      // Call the backend API
      const response = await api.post('/users/signup', signupData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        // Store the token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("applicantAuth", "true");
        
        // Redirect to the dashboard
        navigate("/ajob");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      console.error("Error details:", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4 py-8">
      <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl flex gap-6">
        {/* Cut Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        {/* Left Card - Compact Info */}
        <div className="bg-white shadow-md rounded-lg p-4 w-72 flex flex-col items-center text-center">
          <img src="/login.jpeg" alt="Info" className="h-50 mb-2" />
          <h3 className="text-md font-semibold text-gray-800 mb-1">
            New to Job?
          </h3>
          <ul className="text-sm text-gray-600 space-y-1 leading-tight">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> One-click apply
              using Naukri profile.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Get relevant job
              recommendations.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Showcase profile
              to top companies.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span> Track application
              status.
            </li>
          </ul>
        </div>

        {/* Right Section - Signup Form */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Create your Job profile
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Search & apply to jobs from India's No.1 Job Site
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="What is your name?"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                placeholder="Tell us your Email ID"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter Your Address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="block text-gray-700 font-medium">Profile Picture</label>
              <div className="flex items-center space-x-4">
                {logoPreview && (
                  <div className="w-16 h-16 overflow-hidden rounded-full border border-gray-300">
                    <img 
                      src={logoPreview} 
                      alt="Profile Preview" 
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

            <div className="flex items-center space-x-4">
              <div 
                className={`border p-3 rounded-lg flex-1 text-center cursor-pointer hover:bg-gray-200 ${userType === 'experienced' ? 'bg-blue-50 border-blue-400' : ''}`}
                onClick={() => handleUserTypeChange('experienced')}
              >
                <p className="text-sm font-medium">I'm experienced</p>
                <span className="text-xs text-gray-500">
                  I have work experience
                </span>
              </div>
              <div 
                className={`border p-3 rounded-lg flex-1 text-center cursor-pointer hover:bg-gray-200 ${userType === 'fresher' ? 'bg-blue-50 border-blue-400' : ''}`}
                onClick={() => handleUserTypeChange('fresher')}
              >
                <p className="text-sm font-medium">I'm fresher</p>
                <span className="text-xs text-gray-500">
                  No work experience
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-gray-700 text-sm">
              <input type="checkbox" className="cursor-pointer" />
              <label>
                Send me important updates & promotions via SMS, email, and
                WhatsApp
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register Now"}
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
