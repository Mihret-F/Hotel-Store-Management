import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from "../Assert/hotels.jpg";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/Dashboards.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // User selects role
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Define role-based dashboard routes
  const roleRoutes = {
    Storekeeper: "/storekeeper",
    Manager: "/manager",
    FoodBeverage: "/food-beverage",
    Barman: "/bars",
    Kitchen: "/kitchen",
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const storedRole = decodedToken.role;
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp < currentTime) {
          console.warn("Token expired! Redirecting to login.");
          localStorage.removeItem("authToken");
          setIsAuthenticated(false);
          return;
        }

        if (storedRole) {
          setIsAuthenticated(true);
          setTimeout(() => navigate(roleRoutes[storedRole] || "/"), 1000);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role) {
      setError("Please select a role before logging in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
        role, // Send selected role to backend
      });

      const { token } = response.data;
      if (!token) {
        setError("Invalid token received from server.");
        return;
      }

      localStorage.setItem("authToken", token);

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      if (userRole !== role) {
        setError("Incorrect role selected! Please select the correct role.");
        localStorage.removeItem("authToken");
        return;
      }

      localStorage.setItem("userRole", userRole);
      localStorage.setItem("username", username);

      setIsAuthenticated(true);
      setError("");

      if (roleRoutes[userRole]) {
        navigate(roleRoutes[userRole]);
      } else {
        setError("Unauthorized role!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className="dashboard-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="dashboard-overlay">
        {!isAuthenticated ? (
          <div className="auth-box">
            <h1>Login</h1>
            {error && <p className="error-text">{error}</p>}
            <form onSubmit={handleLogin}>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                required 
                className="input-field"
              >
                <option value="">Select Role</option>
                <option value="Storekeeper">Storekeeper</option>
                <option value="Manager">Manager</option>
                <option value="FoodBeverage">Food & Beverage</option>
                <option value="Barman">Barman</option>
                <option value="Kitchen">Kitchen</option>
              </select>
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                className="input-field" 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="input-field" 
              />
              <button type="submit" className="login-button">Login</button>
            </form>
          </div>
        ) : (
          <div className="auth-box">
            <h1>Welcome, {role}!</h1>
            <p>You are logged in as a {role}.</p>
           
          </div>
        )}
      </div>
    </div>
  );
}
