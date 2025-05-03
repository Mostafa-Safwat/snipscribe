import { useContext, createContext } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const DEMO_USER: User = {
  id: "1",
  name: "Demo User",
  email: "user@example.com",
  role: "admin",
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useDemoAuth = () => {
  return {
    user: DEMO_USER,
    loading: false,
    login: async () => {
      /* Do nothing */
    },
    logout: () => {
      /* Do nothing */
    },
  };
};
