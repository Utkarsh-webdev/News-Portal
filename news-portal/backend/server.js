import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/articles.js";
import categoryRoutes from "./routes/categories.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => res.send("News Portal API running..."));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.log("❌ DB error:", err));