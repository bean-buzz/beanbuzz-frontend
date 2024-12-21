import { useState, useEffect } from "react";
import MenuItemCard from "./MenuItemCard";
import MenuFilter from "./MenuFilter";

import Toast from "./Toast";

import "../styles/Menu.css";
import CartButton from "./CartButton";
import CartModal from "./CartModal";

import { jwtDecode } from "jwt-decode";
import EmptyCartMessage from "./EmptyCartMessage";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [cart, setCart] = useState(() => {
    // Initialise cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [table, setTable] = useState("no-table");

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // If modal is being displayed, scroll on body of website will be disabled
  if (displayModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

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
      largePrice: null,
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
    setCart([...cart, orderObj]);
  }

  const updateSpecialInstructions = (indexToChange, instructions) => {
    setCart(
      cart.map((cartItem, index) => {
        if (index === indexToChange) {
          return { ...cartItem, specialInstructions: instructions };
        }
        return cartItem;
      })
    );
  };

  // function that removes an order from the cart
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

  // This function changes the size of an order.
  const handleSizeChange = (indexToChange, newSize) => {
    setCart(
      cart.map((cartItem, index) => {
        if (index === indexToChange && newSize == "small") {
          return { ...cartItem, size: newSize, price: cartItem.smallPrice };
        }
        if (index === indexToChange && newSize == "medium") {
          return { ...cartItem, size: newSize, price: cartItem.mediumPrice };
        }
        if (index === indexToChange && newSize == "large") {
          return { ...cartItem, size: newSize, price: cartItem.largePrice };
        }
        return cartItem;
      })
    );
  };

  function handleChangeTable(eventValue) {
    let newValue = eventValue;
    setTable(newValue);
  }

  async function handleCheckout() {
    let orderObject = {
      tableNumber: table !== "no-table" ? table : undefined,
      items: cart,
    };

    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      orderObject.customerName = decoded.firstName;
      orderObject.customerEmail = decoded.email;
      orderObject.customerId = decoded.userId;
    }
    orderObject.items = cart;

    const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/order`, {
      method: "POST",
      body: JSON.stringify(orderObject),
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (response.status === 201) {
      setCart([]);
      toggleCartModal();
      Toast().fire({ icon: "success", title: "Order Created!" });
    } else {
      Toast().fire({
        icon: "error",
        title: "Could not process order. Please call staff!",
      });
    }
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
          `${import.meta.env.VITE_DATABASE_URL}/menu`
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

  return (
    <div>
      {displayModal && (
        <CartModal
          toggleCartModal={toggleCartModal}
          cart={cart}
          table={table}
          removeOrder={removeOrder}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          handleSizeChange={handleSizeChange}
          updateSpecialInstructions={updateSpecialInstructions}
          handleChangeTable={handleChangeTable}
          handleCheckout={handleCheckout}
        ></CartModal>
      )}
      {token ? (
        <h2>Hi {jwtDecode(token).firstName}, what can we get you?</h2>
      ) : (
        <h2>What can we get for you?</h2>
      )}

      {!displayModal ? (
        <div className="cart-button-container">
          <CartButton
            cart={cart}
            toggleCartModal={toggleCartModal}
          ></CartButton>
        </div>
      ) : null}

      <MenuFilter handleCategoryFilter={handleCategoryFilter}></MenuFilter>
      {menuItems.length ? (
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
      ) : (
        <EmptyCartMessage></EmptyCartMessage>
      )}
    </div>
  );
}
