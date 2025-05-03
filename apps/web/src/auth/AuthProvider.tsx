import React, { useState, ReactNode } from "react";
import { AuthContext } from "@/hooks/useAuth";
import { User } from "./types";

// Hardcoded demo user
const DEMO_USER: User = {
  id: "1",
  name: "Demo User",
  email: "user@example.com",
  role: "admin",
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // For development, start with the user already logged in
  // For production, you'd start with null
  const [user, setUser] = useState<User | null>(DEMO_USER);
  const [loading, setLoading] = useState(false);

  // Simple login function that always succeeds with demo user
  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<void> => {
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Always succeed with demo user
      console.log(
        `Login attempt with: ${email}, ${password}, remember: ${rememberMe}`
      );
      setUser(DEMO_USER);

      // Optional: store something in localStorage/sessionStorage to simulate persistence
      if (rememberMe) {
        localStorage.setItem("auth-token", "demo-token");
      } else {
        sessionStorage.setItem("auth-token", "demo-token");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    sessionStorage.removeItem("auth-token");
    setUser(null);
  };

  const contextValue = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
