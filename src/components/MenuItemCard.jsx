import "../styles/MenuItemCard.css"


export default function MenuItemCard({menuItemObj, orderClick}) {

    return(
        <div className="menu-item-card">
            <img src={menuItemObj.imageUrl}></img>
            <h4>{menuItemObj.itemName}</h4>
            <p>{menuItemObj.description}</p>
            <div className="dietary-tag-container">
            {menuItemObj.dietaryInformation.isVegetarian? <h6 className="vegetarian-tag dietary-tag">Vegetarian</h6>:null}
            {menuItemObj.dietaryInformation.isHalal? <h6 className="halal-tag dietary-tag">Halal</h6>: null}
            {menuItemObj.dietaryInformation.isGlutenFree? <h6 className="dietary-tag gluten-free-tag">Gluten Free</h6>:null}
            {menuItemObj.dietaryInformation.isVegan? <h6 className="dietary-tag vegan-tag">Vegan</h6>: null}
            {menuItemObj.dietaryInformation.isKosher? <h6 className="dietary-tag kosher-tag">Kosher</h6>: null}
            {menuItemObj.dietaryInformation.isBeefFree? <h6 className="dietary-tag beef-free-tag">Beef Free</h6> : null}
            </div>
            {menuItemObj.defaultPrice?<p>${menuItemObj.defaultPrice}</p>: <p>Small ${menuItemObj.sizes.small.price} Medium ${menuItemObj.sizes.small.price} Large ${menuItemObj.sizes.small.price} </p>}
            {menuItemObj.isAvailable? <button onClick={()=>{orderClick(menuItemObj)}}>Order</button>: <h5 className="unavailable-message">Currently Unavailable</h5>}

        </div>
    )
}