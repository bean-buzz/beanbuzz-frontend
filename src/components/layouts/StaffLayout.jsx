import "./StaffLayout.css";
import StaffNavbar from "./StaffNavbar.jsx";
import StaffSidebar from "./StaffSidebar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className="layout-container">
      <div>
        <StaffNavbar />
        <div className="inner-layout">
          <StaffSidebar />
          {children}
        </div>
      </div>
    </div>
  );
}
