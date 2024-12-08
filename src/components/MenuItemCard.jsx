import "../styles/MenuItemCard.css"


export default function MenuItemCard({menuItemObj}) {

    return(
        <div className="menu-item-card">
            <img src={menuItemObj.imageUrl}></img>
            <h4>{menuItemObj.itemName}</h4>
            <p>{menuItemObj.description}</p>
            {menuItemObj.dietaryInformation.isVegetarian? <h6 className="vegetarian-tag dietary-tag">Vegetarian</h6>:null}
            {menuItemObj.dietaryInformation.isHalal? <h6 className="halal-tag dietary-tag">Halal</h6>: null}
            {menuItemObj.dietaryInformation.isGlutenFree? <h6 className="dietary-tag gluten-free-tag">Gluten Free</h6>:null}
            {menuItemObj.dietaryInformation.isVegan? <h6 className="dietary-tag vegan-tag">Vegan</h6>: null}
            {menuItemObj.dietaryInformation.isKosher? <h6 className="dietary-tag kosher-tag">Kosher</h6>: null}
            {menuItemObj.dietaryInformation.isBeefFree? <h6 className="dietary-tag beef-free-tag">Beef Free</h6> : null}
            <h5>Price</h5>
            {menuItemObj.defaultPrice?<p>${menuItemObj.defaultPrice}</p>: null}
            <button>Order</button>

        </div>
    )
}