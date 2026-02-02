import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { setupInterceptors } from "../api/axiosRefresh";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("access") || null,
  );
  const [refreshToken, setRefreshToken] = useState(
    () => localStorage.getItem("refresh") || null,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access"),
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  /* ---------------- LOGOUT ---------------- */

  const refreshAccessToken = async () => {
    try {
      const res = await api.post("users/refresh/", {
        refresh: refreshToken,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setAccessToken(res.data.access);
      setRefreshToken(res.data.refresh);
      setIsAuthenticated(true);

      return res.data.access;
    } catch (err) {
      logout();
      return null;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    setupInterceptors({
      refreshToken,
      refreshAccessToken,
    });
  }, [refreshToken]);
  /* ---------------- LOGIN ---------------- */

  const login = ({ access, refresh, user }) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    setAccessToken(access);
    setRefreshToken(refresh);
    setIsAuthenticated(true);
    setUser(user);
  };

  /* ---------------- REFRESH ---------------- */

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated,
        user,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ---------------- HOOK ---------------- */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
};
