import UserNavbar from "../components/UserNavbar";
import HomePage from "./HomePage";
import "../styles/UserProfile.css";

export default function UserProfile() {
  return (
    <div className="main-container">
      <UserNavbar />
      <HomePage />
    </div>
  );
}
