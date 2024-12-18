import "./DashboardLayout.css";
import DashboardNavbar from "./DashboardNavbar.jsx";
import DashboardSidebar from "./DashboardSidebar.jsx";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {

  const [sideitems, setSideitems] = useState([]);

  useEffect(() => {
    // Fetch and decode the JWT to get the user role
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      const role = decoded.role;

      let items;
      // Define side items based on user role
      switch (role) {
        case "admin":
          items = [
            { id: 1, name: "Home", path: "/" },
            { id: 2, name: "Menu Items", path: "dashboard/items" },
            { id: 3, name: "Orders", path: "dashboard/orders" },
            { id: 4, name: "Payments", path: "dashboard/payments" },
            { id: 5, name: "User Reviews", path: "dashboard/reviews" },
          ];
          break;

        case "staff":
          items = [
            { id: 1, name: "Home", path: "/" },
            { id: 2, name: "Menu Items", path: "dashboard/items" },
            { id: 3, name: "Orders", path: "dashboard/orders" },
          ];
          break;
        default:
          // Send a user with no role back home
          items = [{ id: 1, name: "Home", path: "/" }];
          break;
      }

      setSideitems(items);

      console.log(sideitems);
    } else {
      console.error("No token found");
    }
  }, []);

  return (
    <div className="layout-container">
      <div>
        <DashboardNavbar />
        <div className="inner-layout">
          <DashboardSidebar sideitems={sideitems} />
          {/* Renders children */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
