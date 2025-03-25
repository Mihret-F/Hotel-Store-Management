import React, { createContext, useContext, useState } from "react";

const ItemContext = createContext();

export function ItemProvider({ children }) {
  const [items, setItems] = useState([
    { id: 1, item: "Beer", amount: 10, price: 50, remark: "Available", role: "bar" },
    { id: 2, item: "Wine", amount: 5, price: 100, remark: "Low stock", role: "bar" },
  ]);

  // ✅ Function to add a new item
  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, { ...newItem, id: prevItems.length + 1 }]);
  };

  // ✅ Function to request an item (decrease amount)
  const requestItem = (itemId, requestAmount) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, amount: Math.max(0, item.amount - requestAmount) } // Prevents negative values
          : item
      )
    );
  };

  return (
    <ItemContext.Provider value={{ items, addItem, requestItem }}>
      {children}
    </ItemContext.Provider>
  );
}

// Custom hook for using the item context
export function useItemContext() {
  return useContext(ItemContext);
}
