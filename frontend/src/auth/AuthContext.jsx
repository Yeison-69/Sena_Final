import React, { createContext, useState, useContext } from 'react';
import api from '../api/axios';
import { setToken as setTokenMem, clearToken, getToken } from './authStorage';

const AuthContext = createContext();

export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user } = res.data;
    setUser(user);
    setTokenMem(token);
    return user;
  };

  const register = async ({ name, email, password }) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, user } = res.data;
    setUser(user);
    setTokenMem(token);
    return user;
  };

  const logout = () => {
    setUser(null);
    clearToken();
  };

  const fetchMe = async () => {
    const res = await api.get('/users/me');
    setUser(res.data);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}
