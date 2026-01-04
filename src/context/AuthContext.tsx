'use client';

import { createContext, useContext, ReactNode, useState, useMemo } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type User = {
  email: string;
  subscription: boolean;
  db_type: string;
  columns: string[];
  active_columns: string[];
  column_limit: number;
  row_limit: number;
  login_token: string;
  api_url: string;
  api_key: string;
  poll_frequency: string;
  attio_token: string;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
  // Add other auth-related methods here
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Use the continuous login check logic here
  const checkAuth = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_BASE_URL}/verify?token=${token}`, {});

      if (response.ok) {
        if (token) {
          localStorage.setItem("authToken", token);
        }
        const userData = await response.json();
        setUser(userData.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useMemo(() => checkAuth(), []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
