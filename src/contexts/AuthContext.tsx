import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'walker';
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'owner' | 'walker';
  phone?: string;
  address?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and verify it
    const token = localStorage.getItem('stardogwalker_token');
    if (token) {
      authAPI.verifyToken()
        .then(response => {
          setUser(response.user);
        })
        .catch(() => {
          // Token is invalid, clear it
          localStorage.removeItem('stardogwalker_token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password);
    setUser(response.user);
    localStorage.setItem('stardogwalker_token', response.token);
  };

  const register = async (userData: RegisterData) => {
    const response = await authAPI.register(userData);
    setUser(response.user);
    localStorage.setItem('stardogwalker_token', response.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stardogwalker_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};