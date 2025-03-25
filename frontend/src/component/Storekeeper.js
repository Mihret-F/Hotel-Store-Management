import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Storekeeper.css"; // Import external CSS
import bgImage from "../Assert/store.jpg";
export default function Storekeeper() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem("authToken");
      const storedUsername = localStorage.getItem("username");

      if (storedToken && storedUsername) {
        setIsAuthenticated(true);
        setUsername(storedUsername);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Listen for storage changes to update auth state
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUsername("");
    navigate("/"); // Redirect to login after logout
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
    <div className="container">
      {isAuthenticated ? (
        <div className="authBox">
          <h2>Welcome, {username}!</h2>
          <div className="buttonContainer">
            <button onClick={() => navigate("/Registeritem")} className="button buttonSuccess">
              Register Item
            </button>
            <button onClick={() => navigate("/Bar")} className="button buttonInfo">
              Bar
            </button>
            <button onClick={() => navigate("/Dashboard")} className="button buttonPrimary">
              Dashboard
            </button>
            <button onClick={() => navigate("/storeissue")} className="button buttonWarning">
              Store Issue
            </button>
            <button onClick={handleLogout} className="button buttonDanger">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <h2 className="warningText">Please log in to access the storekeeper dashboard.</h2>
      )}
    </div></div>
  );
}
