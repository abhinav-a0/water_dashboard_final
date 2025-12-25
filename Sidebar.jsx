import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaSeedling,
  FaMicrochip,
  FaChartLine,
  FaFileAlt
} from "react-icons/fa";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">🌿 Smart Irrigation</h2>

      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-item">
          <FaTachometerAlt className="side-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/farms" className="nav-item">
          <FaSeedling className="side-icon" />
          <span>Farms</span>
        </NavLink>

        <NavLink to="/sensors" className="nav-item">
          <FaMicrochip className="side-icon" />
          <span>Sensors</span>
        </NavLink>

        <NavLink to="/analytics" className="nav-item">
          <FaChartLine className="side-icon" />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/reports" className="nav-item">
          <FaFileAlt className="side-icon" />
          <span>Reports</span>
        </NavLink>
      </nav>
    </div>
  );
}
