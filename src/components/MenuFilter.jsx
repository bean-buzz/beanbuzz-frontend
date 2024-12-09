import "../styles/MenuFilter.css"

import React from "react";
export default function MenuFilter({
  handleLunchFilter,
  handleBreakfastFilter,
  handleSaladFilter,
  handleCoffeeFilter,
  handleTeaFilter,
  handleSmoothieFilter
}) {
  return (
    <div className="menu-filter">
      <button onClick={handleLunchFilter}>Lunch</button>
      <button onClick={handleBreakfastFilter}>Breakfast</button>
      <button onClick={handleSaladFilter}>Salads</button>
      <button onClick={handleCoffeeFilter}>Coffee</button>
      <button onClick={handleTeaFilter}>Tea</button>
      <button onClick={handleSmoothieFilter}>Smoothies </button>
    </div>
  );
}
