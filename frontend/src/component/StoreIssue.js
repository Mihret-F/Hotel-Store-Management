import React, { useState, useEffect } from "react";
import axios from "axios";
import { Storehe } from "./Storehe";

const StoreIssue = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [requestAmounts, setRequestAmounts] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch available items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Error fetching items. Please try again later.");
      }
    };

    fetchItems();
  }, []);

  // Handle request button click
  const handleRequest = async (item_id) => {
    const stock = parseInt(requestAmounts[item_id] || 0, 10);
    
    if (stock > 0) {
      try {
        const response = await axios.post("http://localhost:5000/api/store-issues", {
          item_id,
          requested_by: "User", // Replace with actual user
          stock,
        });

        if (response.data.updatedItem) {
          alert(response.data.message);

          // ✅ Update the item's stock in state
          setItems((prevItems) =>
            prevItems.map((item) =>
              item._id === item_id
                ? { ...item, stock: response.data.updatedItem.stock }
                : item
            )
          );
          setFilteredItems((prevItems) =>
            prevItems.map((item) =>
              item._id === item_id
                ? { ...item, stock: response.data.updatedItem.stock }
                : item
            )
          );

          setRequestAmounts({ ...requestAmounts, [item_id]: "" }); // Reset input field
        } else {
          alert("Error: Updated item data is missing.");
        }
      } catch (error) {
        alert("Error requesting item. Please try again.");
        console.error(error);
      }
    } else {
      alert("Please enter a valid quantity greater than 0.");
    }
  };

  // Handle search bar input
  useEffect(() => {
    const results = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchTerm, items]);

  return (
    <div style={{ background: "#ffff", color: "white", padding: "20px", minHeight: "100vh" }}>
      <Storehe />
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Store Issue Requests</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      
      {/* Search Bar */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "60%", fontSize: "16px" }}
        />
      </div>
      
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", backgroundColor: "#333" }}>
        <thead style={{ backgroundColor: "#444" }}>
          <tr>
            <th>Item</th>
            <th>Stock</th>
            <th>Request Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) =>
              item && item._id ? (
                <tr key={item._id}>
                  <td>{item.name || "No Name"}</td>
                  <td>{typeof item.stock === "number" ? item.stock : "N/A"}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max={item.stock || 1}
                      value={requestAmounts[item._id] || ""}
                      onChange={(e) =>
                        setRequestAmounts({ ...requestAmounts, [item._id]: e.target.value })
                      }
                      style={{ width: "80px", padding: "5px", textAlign: "center" }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleRequest(item._id)}
                      style={{ padding: "5px 10px", backgroundColor: "red", color: "white" }}
                      disabled={item.stock === 0} // ✅ Disable button if stock is zero
                    >
                      Request
                    </button>
                  </td>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <td colSpan="4">No items available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StoreIssue;
