import "../styles/CartModal.css";
import CartItem from "./CartItem";

export default function CartModal({
  cart,
  toggleCartModal,
  removeOrder,
  increaseQuantity,
  decreaseQuantity,
  handleSizeChange
}) {
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h2>Cart</h2>
        {cart.map((item, index) => {
          return (
            <CartItem
              key={index}
              index={index}
              cartItemObj={item}
              removeOrder={removeOrder}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              handleSizeChange={handleSizeChange}
            ></CartItem>
          );
        })}

        <button className="close-modal-button" onClick={toggleCartModal}>
          X
        </button>
      </div>
    </div>
  );
}
