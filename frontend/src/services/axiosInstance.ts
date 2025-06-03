
import axios, { type AxiosInstance, AxiosError } from 'axios';
import { store } from '../redux/store';
import { setUser,clearUser } from '../redux/slices/authSlice';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const state = store.getState();
      const refreshToken = state.auth.refreshToken;
      if (refreshToken) {
        try {
          const response = await axiosInstance.post<{ data: { accessToken: string } }>(
            '/auth/refresh',
            { refreshToken }
          );
          const { accessToken } = response.data.data;
          if (state.auth.user && state.auth.refreshToken) {
            store.dispatch(
              setUser({
                user: state.auth.user,
                accessToken,
                refreshToken: state.auth.refreshToken,
              })
            );
          }
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          store.dispatch(clearUser());
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;