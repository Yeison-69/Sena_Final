import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";
import { setToken as setTokenStorage, clearToken, getToken } from "./authStorage";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const token = getToken();
    if (token && !user) {
      api.get("/users/me").then(res => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      }).catch(() => {
        clearToken();
        localStorage.removeItem("user");
      });
    }
  }, []);

  const login = async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data;
    setUser(user);
    setTokenStorage(token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const register = async ({ nombre, email, password }) => {
    const res = await api.post("/auth/register", { nombre, email, password });
    const { token, user } = res.data;
    setUser(user);
    setTokenStorage(token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setUser(null);
    clearToken();
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
