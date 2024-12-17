import { Link } from "react-router-dom";

export default function DashboardSidebar({ sideitems }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        {sideitems.map((sideitem) => (
          <Link to={sideitem.path} key={sideitem.id} className="sidebar-item">
            {sideitem.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
