import "../styles/Orders.css";
import { jwtDecode } from "jwt-decode";

import OrdersPanel from "../components/OrdersPanel";

export default function KitchenOrders() {
  const token = localStorage.getItem("jwt");

  // Extract email and role from the decoded token
  const email = jwtDecode(token).email || "";

  const role = jwtDecode(token).role || "user";

  return (
    <div className="orders-container">
      <p className="orders-text">Orders</p>
      <OrdersPanel role={role} email={email} />
    </div>
  );
}
