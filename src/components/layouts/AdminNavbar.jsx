import { useNavigate } from "react-router-dom";
// import axios from "axios";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout clicked");
    // Add your logout logic here (need to tell back end to clear sestions)
  };

  return (
    <div className="admin-navbar">
      <h2>Admin Dashboard</h2>
      <div className="admin-navbar-buttons">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
