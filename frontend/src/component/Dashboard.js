import React, { useState, useEffect } from "react";
import axios from "axios";
import { Storehe } from "./Storehe";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

  // ✅ Fetch requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/store-requests/store-request");
        setRequests(response.data); // ✅ Store requests in state
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // ✅ Function to delete a request from the backend
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this request?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/store-requests/store-request/${id}`);
        setRequests((prevRequests) => prevRequests.filter((req) => req._id !== id)); // ✅ Remove deleted request
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <Storehe />
      <h2 style={styles.heading}>📌 Dashboard - All Requests</h2>

      {requests.length === 0 ? (
        <p style={styles.noData}>No requests available</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid white", padding: "10px" }}>Item</th>
                <th style={{ border: "1px solid white", padding: "10px" }}>Amount</th>
                <th style={{ border: "1px solid white", padding: "10px" }}>Price</th>
                <th style={{ border: "1px solid white", padding: "10px" }}>Owner</th>
                <th style={{ border: "1px solid white", padding: "10px" }}>Remark</th>
                <th style={{ border: "1px solid white", padding: "10px" }}>Requested By</th>
                <th style={{ border: "1px solid white", padding: "10px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.itemName}</td>
                  <td>{req.quantity}</td>
                  <td>${req.price}</td>
                  <td>{req.owner}</td>
                  <td>{req.remark}</td>
                  <td>{req.requestedBy}</td>
                  <td>
                    <button style={styles.deleteButton} onClick={() => handleDelete(req._id)}>
                      ❌ Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => window.location.reload()}>
          Refresh 🔄
        </button>
      </div>
    </div>
  );
}

// ✅ Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    background: "#222",
    color: "white",
    minHeight: "100vh",
  },
  heading: { fontSize: "24px", marginBottom: "20px", fontWeight: "bold" },
  noData: { fontSize: "18px", color: "#ddd" },
  tableContainer: { overflowX: "auto" },
  table: {
    width: "90%",
    margin: "auto",
    borderCollapse: "collapse",
    background: "#fff",
    color: "#000",
    borderRadius: "10px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};
