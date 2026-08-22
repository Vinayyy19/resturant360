import { NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaShoppingCart,
  FaUtensils,
  FaTh,
  FaTv,
  FaBoxes,
  FaUsers,
  FaChartLine,
  FaRobot,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import "../../styles/sidebar.css";

/**
 * Sidebar Navigation Component
 * 
 * Includes the updated 10-item menu layout matching the restaurant360 system navigation:
 * 1. Overview Dashboard
 * 2. Billing Counter (POS)
 * 3. Menu & Dishes
 * 4. Table Layout
 * 5. Kitchen Orders (KDS)
 * 6. Stock & Inventory
 * 7. Loyalty & Customers
 * 8. Analytics & Reports
 * 9. AI Analyst Chatbot
 * 10. System Settings
 */
function Sidebar({ isCollapsed, setIsCollapsed }) {
  const navItems = [
    { path: "/", label: "Overview Dashboard", icon: FaThLarge, end: true },
    { path: "/billing", label: "Billing Counter (POS)", icon: FaShoppingCart },
    { path: "/products", label: "Menu & Dishes", icon: FaUtensils },
    { path: "/tables", label: "Table Layout", icon: FaTh },
    { path: "/kds", label: "Kitchen Orders (KDS)", icon: FaTv },
    { path: "/inventory", label: "Stock & Inventory", icon: FaBoxes },
    { path: "/customers", label: "Loyalty & Customers", icon: FaUsers },
    { path: "/reports", label: "Analytics & Reports", icon: FaChartLine },
    { path: "/ai-chatbot", label: "AI Analyst Chatbot", icon: FaRobot },
    { path: "/settings", label: "System Settings", icon: FaCog }
  ];

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

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                title={item.label}
                className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
              >
                {({ isActive }) => (
                  <>
                    <div className="menu-left">
                      <IconComponent className="menu-icon" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                    {/* Orange active indicator bar shown only for active route */}
                    {isActive && !isCollapsed && <div className="active-indicator"></div>}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Controls */}
      <div className="sidebar-bottom">
        <button className="logout-btn" title="Logout">
          <FaSignOutAlt />
          {!isCollapsed && <span>Logout</span>}
        </button>

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
