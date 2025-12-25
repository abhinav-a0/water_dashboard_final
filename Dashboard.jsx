import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import SoilMoistureGauge from "../components/SoilMoistureGauge";
import AlertsCard from "../components/AlertsCard";

import {
  getMetrics,
  getWaterUsageByCrop,
  getCostBreakdown,
  getSoilMoisture,
  getAlerts
} from "../services/api";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [waterData, setWaterData] = useState([]);
  const [costData, setCostData] = useState([]);
  const [soil, setSoil] = useState(null);
  const [alertsList, setAlertsList] = useState([]);

  useEffect(() => {
    getMetrics().then(res => setMetrics(res.data));
    getWaterUsageByCrop().then(res => setWaterData(res.data));
    getCostBreakdown().then(res => setCostData(res.data));
    getSoilMoisture().then(res => setSoil(res.data));
    getAlerts().then(res => setAlertsList(res.data));
  }, []);

  if (!metrics) return <p>Loading dashboard...</p>;

  return (
   <div className="dashboard">
      {/* Hero Image */}
    <div className="dashboard-hero">
      <img
        src="title.png"
        alt="Modern Irrigation System"
      />
    </div> 

      {/* 🔢 Stats Cards */}
      <div className="stats-grid">
        <StatCard title="Total Farms" value={metrics.totalFarms} />
        <StatCard title="Active Sensors" value={metrics.activeSensors} />
        <StatCard
          title="Water Usage Today (KL)"
          value={metrics.waterUsageToday}
        />
        <StatCard title="Alerts" value={metrics.alerts} />
      </div>

      {/* 📊 Charts + Gauge + Alerts */}
      <div className="charts-grid">
        <ChartCard title="Water Usage by Crop">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={waterData}>
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Irrigation Cost Breakdown">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={costData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {costData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={["#4CAF50", "#2196F3", "#FFC107"][i % 3]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 💧 Soil Moisture Gauge */}
        {soil && (
          <ChartCard title="Soil Moisture Level">
            <SoilMoistureGauge value={soil.value} target={soil.target} />
          </ChartCard>
        )}

        {/* 🚨 Alerts */}
        {alertsList.length > 0 && (
          <ChartCard title="Recent Alerts">
            <AlertsCard alerts={alertsList} />
          </ChartCard>
        )}
      </div>
    </div>
  );
}
