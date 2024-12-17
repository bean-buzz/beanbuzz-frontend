import UserNavbar from "../components/UserNavbar";
import "../styles/MyProfile.css";

export default function Profile() {
  return (
    <div className="profile-container">
      <UserNavbar />
      <p className="profile-text">WELCOME TO "BEANBUZZ" SIMON </p>
    </div>
  );
}
