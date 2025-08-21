import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authServices.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Try to fetch user on mount
    useEffect(() => {
        const init = async () => {
            try {
                // Try refresh first
                await refreshAccessToken(); // refreshAccessToken calls /auth/refresh using cookie
                const data = await authService.getCurrentUser();
                setUser(data.user);
            } catch (err) {
                setUser(null); // no valid token
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    // Login
    const login = async (credentials) => {
        const data = await authService.login(credentials);
        setUser(data.user);
        setAccessToken(data.accessToken);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        return data;
    };

    // Logout
    const logout = async () => {
        await authService.logout();
        setUser(null);
        setAccessToken(null);
        queryClient.clear();
    };

    // Refresh access token
    const refreshAccessToken = async () => {
        try {
            const data = await authService.getCurrentUser(); // backend should refresh token if cookie is valid
            setAccessToken(data.accessToken);
            setUser(data.user);
            return data.accessToken;
        } catch (err) {
            logout();
            throw err;
        }
    };

    if(loading) return <span className="loading loading-spinner text-info"></span>;

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                login,
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
export const useAuth = () => {
    return useContext(AuthContext);
};
