import React, { useState } from 'react';
import { FiTrash2, FiCheckCircle } from 'react-icons/fi';

const AdminReport = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      reportText: 'User encountered payment failure multiple times despite sufficient balance. Needs urgent resolution.',
      date: '2024-03-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      reportText: 'Profile information not updating properly after multiple attempts. Technical issue needs investigation.',
      date: '2024-03-14'
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob@example.com',
      reportText: 'Application form submission error persists even after clearing cache and cookies.',
      date: '2024-03-13'
    }
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);

  const handleDelete = (id) => {
    setReports(reports.filter(report => report.id !== id));
    setShowDeleteModal(false);
  };

  const handleResolve = (id) => {
    setReports(reports.filter(report => report.id !== id));
    setShowResolveModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">User Reports</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{report.name}</h3>
                  <p className="text-sm text-gray-600">{report.email}</p>
                </div>
                <span className="text-sm text-gray-500">{report.date}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {report.reportText}
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setSelectedReport(report.id);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-700 flex items-center"
                >
                  <FiTrash2 className="mr-2" /> Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedReport(report.id);
                    setShowResolveModal(true);
                  }}
                  className="text-green-600 hover:text-green-700 flex items-center"
                >
                  <FiCheckCircle className="mr-2" /> Resolve
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {reports.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No reports found</p>
          </div>
        )}

        {/* Modals */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Delete Report?</h3>
              <p className="mb-4">Are you sure you want to delete this report?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedReport)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showResolveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Mark as Resolved?</h3>
              <p className="mb-4">Are you sure you want to mark this report as resolved?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowResolveModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleResolve(selectedReport)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Resolve
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReport;