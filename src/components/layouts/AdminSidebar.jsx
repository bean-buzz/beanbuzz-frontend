import { Link } from "react-router-dom";

const sideitems = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Menu Items",
    path: "/admin/items",
  },
  {
    id: 3,
    name: "Orders",
    path: "/admin/orders",
  },
  {
    id: 4,
    name: "Payments",
    path: "/admin/payments",
  },
  {
    id: 5,
    name: "User Reviews",
    path: "/admin/reviews",
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
