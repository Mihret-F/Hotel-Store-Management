import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchRole, setSearchRole] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/admin";  // Correct backend URL

  // Fetch users from the API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users`);  // Corrected the endpoint
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`);  // Corrected the endpoint
      fetchUsers();  // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle update user (Navigate to the update user page)
  const handleUpdateUser = (userId) => {
    navigate(`/UpdateUser/${userId}`);  // Correct URL for the update page
  };

  // Filter users by role
  const filteredUsers = users.filter(user =>
    user.role.toLowerCase().includes(searchRole.toLowerCase())
  );

  const dashboardStyle = {
    padding: '30px',
    backgroundColor: '#1c1c1c',
    minHeight: '100vh',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  };

  const addButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const logoutButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const inputStyle = {
    width: '300px',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#333',
    color: 'white',
  };

  const thTdStyle = {
    padding: '12px',
    border: '1px solid #555',
    textAlign: 'left',
  };

  const actionBtnStyle = {
    marginRight: '10px',
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={dashboardStyle}>
      <div style={buttonContainerStyle}>
        <button onClick={() => navigate("/add-user")} style={addButtonStyle}>
          Add User
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          style={logoutButtonStyle}
        >
          Log Out
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by role"
        value={searchRole}
        onChange={(e) => setSearchRole(e.target.value)}
        style={inputStyle}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>First Name</th>
              <th style={thTdStyle}>Last Name</th>
              <th style={thTdStyle}>Username</th>
              <th style={thTdStyle}>Role</th>
              <th style={thTdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td style={thTdStyle}>{user.firstName}</td>
                <td style={thTdStyle}>{user.lastName}</td>
                <td style={thTdStyle}>{user.username}</td>
                <td style={thTdStyle}>{user.role}</td>
                <td style={thTdStyle}>
                  <button
                    onClick={() => handleUpdateUser(user._id)}  // Corrected function call
                    style={{ ...actionBtnStyle, backgroundColor: '#28a745', color: 'white' }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    style={{ ...actionBtnStyle, backgroundColor: '#dc3545', color: 'white' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
