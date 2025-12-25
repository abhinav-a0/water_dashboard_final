import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
  name: String,
  area: String,
  crop: String,
  status: {
    type: String,
    default: "Active",
  },
});

export default mongoose.model("Farm", farmSchema);
