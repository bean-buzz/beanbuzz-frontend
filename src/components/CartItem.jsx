import "../styles/CartItem.css";

export default function CartItem({cartItemObj}) {
  return (
    <div className="cart-item-container">
      <span>
        <img src={cartItemObj.imageUrl}></img>
      </span>
      <span>
        <span className="cart-item-name-container">
        <h5>{cartItemObj.itemName}</h5>
        {cartItemObj.size? <h5>({cartItemObj.size})</h5>: null}
        </span>
        <span className="cart-item-quant-price-container">
        <button className="quantity-button">-</button>
        <p>{cartItemObj.quantity}</p>
        <button className="quantity-button">+</button>
        <p>${cartItemObj.price}</p>
        <button className="bin-button"><img src="./bin-x.svg" alt="" /></button>
        
        </span>
        <p>Instructions: No added sugar please!</p>
        
       
      </span>
    </div>
  );
}
