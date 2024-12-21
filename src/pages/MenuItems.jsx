import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import CreateMenuItem from "../components/CreateMenuItem";
import MenuItemsPanel from "../components/MenuItemsPanel";
import "../styles/MenuItems.css";

export default function MenuItems() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("menu");

  useEffect(() => {
    const fetchRoleFromJwt = () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("JWT token not found");
        }
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleFromJwt();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="items-container">
      <div className="menu-items-container">
        <h2>Menu Items</h2>
        <div className="header-container">
          {role === "admin" && (
            <button
              className="add-item-btn"
              onClick={() => setView(view === "menu" ? "create" : "menu")}
            >
              {view === "menu" ? "Add Menu Item" : "Back to Menu"}
            </button>
          )}
        </div>
        {view === "menu" ? <MenuItemsPanel role={role} /> : <CreateMenuItem />}
      </div>
    </div>
  );
}
