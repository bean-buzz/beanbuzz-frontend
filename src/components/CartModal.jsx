import "../styles/CartModal.css";
import CartItem from "./CartItem";

export default function CartModal({
  cart,
  toggleCartModal,
  removeOrder,
  increaseQuantity,
  decreaseQuantity,
  handleSizeChange,
  updateSpecialInstructions,
  handleChangeTable,
  handleCheckout,
  table,
}) {
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h2>Cart</h2>
        <button className="close-modal-button" onClick={toggleCartModal}>
          X
        </button>

        {cart.length ? (
          <div className="cart-item-container">
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
                  updateSpecialInstructions={updateSpecialInstructions}
                ></CartItem>
              );
            })}
          </div>
        ) : (
          <h3>
            Your cart is empty! Please have a look at our selection of delicious
            items!
          </h3>
        )}

        {cart.length ? (
          <select
            className="table-select"
            value={table}
            onChange={(event) => {
              handleChangeTable(event.target.value);
            }}
          >
            <option value="no-table">Select Your Table Number</option>
            <option value="T001">Table 1</option>
            <option value="T002">Table 2</option>
            <option value="T003">Table 3</option>
            <option value="T004">Table 4</option>
            <option value="T005">Table 5</option>
            <option value="T006">Table 6</option>
            <option value="T007">Table 7</option>
          </select>
        ) : null}
        {cart.length ? (
          <button
            className="checkout-button"
            onClick={() => {
              handleCheckout();
            }}
          >
            Checkout
          </button>
        ) : null}
      </div>
    </div>
  );
}
