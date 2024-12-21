import React, { useEffect, useState } from "react";

import OrderModal from "./OrderModal";
import "../styles/OrdersPanel.css";

export default function OrdersPanel({ role, email }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // View selected order
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentJwt = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!currentJwt) {
          throw new Error("JWT token is missing");
        }

        let url;

        // Determine the API endpoint based on the user type
        if (role === "admin" || role === "staff") {
          url = `${import.meta.env.VITE_DATABASE_URL}/order`;
        } else if (role === "user" && email) {
          url = `${
            import.meta.env.VITE_DATABASE_URL
          }/order/user-history/${email}`;
        } else {
          throw new Error("Invalid role or missing email");
        }

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
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isModalOpen, role, email]);

  // Toggle the selected orders modal
  const toggleModal = (order = null) => {
    setSelectedOrder(order ? order._id : null);
    setIsModalOpen(!isModalOpen);
  };

  // Handle removing an order
  const handleRemoveOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/order/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwt}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error removing order: ${response.statusText}`);
      }

      // Remove the deleted order from the list
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="order-list-container">
      <h2>Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>TABLE NO</th>
            <th>ORDER TIME</th>
            <th>COMPLETED TIME</th>
            <th>STATUS</th>
            <th>TOTAL</th>
            {/* Hide actions column for users */}
            {role !== "user" && <th>ACTIONS</th>}
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              {/* Table No */}
              <td>{order.tableNumber || "-"}</td>
              {/* Order Time */}
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              {/* Completed Time */}
              <td>
                {order.orderStatus === "Completed"
                  ? new Date(order.updatedAt).toLocaleString()
                  : "-"}
              </td>
              {/* Status */}
              <td>
                <span
                  className={`status-badge ${order.orderStatus
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {order.orderStatus.toUpperCase()}
                </span>
              </td>

              {/* Total Price */}
              <td>${order.totalPrice.toFixed(2)}</td>

              {/* View Order Button */}
              {role !== "user" && (
                <td>
                  <button
                    onClick={() => toggleModal(order)}
                    className="view-details-btn"
                  >
                    View Order
                  </button>
                  {role === "admin" && (
                    <button
                      onClick={() => handleRemoveOrder(order._id)}
                      className="remove-order-btn"
                    >
                      Remove
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <OrderModal
        isOpen={isModalOpen}
        toggleModal={() => toggleModal(null)}
        orderId={selectedOrder}
      />
    </div>
  );
}
