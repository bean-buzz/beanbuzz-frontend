import { useState, useEffect } from "react";
import MenuItemCard from "./MenuItemCard";
import MenuFilter from "./MenuFilter";
import "../styles/Menu.css";
// import { jwtDecode } from "jwt-decode";

// Menu cart steps
// 1. user clicks order
//     a. add onclick to button
//     b. console log object information -> console.log quantity and size in the log information
//         const = {} - create new object
//     c. create state at top level of menu componet
//     d. in the button handler setState = setMenuCart([...currentState, newobject])
// 2. onclick saves quantity = 1 and first size -> opens cart
// 3. user can select quantity and size (if exists)`





export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  // This code is breaking the component, figure out why:
  // const token = localStorage.getItem("jwtToken");
  // const decodedToken = jwtDecode(token);
  // console.log(decodedToken);
  // console.log(token)

  function orderClick(menuItemObj) {
    console.log(menuItemObj)
    let defaultSizeAndQuant = {};    
   
    if (menuItemObj.multiSizes) {
      defaultSizeAndQuant = {
        size:"small",
        quantity: 1,
      }
    } else {
      defaultSizeAndQuant = {
        size:"",
        quantity:1,
      }
    }
    console.log(defaultSizeAndQuant);
  } 


  // Each button in the menu filter calls this function to update the menu by category
  async function handleCategoryFilter(category) {
    try {
      const response = await fetch(`http://localhost:3000/${category}`);
      const Data = await response.json();
      if (Data) {
        setMenuItems(Data);
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
      <MenuFilter handleCategoryFilter={handleCategoryFilter}></MenuFilter>
      <div className="menu-card-container">
        {menuItems.map((item) => {
          return (
            <MenuItemCard orderClick={orderClick}key={item._id} menuItemObj={item}></MenuItemCard>
          );
        })}
      </div>
    </div>
  );
}
