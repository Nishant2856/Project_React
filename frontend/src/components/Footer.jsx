import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiInfo, FiHelpCircle, FiShield, FiBriefcase, FiX } from "react-icons/fi";

const Footer = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [reportType, setReportType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const openPopup = (popupName) => {
    setActivePopup(popupName);
  };

  const openReportPopup = (type) => {
    setReportType(type);
    setActivePopup('report');
  };

  const closePopup = () => {
    setActivePopup(null);
    setFormData({
      name: "",
      email: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Report submitted:", { reportType, ...formData });
    closePopup();
    alert(`Thank you for your ${reportType} report. We'll look into it.`);
  };

  // Popup content with close buttons
  const popups = {
    about: (
      <div>
        <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b">
          <h3 className="text-xl font-bold flex items-center">
            <FiInfo className="mr-2" /> About Job Vault
          </h3>
          <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <div className="p-4">
          <p className="mb-3">
            Job Vault is a leading job portal connecting talented professionals with top employers across various industries.
          </p>
          <p className="mb-3">
            Our mission is to simplify the job search process while helping companies find the perfect candidates efficiently.
          </p>
          <p>
            Since our launch, we've successfully matched thousands of job seekers with their dream jobs and helped hundreds of companies build their teams.
          </p>
        </div>
      </div>
    ),
    careers: (
      <div>
        <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b">
          <h3 className="text-xl font-bold flex items-center">
            <FiBriefcase className="mr-2" /> Careers at Job Vault
          </h3>
          <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <div className="p-4">
          <p className="mb-3">
            Join our team and help shape the future of recruitment! We're always looking for passionate individuals.
          </p>
          <p className="mb-3 font-semibold">
            Current openings:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Frontend Developer (React/Next.js)</li>
            <li>Backend Engineer (Node.js)</li>
            <li>UX/UI Designer</li>
            <li>Customer Support Specialist</li>
          </ul>
          <p className="mt-3">
            Send your resume to: careers@jobvault.com
          </p>
        </div>
      </div>
    ),
    help: (
      <div>
        <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b">
          <h3 className="text-xl font-bold flex items-center">
            <FiHelpCircle className="mr-2" /> Help Center
          </h3>
          <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <div className="p-4">
          <p className="mb-3">
            We're here to help you with any questions or issues you might encounter.
          </p>
          <p className="mb-3 font-semibold">
            Frequently Asked Questions:
          </p>
          <ul className="space-y-2">
            <li className="border-b pb-2">
              <strong>How do I apply for jobs?</strong>
              <p className="text-sm mt-1">Create an account, complete your profile, and click "Apply" on any job posting.</p>
            </li>
            <li className="border-b pb-2">
              <strong>How can companies post jobs?</strong>
              <p className="text-sm mt-1">Register as an employer, verify your company, and use our dashboard to post jobs.</p>
            </li>
            <li>
              <strong>Is there a mobile app?</strong>
              <p className="text-sm mt-1">Yes! Available on both iOS and Android platforms.</p>
            </li>
          </ul>
          <p className="mt-3">
            Contact support: help@jobvault.com
          </p>
        </div>
      </div>
    ),
    trust: (
      <div>
        <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b">
          <h3 className="text-xl font-bold flex items-center">
            <FiShield className="mr-2" /> Trust & Safety
          </h3>
          <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <div className="p-4">
          <p className="mb-3">
            Your security is our top priority. We implement robust measures to ensure safe job searching and hiring.
          </p>
          <p className="mb-3 font-semibold">
            Our security features:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Rigorous company verification process</li>
            <li>End-to-end encrypted communications</li>
            <li>Regular security audits</li>
            <li>Fraud detection systems</li>
            <li>Secure document handling</li>
          </ul>
          <p className="mt-3 text-sm">
            Report any suspicious activity immediately through our reporting system.
          </p>
        </div>
      </div>
    ),
    report: (
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center sticky top-0 bg-white p-4 border-b">
          <h3 className="text-xl font-bold">
            Report {reportType === "fraud" ? "Fraud" : "Issue"}
          </h3>
          <button
            onClick={closePopup}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {reportType === "fraud" ? "Fraud Details" : "Issue Description"}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                reportType === "fraud"
                  ? "Please provide details about the fraudulent activity..."
                  : "Please describe the issue you're experiencing..."
              }
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 p-4 border-t">
            <button
              type="button"
              onClick={closePopup}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Report
            </button>
          </div>
        </div>
      </form>
    )
  };

  return (
    <>
      <footer className="bg-white text-black py-10 mt-10 border-t">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <img src="/logo2.png" alt="Job Vault Logo" className="w-20 mb-2" />
            <h1 className="text-xl font-bold">JOB VAULT</h1>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => openPopup('about')}
                  className="hover:underline text-left w-full"
                >
                  About us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPopup('careers')}
                  className="hover:underline text-left w-full"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPopup('help')}
                  className="hover:underline text-left w-full"
                >
                  Help center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openReportPopup('issue')}
                  className="hover:underline text-left w-full"
                >
                  Report issues
                </button>
              </li>
            </ul>

            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => openReportPopup('fraud')}
                  className="hover:underline text-left w-full"
                >
                  Report fraud
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPopup('trust')}
                  className="hover:underline text-left w-full"
                >
                  Trust & safety
                </button>
              </li>
            </ul>
          </div>

          {/* Company Logos */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <img
              src="/airtel.gif"
              alt="Airtel"
              className="w-12 h-12 object-contain"
            />
            <img
              src="/firstsource.gif"
              alt="Firstsource"
              className="w-12 h-12 object-contain"
            />
            <img
              src="/reliance.gif"
              alt="Reliance"
              className="w-12 h-12 object-contain"
            />
            <img
              src="/amazon.gif"
              alt="Amazon"
              className="w-12 h-12 object-contain"
            />
            <img
              src="/apple.gif"
              alt="Apple"
              className="w-12 h-12 object-contain"
            />
            <img src="/jio.gif" alt="Jio" className="w-12 h-12 object-contain" />
            <img
              src="/hitachi.gif"
              alt="Hitachi Energy"
              className="w-12 h-12 object-contain"
            />
            <img src="/tcs.gif" alt="TCS" className="w-12 h-12 object-contain" />
          </div>
        </div>

        {/* Privacy Policy & Copyright Section */}
        <div className="text-center text-sm mt-6 border-t pt-4">
          <p>© {new Date().getFullYear()} Job Vault. All Rights Reserved.</p>
          <Link to="#" className="hover:underline font-semibold">
            Terms & Conditions
          </Link>
        </div>
      </footer>

      {/* Popup Modal */}
      {activePopup && (
        <div className="fixed inset-0 bg-blue-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            {popups[activePopup]}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;