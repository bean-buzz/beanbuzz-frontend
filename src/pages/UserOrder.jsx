import UserNavbar from "../components/UserNavbar";
import "../styles/UserOrder.css";

export default function UserOrder() {
  return (
    <div className="order-container">
      <UserNavbar />
      <p className="order-text">Your Orders Details</p>
    </div>
  );
}
