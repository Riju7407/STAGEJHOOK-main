// Admin Auth API Client
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('adminToken');

const setAuthToken = (token) => localStorage.setItem('adminToken', token);

const removeAuthToken = () => localStorage.removeItem('adminToken');

const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include' // Include cookies in requests
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

export const adminAuthAPI = {
  // Login Admin
  login: async (email, password) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (data.token) {
      setAuthToken(data.token);
    }

    return data;
  },

  // Logout Admin
  logout: async () => {
    try {
      await apiCall('/auth/logout', {
        method: 'POST'
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      removeAuthToken();
      // Also clear any other cached data
      localStorage.clear();
    }
  },

  // Get Admin Profile
  getProfile: async () => {
    return await apiCall('/auth/profile');
  },

  // Verify Token
  verifyToken: async () => {
    try {
      const data = await apiCall('/auth/verify', {
        method: 'POST'
      });
      return data.success;
    } catch (error) {
      removeAuthToken();
      return false;
    }
  },

  // Check if Admin is Logged In
  isLoggedIn: () => !!getAuthToken(),

  // Get Stored Token
  getToken: getAuthToken
};
