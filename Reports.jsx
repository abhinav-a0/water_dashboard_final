import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";

import {
  getMetrics,
  getWaterUsageByCrop,
  getCostBreakdown
} from "../services/api";

import "../styles/reports.css";

export default function Reports() {
  const [metrics, setMetrics] = useState(null);
  const [waterData, setWaterData] = useState([]);
  const [costData, setCostData] = useState([]);

  useEffect(() => {
    getMetrics().then(res => setMetrics(res.data));
    getWaterUsageByCrop().then(res => setWaterData(res.data));
    getCostBreakdown().then(res => setCostData(res.data));
  }, []);

  if (!metrics) return <p>Loading reports...</p>;

  const totalWater = waterData.reduce((s, d) => s + d.value, 0);
  const totalCost = costData.reduce((s, d) => s + d.value, 0);

  // ✅ PDF Download handler
  const downloadPDF = () => {
    window.open("http://localhost:5050/api/reports/pdf", "_blank");
  };

  return (
    <div className="reports-page">
      <h2>📄 Reports</h2>

      {/* 🔢 Summary */}
      <div className="reports-stats">
        <StatCard title="Total Farms" value={metrics.totalFarms} />
        <StatCard title="Active Sensors" value={metrics.activeSensors} />
        <StatCard title="Water Used (KL)" value={totalWater} />
        <StatCard title="Irrigation Cost" value={`₹ ${totalCost}`} />
      </div>

      {/* 🗂 Report Cards */}
      <div className="reports-grid">
        <ChartCard title="Daily Report">
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>Water Used: {totalWater} KL</p>
          <p>Cost: ₹ {totalCost}</p>
          <button className="btn" onClick={downloadPDF}>
            Download PDF
          </button>
        </ChartCard>

        <ChartCard title="Weekly Report">
          <p>Summary of last 7 days</p>
          <p>Avg Water: {Math.round(totalWater / 7)} KL/day</p>
          <p>Avg Cost: ₹ {Math.round(totalCost / 7)}</p>
          <button className="btn" onClick={downloadPDF}>
            Download PDF
          </button>
        </ChartCard>

        <ChartCard title="Monthly Report">
          <p>Summary of this month</p>
          <p>Total Water: {totalWater * 4} KL</p>
          <p>Total Cost: ₹ {totalCost * 4}</p>
          <button className="btn" onClick={downloadPDF}>
            Download PDF
          </button>
        </ChartCard>
      </div>
    </div>
  );
}
