import "./AdminLayout.css";
import AdminNavbar from "./AdminNavbar.jsx";
import AdminSidebar from "./AdminSidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className="layout-container">
      <div>
        <AdminNavbar />
        <div className="inner-layout">
          <AdminSidebar />
          {children}
        </div>
      </div>
    </div>
  );
}
