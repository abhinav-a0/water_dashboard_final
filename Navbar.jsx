import { useState, useRef, useEffect } from "react";
import { FaBell, FaUserCircle, FaCog } from "react-icons/fa";
import "../styles/navbar.css";

export default function Navbar() {
  const [userOpen, setUserOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);

  const userRef = useRef(null);
  const alertsRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userRef.current &&
        !userRef.current.contains(e.target) &&
        alertsRef.current &&
        !alertsRef.current.contains(e.target)
      ) {
        setUserOpen(false);
        setAlertsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      {/* Left */}
      <div className="nav-left">🌾 AgroSmart</div>

      {/* Right */}
      <div className="nav-right">
        {/* 🔔 Alerts */}
        <div className="nav-icon-wrapper" ref={alertsRef}>
          <FaBell
            className="nav-icon"
            onClick={() => {
              setAlertsOpen(!alertsOpen);
              setUserOpen(false);
            }}
          />
          <span className="badge">3</span>

          {alertsOpen && (
            <div className="dropdown alerts-dropdown">
              <p className="dropdown-title">🔔 Alerts</p>
              <p className="dropdown-item">⚠️ Low soil moisture</p>
              <p className="dropdown-item">💧 High water usage</p>
              <p className="dropdown-item">🌡️ Temperature alert</p>
              <p className="dropdown-item view-all">View all</p>
            </div>
          )}
        </div>

        {/* ⚙️ Settings */}
        <FaCog className="nav-icon" />

        {/* 👤 User Menu */}
        <div className="user-menu" ref={userRef}>
          <FaUserCircle
            className="nav-icon"
            onClick={() => {
              setUserOpen(!userOpen);
              setAlertsOpen(false);
            }}
          />

          {userOpen && (
            <div className="dropdown">
              <p className="dropdown-item">👤 Profile</p>
              <p className="dropdown-item">⚙️ Settings</p>
              <p className="dropdown-item logout">🚪 Logout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
