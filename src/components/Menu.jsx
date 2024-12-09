import { useState, useEffect } from "react";
import MenuItemCard from "./MenuItemCard";
import MenuFilter from "./MenuFilter";
import "../styles/Menu.css";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  async function handleLunchFilter() {
    try {
      const response = await fetch("http://localhost:3000/lunchItems");
      const LunchData = await response.json();
      if (LunchData) {
        setMenuItems(LunchData);
      }
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  }
  async function handleBreakfastFilter() {
    try {
      const response = await fetch("http://localhost:3000/breakfastItems");
      const breakfastData = await response.json();
      if (breakfastData) {
        setMenuItems(breakfastData);
      }
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  }
  async function handleSaladFilter() {
    try {
      const response = await fetch("http://localhost:3000/saladItems");
      const saladData = await response.json();
      if (saladData) {
        setMenuItems(saladData);
      }
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  }

  async function handleCoffeeFilter() {
    try {
      const response = await fetch("http://localhost:3000/coffeeItems");
      const breakfastData = await response.json();
      if (breakfastData) {
        setMenuItems(breakfastData);
      }
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  }

  async function handleTeaFilter() {
    try {
      const response = await fetch("http://localhost:3000/teaItems");
      const teaData = await response.json();
      if (teaData) {
        setMenuItems(teaData);
      }
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  }
  async function handleSmoothieFilter() {
    try {
      const response = await fetch("http://localhost:3000/smoothieItems");
      const teaData = await response.json();
      if (teaData) {
        setMenuItems(teaData);
      }
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  }

  // This allows the menu component to fetch menu-data when the component first loads. This initial fetch may be 'All Items' later
  useEffect(() => {
    async function fetchMenuItemData() {
      try {
        const response = await fetch("http://localhost:3000/coffeeItems");
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
      <MenuFilter
        handleLunchFilter={handleLunchFilter}
        handleBreakfastFilter={handleBreakfastFilter}
        handleSaladFilter={handleSaladFilter}
        handleCoffeeFilter={handleCoffeeFilter}
        handleTeaFilter={handleTeaFilter}
        handleSmoothieFilter={handleSmoothieFilter}
      ></MenuFilter>
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
