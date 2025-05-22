import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create Context
const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check authentication status
  const checkAuth = async () => {
    console.log("Checking authentication status...");
    const token = sessionStorage.getItem("token");
    console.log("Token exists:", !!token);
    
    if (!token) {
      console.log("No token found, not authenticated");
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      return;
    }
    
    try {
      // Make API request with token
      const response = await axios.get("https://srisarvamoils-backend.onrender.com/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("Auth API response:", response.data);
      
      // IMPORTANT: Handle the response format from your backend
      // Your backend returns { user: { _id, username, email } }
      const userData = response.data.user || response.data;
      
      if (userData) {
        console.log("User authenticated successfully:", userData);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        console.error("User data missing in response");
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Auth check failed:", error.response ? error.response.data : error.message);
      sessionStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  
  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);
  
  // Login function
  const login = async (userData, token) => {
    console.log("Login function called with:", userData);
    sessionStorage.setItem("token", token);
    
    // Set user data directly if available
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      // Otherwise fetch it from the API
      await checkAuth();
    }
  };
  
  // Logout function
  const logout = () => {
    console.log("Logout function called");
    sessionStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Manual refresh function for components
  const refreshAuth = () => {
    setLoading(true);
    checkAuth();
  };
  
  // Log current state
  console.log("Auth context state:", { 
    isAuthenticated, 
    hasUser: !!user, 
    loading,
    user
  });
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      isAuthenticated,
      refreshAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };
