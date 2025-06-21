const express = require("express");
const router = express.Router(); // ✅ Make sure this line is here before using router
const LikedSong = require("../models/LikedSong");
const authenticateToken = require("../middleware/authMiddleware");

// GET liked songs for logged-in user
router.get("/", authenticateToken, async (req, res) => {
  const songs = await LikedSong.find({ userId: req.user.userId });
  res.json(songs);
});

// POST liked song
router.post("/", authenticateToken, async (req, res) => {
  try {
    const newSong = new LikedSong({
      ...req.body,
      userId: req.user.userId,
    });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(500).json({ error: "Failed to save" });
  }
});

// DELETE a song by ID for that user
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await LikedSong.deleteOne({ id: req.params.id, userId: req.user.userId });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

module.exports = router;
