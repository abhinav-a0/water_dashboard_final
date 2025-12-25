import express from "express";
import Dashboard from "../models/Dashboard.js";

const router = express.Router();

// GET dashboard data
router.get("/", async (req, res) => {
  try {
    let data = await Dashboard.findOne();

    // If empty, send mock data (important for UI)
    if (!data) {
      data = {
        totalFarms: 12,
        activeSensors: 58,
        waterUsageToday: 1240,
        alerts: 3,
      };
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
