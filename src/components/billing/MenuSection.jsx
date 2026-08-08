import { useState } from "react";
import SearchBar from "./SearchBar";
import CategoryTabs from "./CategoryTabs";
import MenuGrid from "./MenuGrid";
import menuData from "../../data/menuData";

/**
 * Menu Section Container Component
 * 
 * Manages search text, food type, and category filter states to compute
 * the filtered list of menu items.
 */
function MenuSection({ addToCart }) {
  const [search, setSearch] = useState("");
  const [foodType, setFoodType] = useState("All");
  const [category, setCategory] = useState("All");

  // Dynamic search and multi-criteria category filtering
  const filteredMenu = menuData.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchType =
      foodType === "All" || item.type === foodType;

    const matchCategory =
      category === "All" || item.category === category;

    return matchSearch && matchType && matchCategory;
  });

  return (
    <div className="menu-section-container">
      {/* Search Input & Veg/Non-Veg Filter */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        foodType={foodType}
        setFoodType={setFoodType}
      />

      {/* Category Selection Tabs */}
      <CategoryTabs
        category={category}
        setCategory={setCategory}
      />

      {/* Filtered Dishes Grid */}
      <MenuGrid menu={filteredMenu} addToCart={addToCart} />
    </div>
  );
}

export default MenuSection;
