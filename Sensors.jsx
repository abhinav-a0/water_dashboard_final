import { useEffect, useState } from "react";
import { getSensors } from "../services/api";
import "../styles/sensors.css";

export default function Sensors() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    getSensors().then(res => setSensors(res.data));
  }, []);

  return (
    
    <div className="sensors-page">
      <h2>📡 Sensors Monitoring</h2>
      <div className="dashboard-hero">
      <img
        src="sensor.avif"
        alt="Modern Irrigation System"
      />
    </div> 

      <div className="sensors-grid">
        {sensors.map(sensor => (
          <div key={sensor._id} className="sensor-card">
            {/* Title */}
            <h3>{sensor.type} Sensor</h3>

            <p><strong>ID:</strong> {sensor.sensorId}</p>
            <p><strong>Farm:</strong> {sensor.farmId}</p>
            <p><strong>Location:</strong> {sensor.location}</p>

            <p>
              <strong>Value:</strong> {sensor.value} {sensor.unit}
            </p>

            <span
              className={`status ${
                sensor.status === "active" ? "active" : "inactive"
              }`}
            >
              {sensor.status}
            </span>

            <p className="updated">
              Last Update:{" "}
              {sensor.lastUpdated
                ? new Date(sensor.lastUpdated).toLocaleString()
                : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
