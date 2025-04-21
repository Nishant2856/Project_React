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
      console.log('Applying for job:', jobId, 'with data:', applicationData);
      
      if (!jobId) {
        console.error('No job ID provided');
        throw { message: 'Job ID is required' };
      }
      
      // Verify user is logged in and has a valid ID
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token available');
        throw { message: 'Authentication required' };
      }
      
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        console.error('No user data available');
        throw { message: 'User data required' };
      }
      
      try {
        const user = JSON.parse(userStr);
        const userId = user.id || user._id;
        if (!userId) {
          console.error('User missing ID property:', user);
          throw { message: 'Invalid user profile. Please log out and log in again.' };
        }
        console.log('Applying as user:', userId);
      } catch (err) {
        console.error('Error parsing user data:', err);
        throw { message: 'Invalid user data. Please log out and log in again.' };
      }
      
      const response = await api.post(`/applicants/${jobId}`, applicationData);
      console.log('Application response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Application error:', error);
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw error.response.data;
      }
      
      throw { message: error.message || 'Failed to apply for job' };
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