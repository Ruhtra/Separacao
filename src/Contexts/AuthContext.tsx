import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  idOperador: string;
  // Add other properties that might be in your token
}

interface AuthContextType {
  token: string | null;
  idOperador: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [idOperador, setIdOperador] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      login(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      if (!decoded.idOperador) {
        throw new Error("Token does not contain idOperador");
      }
      setToken(newToken);
      setIdOperador(decoded.idOperador);
      localStorage.setItem("authToken", newToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    }
  };

  const logout = () => {
    setToken(null);
    setIdOperador("");
    localStorage.removeItem("authToken");
  };

  const value = {
    token,
    idOperador,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
