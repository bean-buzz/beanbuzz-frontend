import React, { useState, useEffect } from "react";
import "../styles/OrderModal.css";

import Toast from "./Toast";

import { jwtDecode } from "jwt-decode";

export default function OrderModal({ isOpen, toggleModal, orderId }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderUpdated, setOrderUpdated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const currentJwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (currentJwt) {
      const decoded = jwtDecode(currentJwt);
      const role = decoded.role;

      if (role === "admin") {
        setIsAdmin(role);
      }
    }

    if (!orderId) return;

    async function fetchOrder() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/order/${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentJwt}`,
            },
          }
        );

        if (!response.ok) {
          Toast().fire({
            icon: "error",
            title: "Failed to fetch order",
          });
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setOrder(data);
        setOrderUpdated(false);
      } catch (err) {
        Toast().fire({
          icon: "error",
          title: "Failed to fetch order",
        });
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [isOpen, orderId, orderUpdated]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleRemoveItem = (index) => {
    const updatedItems = order.items.filter((_, i) => i !== index);

    // Recalculate the total price
    const updatedTotalPrice = updatedItems.reduce(
      (sum, item) => sum + item.price,
      0
    );

    setOrder({
      ...order,
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    });
  };

  const handleUpdateOrder = async () => {
    const updatedOrder = {
      ...(order.orderStatus &&
        ["Pending", "In Progress", "Completed", "Cancelled"].includes(
          order.orderStatus
        ) && { orderStatus: order.orderStatus }),
      ...(order.paymentStatus &&
        ["Pending", "Paid", "Cancelled"].includes(order.paymentStatus) && {
          paymentStatus: order.paymentStatus,
        }),
      ...(order.paymentMethod &&
        ["Cash", "Card", "Online"].includes(order.paymentMethod) && {
          paymentMethod: order.paymentMethod,
        }),
      specialInstructions: order.specialInstructions || "",
      items: order.items,
      totalPrice: order.totalPrice,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/order/${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentJwt}`,
          },
          body: JSON.stringify(updatedOrder),
        }
      );

      if (!response.ok) {
        Toast().fire({
          icon: "error",
          title: "Error updating the order",
        });
        throw new Error("Error updating the order");
      }

      const data = await response.json();
      setOrder(data);
      setOrderUpdated(true);
      toggleModal();

      Toast().fire({
        icon: "success",
        title: "Order updated successfully",
      });
    } catch (error) {
      Toast().fire({
        icon: "error",
        title: "Error updating the order",
      });
    }
  };

  if (!isOpen || loading) {
    return null;
  }

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (e, index) => {
    const updatedItems = [...order.items];
    const { name, value } = e.target;

    // Handle special instructions separately
    if (name === "specialInstructions") {
      updatedItems[index].specialInstructions = value;
    } else {
      // Check if multipleSizes is false and set 'default' as size
      if (!updatedItems[index].menuItem.multipleSizes) {
        // If the item doesn't have multiple sizes, treat it as 'default' and use the defaultPrice
        updatedItems[index].size = "default";
      } else {
        updatedItems[index][name] =
          name === "size" ? value.toLowerCase() : value;
      }

      // Recalculate the price based on the selected size or default price
      const size = updatedItems[index].size;
      const quantity = updatedItems[index].quantity;
      let itemPrice = 0;

      if (updatedItems[index].menuItem) {
        if (
          updatedItems[index].menuItem.multipleSizes &&
          size &&
          updatedItems[index].menuItem.sizes[size]
        ) {
          // If multiple sizes exist, fetch the price based on size
          itemPrice = updatedItems[index].menuItem.sizes[size].price;
        } else {
          // Use the default price if sizes are not available
          itemPrice = updatedItems[index].menuItem.defaultPrice;
        }

        updatedItems[index].price = itemPrice * quantity;
      }
    }

    // Recalculate the total price for all items
    const updatedTotalPrice = updatedItems.reduce(
      (sum, item) => sum + item.price,
      0
    );

    setOrder({
      ...order,
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    });
  };

  return (
    <div className="order-modal-overlay" onClick={toggleModal}>
      <div className="order-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="order-modal-close" onClick={toggleModal}>
          &times;
        </button>
        {order ? (
          <div className="order-modal-container">
            <h2>Order Details</h2>

            <div className="order-modal-row">
              <label>Order ID:</label>
              <div>{order._id}</div>
            </div>

            <div className="order-modal-row">
              <label>Table Number:</label>
              <div>{order.tableNumber || "N/A"}</div>
            </div>

            <div className="order-modal-row">
              <label>Customer Name:</label>
              <div>{order.customerName}</div>
            </div>

            <div className="order-modal-row">
              <label>Status:</label>
              <select
                className="order-modal-dropdown"
                name="orderStatus"
                value={order.orderStatus}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="order-modal-row">
              <label>Payment Status:</label>
              <select
                className="order-modal-dropdown"
                name="paymentStatus"
                value={order.paymentStatus}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="order-modal-row">
              <label>Payment Method:</label>
              <select
                className="order-modal-dropdown"
                name="paymentMethod"
                value={order.paymentMethod}
                onChange={handleChange}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div className="order-modal-row">
              <label>Special Instructions:</label>
              <textarea
                className="order-modal-dropdown"
                name="specialInstructions"
                value={order.specialInstructions}
                onChange={handleChange}
              />
            </div>

            <div className="order-modal-section-title">
              <h2>Items</h2>
            </div>

            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  <div className="order-modal-row">
                    <label className="order-modal-item-name">
                      {item.menuItem.itemName}
                    </label>
                  </div>
                  <div className="order-modal-row">
                    <label>Size:</label>
                    <select
                      name="size"
                      value={item.size || "default"}
                      onChange={(e) => handleItemChange(e, index)}
                      disabled={item.menuItem.multipleSizes === false}
                    >
                      {item.menuItem.multipleSizes ? (
                        <>
                          <option value="">Select Size</option>
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </>
                      ) : (
                        <option value="default">Default</option>
                      )}
                    </select>
                  </div>
                  <div className="order-modal-row">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(e, index)}
                      min="1"
                    />
                  </div>

                  {/* Add Special Instructions for each item */}
                  <div className="order-modal-row">
                    <label>Special Instructions:</label>
                    <textarea
                      name="specialInstructions"
                      value={item.specialInstructions || ""}
                      onChange={(e) => handleItemChange(e, index)}
                    />
                  </div>

                  <div className="order-modal-row">
                    <label>Item Price:</label>
                    <div>
                      {item.menuItem &&
                      item.menuItem.sizes &&
                      item.size &&
                      item.menuItem.sizes[item.size] ? (
                        <div>${item.menuItem.sizes[item.size].price}</div>
                      ) : (
                        // Show default price for items without sizes
                        <div>${item.menuItem.defaultPrice}</div>
                      )}
                    </div>
                  </div>
                  <div className="order-modal-row">
                    <label>Total Price:</label>
                    <div>${item.price.toFixed(2)}</div>
                  </div>
                  {isAdmin && (
                    <div className="order-modal-row">
                      <button
                        className="order-modal-btn-remove"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No order selected.</div>
        )}

        <div className="order-modal-row order-modal-grand-total">
          <label>Grand Price:</label>
          <div>${order.totalPrice.toFixed(2)}</div>
        </div>
        <button className="order-modal-btn" onClick={handleUpdateOrder}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
