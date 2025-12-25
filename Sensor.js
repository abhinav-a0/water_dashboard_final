import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  type: String,
  farmName: String,
  status: {
    type: String,
    default: "Active",
  },
});

export default mongoose.model("Sensor", sensorSchema);
