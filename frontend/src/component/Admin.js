import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import bgImage from "../Assert/fbs.jpg"; // Import background image

export default function Admin() {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [token, setToken] = useState("");

  const API_URL = "http://localhost:5000/api";
  const navigate = useNavigate();  // Use useNavigate for navigation

  // Handle Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        username: adminUsername,
        password: adminPassword,
      });

      setToken(response.data.token);
      setIsAdminAuthenticated(true);
      setAdminError("");

      // Redirect to admin dashboard after successful login
      navigate("/admin-dashboard");  // Navigate to the admin dashboard page
    } catch (error) {
      setAdminError("Invalid admin credentials!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        {!isAdminAuthenticated ? (
          <div style={styles.authBox}>
            <h1>Admin Login</h1>
            {adminError && <p style={{ color: "red" }}>{adminError}</p>}
            <form onSubmit={handleAdminLogin}>
              <input
                type="text"
                placeholder="Admin Username"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Login</button>
            </form>
          </div>
        ) : (
          // Show a success message after authentication (though this won't be shown if redirection happens)
          <div style={styles.authBox}>
            <h1>Welcome, Admin!</h1>
            <p>Successfully logged in.</p>
            {/* You can redirect or show additional admin features here */}
          </div>
        )}
      </div>
    </div>
  );
}

// Styles with background image
const styles = {
  container: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay for readability
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
    color: "white",
  },
  authBox: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    width: "100%",
  },
};
