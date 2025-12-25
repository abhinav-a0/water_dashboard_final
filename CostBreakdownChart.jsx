import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function CostBreakdownChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/cost-breakdown")
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <Treemap data={data} dataKey="value" fill="#4f46e5">
        <Tooltip />
      </Treemap>
    </ResponsiveContainer>
  );
}
