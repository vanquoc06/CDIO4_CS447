import { createContext, useContext, useState, useEffect } from 'react';
import { registerAPI, loginAPI, getAuthToken, clearAuthToken } from '../api/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('illitf1_user');
    const token = getAuthToken();
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('illitf1_user');
        clearAuthToken();
      }
    }
    setLoading(false);
  }, []);

  const register = async (email, password, fullName, phoneNumber = '') => {
    try {
      const userData = await registerAPI(email, password, fullName, phoneNumber);
      
      // Auto login after successful registration
      setUser(userData);
      localStorage.setItem('illitf1_user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userData = await loginAPI(email, password);
      
      setUser(userData);
      localStorage.setItem('illitf1_user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('illitf1_user');
    clearAuthToken();
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
