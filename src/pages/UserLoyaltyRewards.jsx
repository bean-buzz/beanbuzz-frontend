import UserNavbar from "../components/UserNavbar";
import "../styles/UserLoyaltyReward.css";

export default function UserLoyaltyReward() {
  return (
    <div className="reward-container">
      <UserNavbar />
      <p className="reward-text">Your Rewards Balance</p>
    </div>
  );
}
