import { FaPlus } from "react-icons/fa";

/**
 * Dish Menu Card Component
 * 
 * Displays dish details, diet indicator (green dot for Veg / red dot for Non-Veg),
 * price, and an add-to-cart button (+).
 */
function MenuCard({ item, addToCart }) {
  return (
    <div className="dish-card">
      {/* Top Header: Diet type & Category tag */}
      <div className="card-top-row">
        <div className={`diet-icon ${item.type === "Veg" ? "veg" : "non-veg"}`}>
          <span className="dot"></span>
        </div>

        <span className="category-tag">
          {item.category.toUpperCase()}
        </span>
      </div>

      {/* Dish Name */}
      <h3 className="dish-title">{item.name}</h3>

      {/* Price & Quick Add Button */}
      <div className="card-bottom-row">
        <span className="dish-price">₹{item.price}</span>

        <button
          className="add-item-btn"
          onClick={() => addToCart(item)}
          title="Add to cart"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default MenuCard;
