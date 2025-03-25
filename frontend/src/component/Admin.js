import React, { useState } from "react";
import axios from "axios";
import bgImage from "../Assert/fbs.jpg"; // Import background image

export default function Admin() {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [token, setToken] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("Storekeeper");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  const API_URL = "http://localhost:5000/api";

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
    } catch (error) {
      setAdminError("Invalid admin credentials!");
    }
  };

  // Handle New User Registration
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/users/register`,
        { firstName, lastName, username: newUsername, password: newPassword, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRegistrationSuccess(true);
      setRegistrationError("");

      // Reset form
      setFirstName("");
      setLastName("");
      setNewUsername("");
      setNewPassword("");
      setRole("Storekeeper");
    } catch (error) {
      setRegistrationError(error.response?.data?.message || "Registration failed!");
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
              <input type="text" placeholder="Admin Username" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} required style={styles.input} />
              <input type="password" placeholder="Admin Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required style={styles.input} />
              <button type="submit" style={styles.button}>Login</button>
            </form>
          </div>
        ) : (
          <div style={styles.authBox}>
            <h1>Register New User</h1>
            {registrationSuccess && <p style={{ color: "lightgreen" }}>User registered successfully!</p>}
            {registrationError && <p style={{ color: "red" }}>{registrationError}</p>}
            <form onSubmit={handleRegisterUser}>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={styles.input} />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={styles.input} />
              <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required style={styles.input} />
              <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={styles.input} />
              <select value={role} onChange={(e) => setRole(e.target.value)} required style={styles.input}>
                <option value="Storekeeper">Storekeeper</option>
                <option value="Manager">Manager</option>
                <option value="FoodBeverage">Food & Beverage</option>
                <option value="Barman">Barman</option>
                <option value="Kitchen">Kitchen</option>
              </select>
              <button type="submit" style={styles.button}>Register User</button>
            </form>
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