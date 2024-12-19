import "../styles/Orders.css";

import OrdersPanel from "../components/OrdersPanel";

export default function Orders() {
  return (
    <div className="orders-container">
      <p className="orders-text">Orders</p>
      <OrdersPanel />
    </div>
  );
}
