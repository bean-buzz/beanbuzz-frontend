import "../styles/Orders.css";

import OrdersPanel from "../components/OrdersPanel";

export default function Orders() {
  const orderId = "675c035ff8b0eab4780a453c"; // test

  return (
    <div className="orders-container">
      <p className="orders-text">Orders</p>
      <OrdersPanel orderId={orderId} />
    </div>
  );
}
