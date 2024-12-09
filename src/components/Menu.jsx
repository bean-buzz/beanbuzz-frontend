import { useState, useEffect } from "react";
import MenuItemCard from "./MenuItemCard";
import "../styles/Menu.css";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  // This allows the menu component to fetch menu-data when the component first loads. This initial fetch may be 'All Items' later
  useEffect(() => {
    async function fetchMenuItemData() {
      try {
        const response = await fetch("http://localhost:3000/lunchItems");
        const data = await response.json();
        if (data) {
          setMenuItems(data);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    }
    fetchMenuItemData();
  }, []);

  console.log(menuItems);

  return (
    <div>
      <div className="menu-card-container">
        {menuItems.map((item) => {
          return (
            <MenuItemCard key={item._id} menuItemObj={item}></MenuItemCard>
          );
        })}
      </div>
    </div>
  );
}
