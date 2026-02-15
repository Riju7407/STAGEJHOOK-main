import { adminAuthAPI } from '../services/adminAuthAPI';
import { useEffect, useState } from 'react';

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Check if admin is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthChecking(true);
      console.log('🔍 Checking authentication...');
      
      const storedToken = adminAuthAPI.getToken();
      if (storedToken) {
        console.log('✅ Token found in localStorage');
        setToken(storedToken);
        
        try {
          const isValid = await adminAuthAPI.verifyToken();
          if (isValid) {
            console.log('✅ Token is valid');
            const profile = await adminAuthAPI.getProfile();
            setAdmin(profile.admin);
            setIsAuthenticated(true);
          } else {
            console.log('❌ Token is invalid');
            setIsAuthenticated(false);
            setToken(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          setIsAuthenticated(false);
          setToken(null);
        }
      } else {
        console.log('❌ No token found in localStorage');
        setIsAuthenticated(false);
      }
      setIsAuthChecking(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      console.log('🔐 Attempting login...');
      const response = await adminAuthAPI.login(email, password);
      console.log('✅ Login response received:', response.admin.email);
      setAdmin(response.admin);
      setToken(response.token);
      setIsAuthenticated(true);
      console.log('✅ Token set and authenticated');
      return response;
    } catch (error) {
      console.error('❌ Login failed:', error);
      setIsAuthenticated(false);
      setToken(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await adminAuthAPI.logout();
      setAdmin(null);
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    admin,
    token,
    loading,
    isAuthenticated,
    isAuthChecking,
    login,
    logout
  };
};
