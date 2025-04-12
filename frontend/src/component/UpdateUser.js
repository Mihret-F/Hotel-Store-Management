import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateUser.css';  // Import your CSS file for styling
const UpdateUser = () => {
  const { userId } = useParams();  // Get user ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: '', lastName: '', username: '', role: '' });
  const [loading, setLoading] = useState(true);
  
  const API_URL = "http://localhost:5000/api/admin";  // Your backend API URL

  // Fetch user data by ID
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      setUser(response.data);  // Populate the state with fetched user data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  // Handle user update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/users/${userId}`, user);
      navigate('/admin-dashboard');  // Navigate back to the dashboard after updating
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle log out
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="update-user-container">
      <div className="logout-button-container">
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>

      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="update-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
