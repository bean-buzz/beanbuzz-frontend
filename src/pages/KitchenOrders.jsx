import "../styles/Orders.css";
import { jwtDecode } from "jwt-decode";

import OrdersPanel from "../components/OrdersPanel";

export default function KitchenOrders() {
  const token = localStorage.getItem("jwt");

  // Extract first name, last name, and role from the decoded token
  const firstName = jwtDecode(token).firstName || "";
  const lastName = jwtDecode(token).lastName || "";
  const fullName = `${firstName} ${lastName}`;
  const role = jwtDecode(token).role || "user";

  console.log(` FULl NAME ${fullName} Role ${role}`);

  return (
    <div className="orders-container">
      <p className="orders-text">Orders</p>
      <OrdersPanel role={role} name={fullName} />
    </div>
  );
}
