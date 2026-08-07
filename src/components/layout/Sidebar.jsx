import { NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaShoppingCart,
  FaTh,
  FaUsers,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import "../../styles/sidebar.css";

/**
 * Sidebar Navigation Component
 * 
 * Features:
 * - Dynamically renders active tab indicator (|) ONLY for the currently open route.
 * - Maximizes / minimizes sidebar width smoothy when toggle button is clicked.
 */
function Sidebar({ isCollapsed, setIsCollapsed }) {
  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        {/* Brand Logo Container */}
        <div className="logo-container">
          <span className="logo-text">
            {isCollapsed ? (
              <span className="logo-badge">360</span>
            ) : (
              <>
                restaurant<span className="logo-badge">360</span>
              </>
            )}
          </span>
        </div>

        {/* Primary Navigation Links */}
        <nav className="sidebar-nav">
          {/* Overview Dashboard Tab */}
          <NavLink
            to="/"
            end
            title="Overview Dashboard"
            className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
          >
            {({ isActive }) => (
              <>
                <div className="menu-left">
                  <FaThLarge className="menu-icon" />
                  {!isCollapsed && <span>Overview Dashboard</span>}
                </div>
                {/* Active indicator bar rendered only when tab is active */}
                {isActive && !isCollapsed && <div className="active-indicator"></div>}
              </>
            )}
          </NavLink>

          {/* Billing Counter POS Tab */}
          <NavLink
            to="/billing"
            title="Billing Counter (POS)"
            className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
          >
            {({ isActive }) => (
              <>
                <div className="menu-left">
                  <FaShoppingCart className="menu-icon" />
                  {!isCollapsed && <span>Billing Counter (POS)</span>}
                </div>
                {isActive && !isCollapsed && <div className="active-indicator"></div>}
              </>
            )}
          </NavLink>

          {/* Table Layout Tab */}
          <NavLink
            to="/tables"
            title="Table Layout"
            className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
          >
            {({ isActive }) => (
              <>
                <div className="menu-left">
                  <FaTh className="menu-icon" />
                  {!isCollapsed && <span>Table Layout</span>}
                </div>
                {isActive && !isCollapsed && <div className="active-indicator"></div>}
              </>
            )}
          </NavLink>

          {/* Loyalty & Customers Tab */}
          <NavLink
            to="/customers"
            title="Loyalty & Customers"
            className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
          >
            {({ isActive }) => (
              <>
                <div className="menu-left">
                  <FaUsers className="menu-icon" />
                  {!isCollapsed && <span>Loyalty & Customers</span>}
                </div>
                {isActive && !isCollapsed && <div className="active-indicator"></div>}
              </>
            )}
          </NavLink>
        </nav>
      </div>

      {/* Sidebar Footer Controls */}
      <div className="sidebar-bottom">
        {/* Logout Action Button */}
        <button className="logout-btn" title="Logout">
          <FaSignOutAlt />
          {!isCollapsed && <span>Logout</span>}
        </button>

        {/* Sidebar Maximize / Minimize Collapse Toggle Button */}
        <button
          className="collapse-btn"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
