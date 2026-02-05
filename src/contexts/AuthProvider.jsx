import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authServices.js";
import { loadAccessToken, setAccessToken as setTokenInStorage, removeAccessToken } from "../services/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // const queryClient = useQueryClient();


  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(() => loadAccessToken());
  const [loading, setLoading] = useState(true);

  // Wrapper to set token in both state and localStorage
  const setAccessToken = (token) => {
    setTokenInStorage(token);
    setAccessTokenState(token);
  };

  // Init auth on mount
  useEffect(() => {
    const initAuth = async () => {
      // Only try to fetch user if a token exists in storage initially
      if (accessToken) {
        try {
          const data = await authService.getCurrentUser();
          setUser(data.user); // data.user includes role from backend
          // The interceptor might have refreshed the token, so we update it.
          setAccessToken(loadAccessToken());
        } catch (error) {
          // This catch block will be hit if the token is invalid/expired and refresh fails.
          // The interceptor in api.js will handle the redirect.
          console.error("Auth init failed, interceptor will handle redirect.");
          setUser(null);
          removeAccessToken();
          setAccessTokenState(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Logout
  const logout = async () => {
    try {
      await authService.logout(); // backend clears refresh token cookie
    } finally {
      removeAccessToken(); // clear local access token
      setUser(null);
      setAccessTokenState(null);
      // queryClient.clear();
    }
  };

  // Refresh access token manually (if needed)
  const refreshAccessToken = async () => {
    try {
      const data = await authService.getCurrentUser(); // backend uses refresh cookie
      setUser(data.user);
      setAccessToken(data.accessToken); // Use the wrapper to save it
      return data.accessToken;
    } catch {
      logout();
      throw new Error("Refresh failed");
    }
  };

  if (loading) {
    return <LoadingSpinner variant="overlay" message="Initializing..." />;
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
