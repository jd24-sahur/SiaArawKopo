import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // ✅ FIX: parse user properly
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#c084fc" : "white",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "bold" : "normal",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // ✅ close dropdown kapag click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "#2e1065",
        color: "white",
        display: "flex",
        alignItems: "center",
        padding: "15px 30px",
        boxSizing: "border-box",
      }}
    >
      {/* LEFT LOGO */}
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: 0 }}>PharmaSys</h2>
      </div>

      {/* CENTER NAV */}
      <div style={{ flex: 2, display: "flex", justifyContent: "center", gap: "30px" }}>
        <Link to="/dashboard" style={linkStyle("/dashboard")}>Stock Inventory</Link>
        <Link to="/medicines" style={linkStyle("/medicines")}>Medicines</Link>
        <Link to="/add-inventory" style={linkStyle("/add-inventory")}>Add Inventory</Link>
        <Link to="/sales" style={linkStyle("/sales")}>Sales</Link>
        <Link to="/suppliers" style={linkStyle("/suppliers")}>Suppliers</Link>
      </div>

      {/* RIGHT USER */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }} ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          style={{
            background: "#7c3aed",
            padding: "8px 15px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          {user?.username || user?.email || "Staff"}
        </div>

        {open && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "30px",
              background: "white",
              color: "black",
              borderRadius: "8px",
              padding: "10px",
              width: "130px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            <div
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                padding: "8px",
                borderRadius: "5px",
              }}
              onMouseEnter={(e) => e.target.style.background = "#f1f5f9"}
              onMouseLeave={(e) => e.target.style.background = "white"}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;