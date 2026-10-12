import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || '/api/v1';

export const apiClient = axios.create({
  baseURL: `${API_URL}${API_BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authAPI = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (email, password, full_name) =>
    apiClient.post('/auth/register', { email, password, full_name }),
  getMe: () => apiClient.get('/auth/me'),
};

// Roads
export const roadsAPI = {
  list: () => apiClient.get('/roads'),
  get: (id) => apiClient.get(`/roads/${id}`),
  create: (data) => apiClient.post('/roads', data),
  update: (id, data) => apiClient.put(`/roads/${id}`, data),
  delete: (id) => apiClient.delete(`/roads/${id}`),
};

// Intersections
export const intersectionsAPI = {
  list: () => apiClient.get('/intersections'),
  get: (id) => apiClient.get(`/intersections/${id}`),
  create: (data) => apiClient.post('/intersections', data),
  update: (id, data) => apiClient.put(`/intersections/${id}`, data),
  delete: (id) => apiClient.delete(`/intersections/${id}`),
};

// Traffic Signals
export const signalsAPI = {
  list: () => apiClient.get('/signals'),
  get: (id) => apiClient.get(`/signals/${id}`),
  create: (data) => apiClient.post('/signals', data),
  update: (id, data) => apiClient.put(`/signals/${id}`, data),
  optimize: (id) => apiClient.post(`/signals/${id}/optimize`),
};

// Sensors
export const sensorsAPI = {
  list: () => apiClient.get('/sensors'),
  get: (id) => apiClient.get(`/sensors/${id}`),
  create: (data) => apiClient.post('/sensors', data),
  update: (id, data) => apiClient.put(`/sensors/${id}`, data),
  delete: (id) => apiClient.delete(`/sensors/${id}`),
};

// Traffic readings
export const trafficAPI = {
  dashboard: () => apiClient.get('/traffic/dashboard'),
  readings: () => apiClient.get('/traffic/readings'),
  createReading: (data) => apiClient.post('/traffic/readings', data),
};

// Incidents
export const incidentsAPI = {
  list: () => apiClient.get('/incidents'),
  get: (id) => apiClient.get(`/incidents/${id}`),
  create: (data) => apiClient.post('/incidents', data),
  update: (id, data) => apiClient.put(`/incidents/${id}`, data),
  delete: (id) => apiClient.delete(`/incidents/${id}`),
};

// Violations
export const violationsAPI = {
  list: () => apiClient.get('/violations'),
  get: (id) => apiClient.get(`/violations/${id}`),
  create: (data) => apiClient.post('/violations', data),
  update: (id, data) => apiClient.put(`/violations/${id}`, data),
};

// Emergency
export const emergencyAPI = {
  list: () => apiClient.get('/emergency'),
  get: (id) => apiClient.get(`/emergency/${id}`),
  create: (data) => apiClient.post('/emergency', data),
  update: (id, data) => apiClient.put(`/emergency/${id}`, data),
};

// Notifications
export const notificationsAPI = {
  list: () => apiClient.get('/notifications'),
  create: (data) => apiClient.post('/notifications', data),
};

// Routes
export const routesAPI = {
  recommend: (data) => apiClient.post('/routes/recommend', data),
};
