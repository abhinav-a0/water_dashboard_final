import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api",
});


/* ---------- AUTH ---------- */
export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);

/* ---------- DASHBOARD ---------- */
export const getMetrics = () => API.get("/metrics");
export const getWaterUsageByCrop = () => API.get("/water-usage-by-crop");
export const getCostBreakdown = () => API.get("/cost-breakdown");
export const getSoilMoisture = () => API.get("/soil-moisture");

export const getAlerts = () => API.get("/alerts");

/* ---------- FARMS ---------- */
export const getFarms = () => API.get("/farms");

/* ---------- SENSORS ---------- */
export const getSensors = () => API.get("/sensors");

export const downloadReport = () =>
  API.get("/reports/download", { responseType: "blob" });


export default API;
