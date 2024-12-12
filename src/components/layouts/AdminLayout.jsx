import "./AdminLayout.css";
import AdminNavbar from "./AdminNavbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className="layout-container">
      <div>
        <AdminNavbar />
        <div className="inner-layout">
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  );
}
