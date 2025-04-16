import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import api from "../services/api";

const AProfileUpdate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    logo: null
  });
  
  useEffect(() => {
    // Load user data from localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          mobile: user.mobile || "",
          address: user.address || "",
          logo: null // We don't set the file object, just the preview
        });
        
        // Set logo preview if exists
        if (user.logo) {
          setLogoPreview(
            user.logo.startsWith('http') 
              ? user.logo 
              : `http://localhost:5000/${user.logo}`
          );
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      // For handling file uploads, we need to use FormData
      const updateData = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          updateData.append(key, formData[key]);
        }
      });
      
      // Call the backend API
      const response = await api.put('/users/update', updateData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        // Update the user data in localStorage
        const updatedUser = response.data.user;
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        
        localStorage.setItem("user", JSON.stringify({
          ...currentUser,
          name: updatedUser.name,
          email: updatedUser.email,
          mobile: updatedUser.mobile,
          address: updatedUser.address,
          logo: updatedUser.logo
        }));
        
        // Navigate back to profile
        navigate("/applicant-profile");
      } else {
        setError("Update failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="relative bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        {/* Close Button */}
        <button
          onClick={() => navigate("/applicant-profile")}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Update Profile</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
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
              placeholder="Enter Email ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AProfileUpdate;
