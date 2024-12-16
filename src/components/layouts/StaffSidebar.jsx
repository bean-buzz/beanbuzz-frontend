import { Link } from "react-router-dom";

const sideitems = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 3,
    name: "Orders",
    path: "/staff/orders",
  },
];

export default function Sidebar() {
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
