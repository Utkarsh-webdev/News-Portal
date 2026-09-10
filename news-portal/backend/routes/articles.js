import express from "express";
import Article from "../models/Article.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Get all articles (public) - uses populate = like SQL JOIN
router.get("/", async (req, res) => {
  const articles = await Article.find()
    .populate("category", "name")
    .sort({ createdAt: -1 });
  res.json(articles);
});

// Add article (protected)
router.post("/", authMiddleware, async (req, res) => {
  const { title, content, author, category } = req.body;
  const article = await Article.create({ title, content, author, category });
  res.json(article);
});

// Delete article (protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

export default router;