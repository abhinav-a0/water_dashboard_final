import { useEffect, useState } from "react";
import { getFarms } from "../services/api";
import "../styles/farms.css";

export default function Farms() {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    getFarms().then(res => setFarms(res.data));
  }, []);

  return (
    <div className="farms-page">
      <div className="dashboard-hero">
      <img
        src="title.png"
        alt="Modern Irrigation System"
      />
    </div>
      <h2>🌾 Farms Overview</h2>

      <div className="farms-stats">
        <div className="farm-card">
          <h3>Total Farms</h3>
          <p>{farms.length}</p>
        </div>
        <div className="farm-card">
          <h3>Active Farms</h3>
          <p>{farms.filter(f => f.status === "active").length}</p>
        </div>
      </div>

      <div className="farms-table-card">
        <h3>Farm List</h3>
       <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Location</th>
      <th>Crop</th>
      <th>Area</th>
      <th>Irrigation</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {farms.map((farm, index) => (
      <tr key={index}>
        <td>{farm.name}</td>
        <td>{farm.location || farm.region}</td>
        <td>{farm.crop}</td>
        <td>{farm.area || `${farm.area_acres} acres`}</td>
        <td>{farm.irrigation || farm.irrigationMethod}</td>
        <td>
          <span className={`status ${farm.status || "active"}`}>
            {farm.status || "Active"}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
    </div>
  );
}
