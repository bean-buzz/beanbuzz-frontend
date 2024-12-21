import "../styles/MenuFilter.css";
export default function MenuFilter({ handleCategoryFilter }) {
  return (
    <div className="menu-filter">
      <button onClick={() => handleCategoryFilter("")}>All Menu Items</button>
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
