import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authServices.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  

  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false); // to avoid double /auth/me calls

  // Init auth on mount
  useEffect(() => {
    const initAuth = async () => {
      if (initialized) return;
      setInitialized(true);
      try {
        // Try refresh token (backend should send new access token if refresh cookie is valid)
        const data = await authService.getCurrentUser(); 
        setUser(data.user);
        setAccessToken(data.accessToken);
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [initialized]);

  // Logout
  const logout = async () => {
    try {
      await authService.logout(); // backend clears refresh token cookie
    } finally {
      setUser(null);
      setAccessToken(null);
      queryClient.clear();
    }
  };

  // Refresh access token manually (if needed)
  const refreshAccessToken = async () => {
    try {
      const data = await authService.getCurrentUser(); // backend uses refresh cookie
      setUser(data.user);
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch {
      logout();
      throw new Error("Refresh failed");
    } 
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        logout,
        refreshAccessToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
