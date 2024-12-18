import "../styles/CartModal.css";
import CartItem from "./CartItem";

export default function CartModal({cart, toggleCartModal}) {
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h2>Cart</h2>
        {cart.map((item) => {
                  return (
                    <CartItem cartItemObj={item}></CartItem>
                  );
                })}
          
        <button className="close-modal-button" onClick={toggleCartModal}>
          X
        </button>
      </div>
    </div>
  );
}
