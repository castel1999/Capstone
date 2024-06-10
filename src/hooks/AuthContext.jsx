import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

const getRemainingTime = (exp) => {
  const currentTime = Date.now();
  const expirationTime = exp * 1000; // convert exp to milliseconds
  return expirationTime - currentTime;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userID");

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.clear();
      return null;
    }

    return { role, userId, token, decodedToken };
  });

  useEffect(() => {
    if (!user) return;

    const remainingTime = getRemainingTime(user.decodedToken.exp);
    const timer = setTimeout(() => {
      localStorage.clear();
      setUser(null);
      window.location.href = "/login"; // Redirect to login page
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      const decodedToken = jwtDecode(token);
      const role = localStorage.getItem("role");
      const userId = localStorage.getItem("userID");

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.clear();
        setUser(null);
        return;
      }

      setUser({ role, userId, token, decodedToken });
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
