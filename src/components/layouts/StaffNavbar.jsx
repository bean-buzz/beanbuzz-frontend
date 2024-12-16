import { useNavigate } from "react-router-dom";
// import axios from "axios";

export default function StaffNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout clicked");
    // Add your logout logic here (need to tell back end to clear sestions)
  };

  return (
    <div className="staff-navbar">
      <h2>Staff Dashboard</h2>
      <div className="staff-navbar-buttons">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
