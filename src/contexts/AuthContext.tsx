import React, { createContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Guardar el Token en local
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("puntored_token"));

  const login = (t: string) => {
    setToken(t);
    localStorage.setItem("puntored_token", t);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("puntored_token");
  };
console.log(token)
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
