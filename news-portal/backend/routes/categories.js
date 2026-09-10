import express from "express";
import Category from "../models/Category.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const cats = await Category.find();
  res.json(cats);
});

router.post("/", authMiddleware, async (req, res) => {
  const cat = await Category.create({ name: req.body.name });
  res.json(cat);
});

export default router;