import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    // Don't override Content-Type if it's multipart/form-data
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      // For multipart form data, the browser will set the proper Content-Type with boundary
      delete config.headers['Content-Type'];
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Setting Authorization header for ${config.url}`, config.headers.Authorization.substring(0, 15) + '...');
    } else {
      console.warn(`No token available for request to ${config.url}`);
    }
    
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`, config.data || '');
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`API Response [${response.status}]`, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.warn('Authentication error detected. User logged out.');
      // Maybe we don't want to redirect on every 401
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 