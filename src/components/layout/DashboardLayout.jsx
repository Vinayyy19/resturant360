import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../styles/dashboard.css";

/**
 * Dashboard Layout Wrapper
 * 
 * Provides global state for sidebar expansion/collapse and theme mode (Dark/Light).
 * Wraps page routes with header and sidebar layout containers.
 */
function DashboardLayout({ children }) {
  // Sidebar expanded vs minimized collapsed state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Global dark mode / light mode theme toggle state
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`dashboard ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      {/* Navigation Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <div className={`main-content ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
