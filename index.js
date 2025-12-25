import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";
import authRoutes from "./routes/auth.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* --------------------------------------------------
   METRICS API (CARDS)
-------------------------------------------------- */
app.get("/api/metrics", async (req, res) => {
  try {
    const farms = await mongoose.connection.db
      .collection("farms")
      .countDocuments();

    const activeSensors = await mongoose.connection.db
      .collection("sensors")
      .countDocuments({ status: "active" });

    const waterUsageTodayAgg = await mongoose.connection.db
      .collection("water_usage")
      .aggregate([
        { $group: { _id: null, total: { $sum: "$waterUsedKL" } } }
      ])
      .toArray();

    const waterUsageToday = waterUsageTodayAgg[0]?.total || 0;

    res.json({
      totalFarms: farms,
      activeSensors,
      waterUsageToday,
      alerts: 3
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* --------------------------------------------------
   WATER USAGE BY CROP (LINE / BAR CHART)
-------------------------------------------------- */
app.get("/api/water-usage-by-crop", async (req, res) => {
  try {
    const data = await mongoose.connection.db
      .collection("water_usage")
      .aggregate([
        {
          $group: {
            _id: "$crop",
            value: { $sum: "$waterUsedKL" }
          }
        },
        {
          $project: {
            _id: 0,
            crop: "$_id",
            value: 1
          }
        }
      ])
      .toArray();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* --------------------------------------------------
   IRRIGATION COST BREAKDOWN (TREEMAP)
-------------------------------------------------- */
app.get("/api/cost-breakdown", async (req, res) => {
  try {
    const data = await mongoose.connection.db
      .collection("costs")
      .aggregate([
        {
          $group: {
            _id: "$category",
            value: { $sum: "$amount" }
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            value: 1
          }
        }
      ])
      .toArray();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* --------------------------------------------------
   SOIL MOISTURE (GAUGE)
-------------------------------------------------- */
app.get("/api/soil-moisture", async (req, res) => {
  try {
    const sensor = await mongoose.connection.db
      .collection("sensors")
      .findOne({ type: "SoilMoisture" });

    res.json({
      value: sensor?.value || 0,
      target: 50
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* --------------------------------------------------
   FARMS LIST
-------------------------------------------------- */
app.get("/api/farms", async (req, res) => {
  try {
    const farms = await mongoose.connection.db
      .collection("farms")
      .find({})
      .toArray();

    res.json(farms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* --------------------------------------------------
   SENSORS LIST
-------------------------------------------------- */
app.get("/api/sensors", async (req, res) => {
  try {
    const sensors = await mongoose.connection.db
      .collection("sensors")
      .find({})
      .toArray();

    res.json(sensors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* --------------------------------------------------
   REPORT PDF DOWNLOAD
-------------------------------------------------- */
app.get("/api/reports/pdf", async (req, res) => {
  try {
    const farms = await mongoose.connection.db
      .collection("farms")
      .find({})
      .toArray();

    const doc = new PDFDocument({ margin: 30, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=farm-report.pdf"
    );

    doc.pipe(res);

    // 📄 PDF Content
    doc.fontSize(20).text("Farm Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`);
    doc.moveDown();

    farms.forEach((farm, i) => {
      doc.text(
        `${i + 1}. Name: ${farm.name || "N/A"} | Location: ${
          farm.location || "N/A"
        } | Area: ${farm.area || "N/A"}`
      );
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

/* --------------------------------------------------
   SERVER
-------------------------------------------------- */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
/* --------------------------------------------------
   ALERTS API
-------------------------------------------------- */
app.get("/api/alerts", async (req, res) => {
  try {
    const alerts = await mongoose.connection.db
      .collection("alerts")
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
