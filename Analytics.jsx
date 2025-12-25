import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

import ChartCard from "../components/ChartCard";
import StatCard from "../components/StatCard";

import {
  getWaterUsageByCrop,
  getCostBreakdown
} from "../services/api";

import "../styles/analytics.css";

export default function Analytics() {
  const [waterData, setWaterData] = useState([]);
  const [costData, setCostData] = useState([]);

  useEffect(() => {
    getWaterUsageByCrop().then(res => setWaterData(res.data));
    getCostBreakdown().then(res => setCostData(res.data));
  }, []);

  const totalWater = waterData.reduce((sum, d) => sum + d.value, 0);
  const totalCost = costData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="analytics-page">
      <h2>📊 Analytics</h2>
      


      {/* 🔢 KPI Cards */}
      <div className="analytics-stats">
        <StatCard title="Total Water Used (KL)" value={totalWater} />
        <StatCard title="Total Irrigation Cost" value={`₹ ${totalCost}`} />
        <StatCard title="Crops Monitored" value={waterData.length} />
      </div>

      {/* 📈 Charts */}
      <div className="analytics-grid">
        <ChartCard title="Water Usage by Crop">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={waterData}>
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cost Breakdown">
          <ResponsiveContainer width="100%" height={260}>
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
                    fill={["#4CAF50", "#2196F3", "#FFC107", "#FF5722"][i % 4]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Water Usage Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={waterData}>
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2196F3"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
