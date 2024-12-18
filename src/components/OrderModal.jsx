import React from "react";
import "../styles/OrderModal.css";

export default function OrderModal({ isOpen, toggleModal, order }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="order-modal-overlay" onClick={toggleModal}>
      <div className="order-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="order-modal-close" onClick={toggleModal}>
          &times;
        </button>
        {order ? (
          <div>
            <h2>Order Details</h2>
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Table Number:</strong> {order.tableNumber || "N/A"}
            </p>
            <p>
              <strong>Customer Name:</strong> {order.customerName}
            </p>
            <p>
              <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> {order.orderStatus}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Special Instructions:</strong>{" "}
              {order.specialInstructions || "None"}
            </p>
            <h3>Items:</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.menuItem}</strong> - {item.quantity} x $
                  {item.price.toFixed(2)}
                  {item.size ? ` (Size: ${item.size})` : ""}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No order selected.</div>
        )}
      </div>
    </div>
  );
}
