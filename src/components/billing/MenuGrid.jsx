import MenuCard from "./MenuCard";

/**
 * Menu Grid Component
 * Renders filtered list of dish menu cards
 */
function MenuGrid({ menu, addToCart }) {
  return (
    <div className="dishes-grid">
      {menu.map((item) => (
        <MenuCard key={item.id} item={item} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default MenuGrid;
