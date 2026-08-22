// Edited by Dhruv
import { useState } from "react";
import {
  FaStore,
  FaPercent,
  FaPrint,
  FaDatabase,
  FaSave,
  FaCheckCircle
} from "react-icons/fa";
import "../styles/settings.css";

/**
 * System Settings Page Component
 * Edited by Dhruv
 */
function Settings() {
  // Active inner settings tab state - Edited by Dhruv
  const [activeTab, setActiveTab] = useState("details");

  // Form State for Restaurant Profile Details - Edited by Dhruv
  const [restaurantName, setRestaurantName] = useState("shubham");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("sonai mumbai");
  const [fssai, setFssai] = useState("");
  const [gstin, setGstin] = useState("");

  // Feedback Toast state - Edited by Dhruv
  const [showToast, setShowToast] = useState(false);

  // Save changes submit handler - Edited by Dhruv
  const handleSave = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="settings-page">
      {/* Header Title & Subtitle - Edited by Dhruv */}
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure your restaurant.</p>
      </div>

      {/* Main Settings Layout Grid - Edited by Dhruv */}
      <div className="settings-layout-grid">
        {/* Left Inner Navigation Bar - Edited by Dhruv */}
        <div className="settings-inner-nav">
          <button
            className={`settings-nav-item ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            <FaStore className="nav-icon" />
            <span>Restaurant Details</span>
          </button>

          <button
            className={`settings-nav-item ${activeTab === "gst" ? "active" : ""}`}
            onClick={() => setActiveTab("gst")}
          >
            <FaPercent className="nav-icon" />
            <span>GST & Charges</span>
          </button>

          <button
            className={`settings-nav-item ${activeTab === "printer" ? "active" : ""}`}
            onClick={() => setActiveTab("printer")}
          >
            <FaPrint className="nav-icon" />
            <span>Receipt Printer</span>
          </button>

          <button
            className={`settings-nav-item ${activeTab === "database" ? "active" : ""}`}
            onClick={() => setActiveTab("database")}
          >
            <FaDatabase className="nav-icon" />
            <span>Database & Sync</span>
          </button>
        </div>

        {/* Right Content Panel - Edited by Dhruv */}
        <div className="settings-content-card">
          {activeTab === "details" && (
            <form onSubmit={handleSave}>
              <h2 className="settings-section-title">Restaurant Profile Details</h2>

              {/* Feedback Success Toast - Edited by Dhruv */}
              {showToast && (
                <div className="settings-toast">
                  <FaCheckCircle />
                  <span>Restaurant profile details saved successfully!</span>
                </div>
              )}

              {/* Input Row 1 - Increased margin gap - Edited by Dhruv */}
              <div className="settings-form-row" style={{ marginBottom: "24px" }}>
                {/* RESTAURANT NAME * - Edited by Dhruv */}
                <div className="settings-form-group">
                  <label className="settings-label">
                    RESTAURANT NAME <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="settings-input"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    required
                  />
                </div>

                {/* CONTACT PHONE NUMBER * - Edited by Dhruv */}
                <div className="settings-form-group">
                  <label className="settings-label">
                    CONTACT PHONE NUMBER <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="settings-input"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* ADDRESS * - Increased margin gap - Edited by Dhruv */}
              <div className="settings-form-group full-width" style={{ marginBottom: "24px" }}>
                <label className="settings-label">
                  ADDRESS <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="settings-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* Input Row 3 - Increased margin gap - Edited by Dhruv */}
              <div className="settings-form-row" style={{ marginBottom: "28px" }}>
                {/* FSSAI LICENSE NUMBER - Edited by Dhruv */}
                <div className="settings-form-group">
                  <label className="settings-label">FSSAI LICENSE NUMBER</label>
                  <input
                    type="text"
                    className="settings-input"
                    placeholder="14-digit FSSAI number"
                    value={fssai}
                    onChange={(e) => setFssai(e.target.value)}
                  />
                </div>

                {/* GSTIN ID - Edited by Dhruv */}
                <div className="settings-form-group">
                  <label className="settings-label">GSTIN ID</label>
                  <input
                    type="text"
                    className="settings-input"
                    placeholder="15-digit GSTIN"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                  />
                </div>
              </div>

              {/* Save Changes Button - Edited by Dhruv */}
              <div className="save-changes-btn-wrapper">
                <button type="submit" className="save-changes-btn">
                  <FaSave /> Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === "gst" && (
            <div>
              <h2 className="settings-section-title">GST & Charges Settings</h2>
              <p style={{ color: "var(--text-sub)", fontSize: "13px" }}>
                Configure default tax rates (CGST, SGST), service charges, and packaging fees.
              </p>
            </div>
          )}

          {activeTab === "printer" && (
            <div>
              <h2 className="settings-section-title">Receipt Printer Configuration</h2>
              <p style={{ color: "var(--text-sub)", fontSize: "13px" }}>
                Configure thermal receipt printers, KOT kitchen printers, and page widths.
              </p>
            </div>
          )}

          {activeTab === "database" && (
            <div>
              <h2 className="settings-section-title">Database & Sync</h2>
              <p style={{ color: "var(--text-sub)", fontSize: "13px" }}>
                Backup local sales database, sync offline transactions, and restore data.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
