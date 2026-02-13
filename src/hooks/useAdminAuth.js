import { adminAuthAPI } from '../services/adminAuthAPI';
import { useEffect, useState } from 'react';

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Check if admin is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthChecking(true);
      if (adminAuthAPI.isLoggedIn()) {
        try {
          const isValid = await adminAuthAPI.verifyToken();
          if (isValid) {
            const profile = await adminAuthAPI.getProfile();
            setAdmin(profile.admin);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          setIsAuthenticated(false);
        }
      }
      setIsAuthChecking(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await adminAuthAPI.login(email, password);
      setAdmin(response.admin);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setIsAuthenticated(false);
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
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    admin,
    loading,
    isAuthenticated,
    isAuthChecking,
    login,
    logout
  };
};
