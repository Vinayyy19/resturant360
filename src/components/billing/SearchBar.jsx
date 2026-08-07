import { FaSearch } from "react-icons/fa";

/**
 * Menu Search and Food Type Filter Bar
 * 
 * Provides live dish search input and food type pills (All, Veg, Non-Veg).
 */
function SearchBar({ search, setSearch, foodType, setFoodType }) {
  return (
    <div className="search-container-row">
      {/* Live Text Search Field */}
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search dishes (e.g. Biryani, Naan)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Diet / Food Type Filter Pills */}
      <div className="food-type-filter">
        <button
          className={foodType === "All" ? "active" : ""}
          onClick={() => setFoodType("All")}
        >
          All
        </button>

        <button
          className={foodType === "Veg" ? "active veg-active" : ""}
          onClick={() => setFoodType("Veg")}
        >
          <span className="dot veg-dot"></span>
          Veg
        </button>

        <button
          className={foodType === "Non-Veg" ? "active nonveg-active" : ""}
          onClick={() => setFoodType("Non-Veg")}
        >
          <span className="dot nonveg-dot"></span>
          Non-Veg
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
