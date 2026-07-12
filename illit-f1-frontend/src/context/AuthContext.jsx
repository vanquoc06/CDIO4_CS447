import { createContext, useContext, useEffect, useState } from 'react';
import { loginAPI, registerAPI, getAuthToken, clearAuthToken } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem('illitf1_user');
    const token = getAuthToken();

    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem('illitf1_user');
        clearAuthToken();
      }
    }

    setBusy(false);
  }, []);

  const register = async (email, password, fullName, phoneNumber = '') => {
    setBusy(true);
    try {
      const created = await registerAPI(email, password, fullName, phoneNumber);
      setUser(created);
      window.localStorage.setItem('illitf1_user', JSON.stringify(created));
      return created;
    } finally {
      setBusy(false);
    }
  };

  const login = async (email, password) => {
    setBusy(true);
    try {
      const loggedIn = await loginAPI(email, password);
      setUser(loggedIn);
      window.localStorage.setItem('illitf1_user', JSON.stringify(loggedIn));
      return loggedIn;
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('illitf1_user');
    clearAuthToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        busy,
        register,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}