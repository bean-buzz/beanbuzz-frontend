import { useState, useEffect } from "react";
import MenuItemCard from "./MenuItemCard";
import MenuFilter from "./MenuFilter";
import "../styles/Menu.css";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  // Each button in the menu filter calls this function to update the menu by category
  async function handleCategoryFilter(category) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/menu/${category}`
      );
      const Data = await response.json();
      if (Array.isArray(Data)) {
        setMenuItems(Data);
      } else {
        setMenuItems([]); 
      }
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  }

  // This allows the menu component to fetch menu-data when the component first loads. This initial fetch may be 'All Items' later
  useEffect(() => {
    async function fetchMenuItemData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/menu/coffee`
        );
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
      <MenuFilter handleCategoryFilter={handleCategoryFilter}></MenuFilter>
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
