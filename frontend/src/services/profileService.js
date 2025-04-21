import api from './api';

const profileService = {
  async getMyProfile() {
    try {
      const response = await api.get('/profiles/my-profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error.response?.data || { message: 'Failed to load profile data' };
    }
  },

  async getProfileById(userId) {
    try {
      const response = await api.get(`/profiles/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile by ID:', error);
      throw error.response?.data || { message: 'Failed to load profile data' };
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put('/profiles/update', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  async uploadResume(formData) {
    try {
      const response = await api.put('/profiles/update-with-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error.response?.data || { message: 'Failed to upload resume' };
    }
  },

  async addProject(projectData) {
    try {
      const response = await api.post('/profiles/projects', projectData);
      return response.data;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error.response?.data || { message: 'Failed to add project' };
    }
  },

  async updateProject(projectId, projectData) {
    try {
      const response = await api.put(`/profiles/projects/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error.response?.data || { message: 'Failed to update project' };
    }
  },

  async deleteProject(projectId) {
    try {
      const response = await api.delete(`/profiles/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error.response?.data || { message: 'Failed to delete project' };
    }
  },

  getResumeUrl(userId) {
    return `${api.defaults.baseURL}/profiles/resume/${userId}`;
  }
};

export default profileService; 