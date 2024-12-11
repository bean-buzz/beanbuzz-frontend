import "../styles/MenuFilter.css"

import React from "react";
export default function MenuFilter({
handleCategoryFilter
}) {
  return (
    <div className="menu-filter">
      <button onClick={() => handleCategoryFilter("lunchItems")}>Lunch</button>
      <button onClick={() => handleCategoryFilter("breakfastItems")}>Breakfast</button>
      <button onClick={() => handleCategoryFilter("saladItems")}>Salads</button>
      <button onClick={() => handleCategoryFilter("coffeeItems")}>Coffee</button>
      <button onClick={() => handleCategoryFilter("teaItems")}>Tea</button>
      <button onClick={() => handleCategoryFilter("smoothieItems")}>Smoothies</button>
    </div>
  );
}
