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


  // function attached to cart button which toggles displaying the cart modal.
  function toggleCartModal() {
    setDisplayModal((previousState) => !previousState);
  }

  // retrieves token from local storage
  const token = localStorage.getItem("jwt");

  // This function is attached to each menu item button. It creates an order object and adds it to the cart.
  function addOrder(menuItemObj) {
    let orderObj = {
      menuItem: menuItemObj._id,
      itemName: menuItemObj.itemName,
      imageUrl: menuItemObj.imageUrl,
      size: null,
      quantity: 1,
      price: null,
      specialInstructions: null,
      smallPrice: null,
      mediumPrice: null,
      largePrice: null
    };
    if (menuItemObj.multipleSizes) {
      orderObj.smallPrice = menuItemObj.sizes.small.price;
      orderObj.mediumPrice = menuItemObj.sizes.medium.price;
      orderObj.largePrice = menuItemObj.sizes.large.price;
      orderObj.size = "medium";
      orderObj.price = menuItemObj.sizes.medium.price;
    } else {
      orderObj.price = menuItemObj.defaultPrice;
    }
    console.log(orderObj);
    setCart([...cart, orderObj]);
    console.log(cart);
  }

  const removeOrder = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // This function increases the quantity in the cart as long as the quantity is under 10.
  const increaseQuantity = (indexToIncrease) => {
    setCart(
      cart.map((cartItem, index) => {
        if (index === indexToIncrease && cartItem.quantity < 10) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      })
    );

  };
  // This function decrease the quantity in the cart as long as the quantity is over 1
  const decreaseQuantity = (indexToIncrease) => {
    setCart(
      cart.map((cartItem, index) => {
        if (index === indexToIncrease && cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      })
    );
  };

  const handleSizeChange = (indexToChange, newSize) => {
    console.log("handled");
    setCart(
      cart.map((cartItem, index) => {
        if (index === indexToChange && newSize =="small") {
          return { ...cartItem, size: newSize, price: cartItem.smallPrice };
        }
        if (index === indexToChange && newSize =="medium") {
          return { ...cartItem, size: newSize, price: cartItem.mediumPrice };
        }
        if (index === indexToChange && newSize =="large") {
          return { ...cartItem, size: newSize, price: cartItem.largePrice};
        }
        return cartItem;
      })
    );
    console.log(cart);
  };


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
        <CartModal
          toggleCartModal={toggleCartModal}
          cart={cart}
          removeOrder={removeOrder}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          handleSizeChange={handleSizeChange}
        ></CartModal>
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
            <MenuItemCard
              key={item._id}
              menuItemObj={item}
              addOrder={addOrder}
            ></MenuItemCard>
          );
        })}
      </div>
    </div>
  );
}
