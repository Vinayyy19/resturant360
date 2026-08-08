import { useState } from "react";
import MenuSection from "../components/billing/MenuSection";
import CartSection from "../components/billing/CartSection";
import "../styles/billing.css";

/**
 * Main POS / Billing Page Component
 * 
 * Manages central cart state so that selecting items from the MenuSection
 * instantly updates the POS Order Cart on the right side.
 */
function Billing() {
  // Pre-load default cart item (Paneer Tikka) to match POS initial state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Paneer Tikka",
      category: "Starters",
      type: "Veg",
      price: 280,
      qty: 1
    }
  ]);

  /**
   * Adds a dish to the active billing cart.
   * If the item already exists in the cart, increments its quantity instead of adding duplicates.
   */
  const addToCart = (dish) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === dish.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // Add new dish with initial quantity 1
      return [...prevItems, { ...dish, qty: 1 }];
    });
  };

  return (
    <div className="billing-page-layout">
      {/* Left Column: Menu Catalog with Search and Category Filters */}
      <div className="billing-left-panel">
        <MenuSection addToCart={addToCart} />
      </div>

      {/* Right Column: POS Cart, Payment Controls & KOT Actions */}
      <div className="billing-right-panel">
        <CartSection
          cartItems={cartItems}
          setCartItems={setCartItems}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
}

export default Billing;
