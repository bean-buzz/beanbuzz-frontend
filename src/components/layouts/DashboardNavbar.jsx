import { useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const handleLogout = async () => {
    console.log("Logout clicked");
    // Add your logout logic here (clear jwt)
  };

  return (
    <div className="dashboard-navbar">
      <h2>Dashboard</h2>
      <div className="dashboard-navbar-buttons">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
