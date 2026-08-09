import { useMemo, useState } from "react";
import "../styles/tableLayout.css";
import { useNavigate } from "react-router-dom";

const initialFloors = {
  "Ground Floor": [
    { id: "T1", seats: 4, status: "available" },
    { id: "T2", seats: 4, status: "available" },
    { id: "T3", seats: 4, status: "available" },
    { id: "T4", seats: 8, status: "available" },
    { id: "T5", seats: 2, status: "available" },
    { id: "T6", seats: 4, status: "available" },
  ],

  "First Floor": [
    { id: "T7", seats: 4, status: "available" },
    { id: "T8", seats: 4, status: "available" },
    { id: "T9", seats: 6, status: "available" },
  ],

  Terrace: [
    { id: "T10", seats: 4, status: "available" },
    { id: "T11", seats: 6, status: "available" },
  ],

  "VIP Cabin": [
    { id: "V1", seats: 6, status: "available" },
    { id: "V2", seats: 8, status: "available" },
  ],
};

const statusLabels = {
  available: "AVAILABLE",
  occupied: "OCCUPIED",
  reserved: "RESERVED",
  billing: "BILLING",
  cleaning: "CLEANING",
};

function Tables() {
  const [floors, setFloors] = useState(initialFloors);
const navigate = useNavigate();
  const [activeFloor, setActiveFloor] = useState("Ground Floor");

  const [selectedTableId, setSelectedTableId] = useState("T1");

  const [search, setSearch] = useState("");

  const currentTables = floors[activeFloor] || [];

  const selectedTable =
    currentTables.find((table) => table.id === selectedTableId) ||
    currentTables[0];

  /* =========================
     SEARCH
  ========================= */

  const filteredTables = useMemo(() => {
    return currentTables.filter((table) =>
      table.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [currentTables, search]);

  /* =========================
     STATUS COUNT
  ========================= */

  const statusCount = (status) => {
    return currentTables.filter(
      (table) => table.status === status
    ).length;
  };

  /* =========================
     SELECT TABLE
  ========================= */

  const selectTable = (table) => {
    setSelectedTableId(table.id);
  };

  /* =========================
     CHANGE STATUS
  ========================= */

  const changeStatus = (status) => {
    if (!selectedTable) return;

    setFloors((previous) => ({
      ...previous,

      [activeFloor]: previous[activeFloor].map((table) =>
        table.id === selectedTable.id
          ? { ...table, status }
          : table
      ),
    }));
  };

  /* =========================
     ADD TABLE
  ========================= */

  const addTable = () => {
    const current = floors[activeFloor];

    const newNumber = current.length + 1;

    const newTable = {
      id: `T${newNumber}`,
      seats: 4,
      status: "available",
    };

    setFloors((previous) => ({
      ...previous,

      [activeFloor]: [
        ...previous[activeFloor],
        newTable,
      ],
    }));

    setSelectedTableId(newTable.id);
  };

  /* =========================
     DELETE TABLE
  ========================= */

  const deleteTable = () => {
    if (!selectedTable) return;

    const confirmDelete = window.confirm(
      `Delete ${selectedTable.id}?`
    );

    if (!confirmDelete) return;

    const updatedTables = currentTables.filter(
      (table) => table.id !== selectedTable.id
    );

    setFloors((previous) => ({
      ...previous,

      [activeFloor]: updatedTables,
    }));

    setSelectedTableId(
      updatedTables.length > 0
        ? updatedTables[0].id
        : null
    );
  };

  /* =========================
     CHANGE FLOOR
  ========================= */

  const changeFloor = (floor) => {
    setActiveFloor(floor);

    const firstTable = floors[floor]?.[0];

    setSelectedTableId(
      firstTable ? firstTable.id : null
    );

    setSearch("");
  };

  /* =========================
     OPEN POS
  ========================= */
const openPOS = () => {
  if (!selectedTable) return;

  navigate(`/billing?table=${selectedTable.id}`);
};

  return (
    <div className="tables-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="tables-page-header">

        <div>
          <h1>Table Management</h1>

          <p>
            Floor layout, reservations & assignments.
          </p>
        </div>

        <div className="table-header-actions">

          <div className="table-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search table..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="table-online">
            <span></span>
            Online
          </div>

          <button className="table-user">

            <span className="user-avatar">
              CA
            </span>

            cashier1

            <span>⌄</span>

          </button>

        </div>

      </div>

      {/* =========================
          CONTENT
      ========================= */}

      <div className="tables-content">

        {/* =========================
            TOOLBAR
        ========================= */}

        <div className="tables-toolbar">

          <div className="floor-tabs">

            {Object.keys(floors).map((floor) => (
              <button
                key={floor}
                className={
                  activeFloor === floor
                    ? "floor-active"
                    : ""
                }
                onClick={() =>
                  changeFloor(floor)
                }
              >
                {floor}
              </button>
            ))}

            <button
              className="add-floor"
              onClick={() =>
                alert("Add floor feature coming next")
              }
            >
              +
            </button>

          </div>

          {/* STATUS */}

          <div className="table-status">

            <span>
              <i className="available-dot"></i>
              Available ({statusCount("available")})
            </span>

            <span>
              <i className="occupied-dot"></i>
              Occupied ({statusCount("occupied")})
            </span>

            <span>
              <i className="reserved-dot"></i>
              Reserved ({statusCount("reserved")})
            </span>

            <span>
              <i className="billing-dot"></i>
              Billing ({statusCount("billing")})
            </span>

          </div>

          {/* ACTIONS */}

          <div className="table-actions">

            <button
              className="delete-section"
              onClick={deleteTable}
            >
              Delete Table
            </button>

            <button
              className="add-table"
              onClick={addTable}
            >
              + Add Table
            </button>

          </div>

        </div>

        {/* =========================
            WORKSPACE
        ========================= */}

        <div className="tables-workspace">

          {/* =========================
              TABLE GRID
          ========================= */}

          <div className="tables-grid">

            {filteredTables.length === 0 ? (

              <div className="no-tables">
                No tables found
              </div>

            ) : (

              filteredTables.map((table) => (

                <button
                  key={table.id}
                  className={`table-card ${
                    selectedTable?.id === table.id
                      ? "selected"
                      : ""
                  } status-${table.status}`}
                  onClick={() =>
                    selectTable(table)
                  }
                >

                  <div className="table-card-top">

                    <strong>
                      {table.id}
                    </strong>

                    <span>
                      {table.seats} Pax
                    </span>

                  </div>

                  <div className="table-circle">
                    <span>▦</span>
                  </div>

                  <div className="table-status-text">
                    {statusLabels[table.status]}
                  </div>

                  <small>
                    {table.status === "available"
                      ? "Ready"
                      : "In Use"}
                  </small>

                </button>

              ))

            )}

          </div>

          {/* =========================
              RIGHT PANEL
          ========================= */}

          {selectedTable ? (

            <aside className="table-details-panel">

              <div className="details-title">

                <h2>
                  Table {selectedTable.id}
                </h2>

                <span
                  className={`available-badge badge-${selectedTable.status}`}
                >
                  {statusLabels[selectedTable.status]}
                </span>

              </div>

              {/* OPEN POS */}

              <button
                className="open-pos"
                onClick={openPOS}
              >
                ₹ &nbsp; Take Order / Open POS
              </button>

              {/* INFO */}

              <div className="table-info">

                <div>
                  <span>
                    ♙ Capacity
                  </span>

                  <strong>
                    {selectedTable.seats} Seats
                  </strong>
                </div>

                <div>
                  <span>
                    ⌖ Area Section
                  </span>

                  <strong>
                    {activeFloor}
                  </strong>
                </div>

              </div>

              {/* =========================
                  UPDATE STATUS
              ========================= */}

              <div className="details-section">

                <h4>
                  UPDATE STATUS
                </h4>

                <div className="status-grid">

                  <button
                    className={
                      selectedTable.status ===
                      "available"
                        ? "status-active"
                        : ""
                    }
                    onClick={() =>
                      changeStatus("available")
                    }
                  >
                    Set Available
                  </button>

                  <button
                    className={
                      selectedTable.status ===
                      "occupied"
                        ? "status-active"
                        : ""
                    }
                    onClick={() =>
                      changeStatus("occupied")
                    }
                  >
                    Set Occupied
                  </button>

                  <button
                    className={
                      selectedTable.status ===
                      "reserved"
                        ? "status-active"
                        : ""
                    }
                    onClick={() =>
                      changeStatus("reserved")
                    }
                  >
                    Set Reserved
                  </button>

                  <button
                    className={
                      selectedTable.status ===
                      "billing"
                        ? "status-active"
                        : ""
                    }
                    onClick={() =>
                      changeStatus("billing")
                    }
                  >
                    Set Billing
                  </button>

                  <button
                    className={
                      selectedTable.status ===
                      "cleaning"
                        ? "status-active"
                        : ""
                    }
                    onClick={() =>
                      changeStatus("cleaning")
                    }
                  >
                    Set Cleaning
                  </button>

                </div>

              </div>

              {/* =========================
                  ERP OPERATIONS
              ========================= */}

              <div className="details-section">

                <h4>
                  ERP OPERATIONS
                </h4>

                <div className="erp-list">

                  <button
                    onClick={() =>
                      alert(
                        `Transfer ${selectedTable.id}`
                      )
                    }
                  >
                    ⇄ &nbsp; Transfer Table
                  </button>

                  <button
                    onClick={() =>
                      alert(
                        `Merge ${selectedTable.id}`
                      )
                    }
                  >
                    ♧ &nbsp; Merge Table
                  </button>

                  <button
                    onClick={() =>
                      alert(
                        "Dissolve merged group"
                      )
                    }
                  >
                    🔗 &nbsp; Dissolve Merged Group
                  </button>

                  <button
                    onClick={() =>
                      alert(
                        `Book reservation for ${selectedTable.id}`
                      )
                    }
                  >
                    ▣ &nbsp; Book Reservation
                  </button>

                  <button
                    onClick={deleteTable}
                  >
                    ⌫ &nbsp; Delete Table
                  </button>

                </div>

              </div>

            </aside>

          ) : (

            <aside className="table-details-panel">
              <div className="no-selection">
                No table selected
              </div>
            </aside>

          )}

        </div>

      </div>

    </div>
  );
}

export default Tables;