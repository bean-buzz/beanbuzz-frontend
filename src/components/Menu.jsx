import { useState, useEffect } from "react";
import MenuItemCard from "./MenuItemCard";
import MenuFilter from "./MenuFilter";

import "../styles/Menu.css";
import CartButton from "./CartButton";
import CartModal from "./CartModal";

import { jwtDecode } from "jwt-decode";

// Ignore this - just some of Rahul's brainstorming. May not be accurate to current order structure.

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
  const [displayModal, setDisplayModal] = useState(false);
  const [cart, setCart] = useState([]);

  function toggleCartModal() {
    setDisplayModal((previousState) => !previousState);
  }

  const token = localStorage.getItem("jwt");

  if (token) {
    const decodedToken = jwtDecode(token);
    const userFirstName = decodedToken.firstName;
    console.log(`decoded token is`, userFirstName);
  }

  function addOrder(menuItemObj) {
    let orderObj = {
      menuItem: menuItemObj._id,
      itemName: menuItemObj.itemName,
      imageUrl: menuItemObj.imageUrl,
      size: null,
      quantity: 1,
      price: null,
      specialInstructions:null,

    };
    if (menuItemObj.multipleSizes){
      orderObj.size = "medium";
      orderObj.price = menuItemObj.sizes.medium.price;
    } else {
      orderObj.price = menuItemObj.defaultPrice;
    }
    console.log(orderObj);
    setCart([...cart, orderObj]);
    console.log(cart);

  }

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
      {displayModal && (
        <CartModal toggleCartModal={toggleCartModal} cart={cart}></CartModal>
      )}
      {token ? (
        <h2>Hi {jwtDecode(token).firstName}, what can we get you?</h2>
      ) : (
        <h2>What can we get for you?</h2>
      )}
      <div className="cart-button-container">
        <CartButton toggleCartModal={toggleCartModal}></CartButton>
      </div>
      <MenuFilter handleCategoryFilter={handleCategoryFilter}></MenuFilter>

      <div className="menu-card-container">
        {menuItems.map((item) => {
          return (
            <MenuItemCard key={item._id} menuItemObj={item} addOrder={addOrder}></MenuItemCard>
          );
        })}
      </div>
    </div>
  );
}
