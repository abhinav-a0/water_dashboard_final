import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  totalFarms: Number,
  activeSensors: Number,
  waterUsageToday: Number,
  alerts: Number,
});

export default mongoose.model("Dashboard", dashboardSchema);
