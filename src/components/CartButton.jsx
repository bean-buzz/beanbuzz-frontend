import "../styles/CartButton.css"

export default function CartButton(props)  {

    return(
        <button className="cart-button" onClick={props.toggleCartModal}>
            <img src="./white-cart.svg"></img>
            <h4>Cart</h4>
        </button>
    )
}