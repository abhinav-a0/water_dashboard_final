import { PieChart, Pie, Cell } from "recharts";

export default function SoilMoistureGauge({ value, target }) {
  const data = [
    { name: "Moisture", value: value },
    { name: "Remaining", value: 100 - value }
  ];

  return (
    <div style={{ width: "100%", height: "220px", position: "relative" }}>
      <PieChart width={250} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="100%"
          startAngle={180}
          endAngle={0}
          innerRadius={70}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          <Cell fill="#4CAF50" />
          <Cell fill="#E5E7EB" />
        </Pie>
      </PieChart>

      {/* Center Text */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <h2 style={{ margin: 0 }}>{value}%</h2>
        <p style={{ margin: 0, color: "#666" }}>
          Target: {target}%
        </p>
      </div>
    </div>
  );
}
