import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userID");
    return token && role && userId ? { role, userId } : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const userId = localStorage.getItem("userID");
      setUser(token && role && userId ? { role, userId } : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
