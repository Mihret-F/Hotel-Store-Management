import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/admin/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}`, {
        firstName,
        lastName,
        username,
        password,
        role,
      });
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleLogout = () => {
    // You can clear any auth state here if needed
    navigate("/admin-dashboard");
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
    position: 'relative',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const logoutBtnStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  };

  const checkboxContainer = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '16px',
    gap: '10px',
    padding: '8px 10px',
    backgroundColor: '#eef5ff',
    borderRadius: '6px',
    border: '1px solid #007bff',
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>

      <h1 style={titleStyle}>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={checkboxContainer}>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        <select
  style={inputStyle}
  value={role}
  onChange={(e) => setRole(e.target.value)}
  required
>
  <option value="">Select Role</option>
  <option value="Storekeeper">Storekeeper</option>
   <option value="Manager">Manager</option>
  <option value="FoodBeverage">FoodBeverage</option>
  <option value="Barman">Barman</option>
  <option value="Kitchen">Kitchen</option>
</select>


        <button type="submit" style={buttonStyle}>Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
