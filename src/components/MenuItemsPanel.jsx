import React, { useEffect, useState } from "react";
import "../styles/MenuItemsPanel.css";

export default function MenuItemsPanel({ role }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentJwt = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const url = `${import.meta.env.VITE_DATABASE_URL}/menu`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwt}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [role]);

  // Handle removing a menu item
  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/menu/item/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwt}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error removing item: ${response.statusText}`);
      }

      // Remove the deleted item from the list
      setMenuItems(menuItems.filter((item) => item._id !== itemId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading menu items...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const handleToggleAvailability = async (itemId, currentStatus) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_DATABASE_URL
        }/menu/item/${itemId}/toggle-availability`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwt}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error toggling availability: ${response.statusText}`);
      }

      const updatedItem = await response.json();

      // Update the item in the state
      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <table className="menu-items-table">
      <thead>
        <tr>
          <th>ITEM NAME</th>
          <th>CATEGORY</th>
          <th>DESCRIPTION</th>
          <th>AVAILABILITY</th>
          <th>IMAGE</th>
          {/* Only admins can see actions */}
          {role === "admin" && <th>ACTIONS</th>}{" "}
        </tr>
      </thead>

      <tbody>
        {menuItems.map((item) => (
          <tr key={item._id}>
            <td>{item.itemName}</td>
            <td>{item.category}</td>
            <td>{item.description}</td>
            <td>
              <button
                className={`status-btn ${
                  item.isAvailable ? "available" : "unavailable"
                }`}
                onClick={() =>
                  handleToggleAvailability(item._id, item.isAvailable)
                }
              >
                {item.isAvailable ? "Available" : "Unavailable"}
              </button>
            </td>

            <td>
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="item-image"
                />
              )}
            </td>
            {role === "admin" && (
              <td>
                <button
                  className="remove-item-btn"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
