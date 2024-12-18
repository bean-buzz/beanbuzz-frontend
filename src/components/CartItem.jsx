import "../styles/CartItem.css";

export default function CartItem({
  cartItemObj,
  removeOrder,
  increaseQuantity,
  decreaseQuantity,
  handleSizeChange,
  index,
}) {
  return (
    <div className="cart-item-container">
      <span>
        <img src={cartItemObj.imageUrl}></img>
      </span>
      <span>
        <span className="cart-item-name-container">
          <h5>{cartItemObj.itemName}</h5>
          {cartItemObj.size ? <select
          value={cartItemObj.size}
          onChange={(event) => handleSizeChange(index, event.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select> : null}
        </span>
        <span className="cart-item-quant-price-container">
          <button
            className="quantity-button"
            onClick={() => {
              decreaseQuantity(index);
            }}
          >
            -
          </button>
          <p>{cartItemObj.quantity}</p>
          <button
            className="quantity-button"
            onClick={() => increaseQuantity(index)}
          >
            +
          </button>
          <p>${cartItemObj.price * cartItemObj.quantity}</p>
          <button
            className="bin-button"
            onClick={() => {
              removeOrder(index);
            }}
          >
            <img src="./bin-x.svg" alt="" />
          </button>
        </span>
        <p>Instructions: No added sugar please!</p>
      </span>
    </div>
  );
}
