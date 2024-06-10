import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowNavbar = ({ children }) => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);
  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/reset" ||
      localStorage.getItem("role") === "Admin" ||
      localStorage.getItem("role") === "Moderator"
    ) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      {showNavbar && children}
    </div>
  );
};

export default ShowNavbar;
