import api from './api';

const companyService = {
  async getAllCompanies() {
    try {
      const response = await api.get('/companies');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async getCompanyById(id) {
    try {
      const response = await api.get(`/companies/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async createCompanyProfile(companyData) {
    try {
      const response = await api.post('/companies', companyData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async updateCompanyProfile(id, companyData) {
    try {
      const response = await api.put(`/companies/${id}`, companyData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async deleteCompanyProfile(id) {
    try {
      const response = await api.delete(`/companies/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async searchCompanies(params) {
    try {
      const response = await api.get('/companies/search', { params });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default companyService; 