import api from './api';

const jobService = {
  async getAllJobs() {
    try {
      const response = await api.get('/jobs');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async getJobById(id) {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async createJob(jobData) {
    try {
      const response = await api.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async updateJob(id, jobData) {
    try {
      const response = await api.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async deleteJob(id) {
    try {
      const response = await api.delete(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async searchJobs(params) {
    try {
      const response = await api.get('/jobs/search', { params });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default jobService; 