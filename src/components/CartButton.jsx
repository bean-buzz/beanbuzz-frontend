import "../styles/CartButton.css"

export default function CartButton({cart, toggleCartModal})  {

    return(
        <button className="cart-button" onClick={toggleCartModal}>
            <img src="./white-cart.svg"></img>
            <h4>Cart</h4>
            {cart.length? <span className="cart-item-count">
                {cart.length}
            </span>: null}
            
        </button>
    )
}