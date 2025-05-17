import axios from 'axios';
import { getAccessToken, getRefreshToken, saveTokens } from '../utils/auth';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: getRefreshToken(),
        });
        saveTokens(response.data.access, response.data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (err) {
        console.log('Token refresh failed');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
