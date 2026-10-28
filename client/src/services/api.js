import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const projectService = {
  getProjects: async (params = {}) => {
    const response = await apiClient.get('/projects', { params });
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },
};

export const contactService = {
  submitMessage: async (formData) => {
    const response = await apiClient.post('/contact', formData);
    return response.data;
  },
};

export const healthService = {
  checkHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default apiClient;

