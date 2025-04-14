import api from './api';

const applicationService = {
  async getMyApplications() {
    try {
      const response = await api.get('/applicants/my-applications');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async getJobApplications(jobId) {
    try {
      const response = await api.get(`/applicants/job/${jobId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async applyForJob(jobId, applicationData) {
    try {
      const response = await api.post(`/applicants/${jobId}`, applicationData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async updateApplicationStatus(applicationId, status) {
    try {
      const response = await api.put(`/applicants/${applicationId}`, { status });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async withdrawApplication(applicationId) {
    try {
      const response = await api.delete(`/applicants/${applicationId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default applicationService; 