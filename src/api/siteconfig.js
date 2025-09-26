import axios from 'axios';
import LS from '@/Module/Global/Services/ls.js';
import Authanticated from '@/Module/Global/Services/auth.js';

var instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 120000,
});
instance.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = LS.get('auth.token', true);
    if (AUTH_TOKEN) {
      config.headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
    }
    
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
