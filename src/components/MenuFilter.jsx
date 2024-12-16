import "../styles/MenuFilter.css";

import React from "react";
export default function MenuFilter({ handleCategoryFilter }) {
  return (
    <div className="menu-filter">
      <button onClick={() => handleCategoryFilter("lunch")}>Lunch</button>
      <button onClick={() => handleCategoryFilter("breakfast")}>
        Breakfast
      </button>
      <button onClick={() => handleCategoryFilter("salad")}>Salads</button>
      <button onClick={() => handleCategoryFilter("coffee")}>Coffee</button>
      <button onClick={() => handleCategoryFilter("tea")}>Tea</button>
      <button onClick={() => handleCategoryFilter("smoothie")}>
        Smoothies
      </button>
    </div>
  );
}
