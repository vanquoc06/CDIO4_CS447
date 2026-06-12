import { createContext, useContext, useState, useEffect } from 'react';

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
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('illitf1_user');
      }
    }
    setLoading(false);
  }, []);

  const register = async (email, password, fullName) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('illitf1_users') || '[]');
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
          reject(new Error('Email already registered'));
          return;
        }

        // Create new user
        const newUser = {
          id: Date.now().toString(),
          email,
          fullName,
          password, // In production, NEVER store plain passwords!
          createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem('illitf1_users', JSON.stringify(users));

        // Auto login after register
        const userSession = { id: newUser.id, email: newUser.email, fullName: newUser.fullName };
        setUser(userSession);
        localStorage.setItem('illitf1_user', JSON.stringify(userSession));
        
        resolve(userSession);
      }, 800);
    });
  };

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('illitf1_users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (!foundUser) {
          reject(new Error('Invalid email or password'));
          return;
        }

        const userSession = { id: foundUser.id, email: foundUser.email, fullName: foundUser.fullName };
        setUser(userSession);
        localStorage.setItem('illitf1_user', JSON.stringify(userSession));
        
        resolve(userSession);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('illitf1_user');
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
