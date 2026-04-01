import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'Gani' }); 
    }
  }, []);

  const login = async (email, password) => {
    try {
      // FIX: Changed from '/login' to '/auth/login' to match your server.js
      const response = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user || { name: 'Gani' });
      return response.data; 
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      throw error; 
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
